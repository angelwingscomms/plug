import { get } from '$lib/util/redis/get';
import { client } from '$lib/util/redis';
import { get_root_id } from './get_root_id';
import type { UserPayment } from '$lib/types/post';
import type { EscapedEmail } from '$lib/types';
import { transfer } from '$lib/util/paystack/transfer';
import type { Currency } from '$lib/util/paystack/currencies';

export type ArgsMetadata = Pick<Args, 'id' | 'once'>;

export interface Args {
	email: EscapedEmail;
	date: number;
	id: string;
	once: boolean;
	cost: number;
}

const payout_percentage = 70

export const record_payment = async ({
	email,
	id,
	cost,
	once: paid_for_once,
	date
}: Args): Promise<void> => {
	const root_post_id = await get_root_id(id);
	if (!root_post_id) throw `Encountered error getting root_post`;
	const { required, once } = await get<{ required: boolean; once: boolean }>(root_post_id, [
		'$.payment.required',
		'$.payment.once'
	]);
	if (!required) throw `Payment not required for ${id}`;
	const user_payment: UserPayment = { date, cost, paid_for_once, once };
	client.json.set(id, `$.payment.users.${email.value}`, { ...user_payment });
	const { payout } = await get<{ payout: Record<string, string> }>(email.value, ['$.payout']);
	if (!payout) console.error(`encountered error getting ${email.value} payout details`)
	// TODO! validate shape of payout
	transfer({name: payout.name, number: payout.number, bank: payout.bank, amount: cost * 70/100, currency: payout.currency as Currency})
};
