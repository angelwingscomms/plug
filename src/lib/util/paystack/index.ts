import { PAYSTACK_LIVE, PAYSTACK_TEST } from "$env/static/private";
import { PUBLIC_PAYSTACK_TEST } from "$env/static/public";
import axios from "axios";

export const secret_key = PUBLIC_PAYSTACK_TEST ? PAYSTACK_TEST : PAYSTACK_LIVE

export const paystack = axios.create({
    baseURL: 'https://api.paystack.co/transaction/verify',
    headers: {
        Authorization: `Bearer ${secret_key}`
    }
});