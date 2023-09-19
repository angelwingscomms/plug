import { REDIS_URL } from '$env/static/private';
import { setup } from './setup';
import {  createClient } from 'redis';

export const client = await createClient({ url: REDIS_URL });

await client.connect();
await setup()