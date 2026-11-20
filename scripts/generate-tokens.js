import 'dotenv/config';
import axios from 'axios';
import { updateTokenInEnv } from './token-env.js';

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
    throw new Error('BASE_URL must be set in .env before generating tokens.');
}

async function printToken(name, email) {
    const response = await axios.post(`${baseUrl}/user/login`, {
        email,
        password: '1234'
    });

    if (response.status !== 200 || typeof response.data?.token !== 'string') {
        throw new Error(`${name} login did not return a token.`);
    }

    await updateTokenInEnv(name, response.data.token);
    console.log(`${name}=${response.data.token}`);
}

await printToken('ADMIN_TOKEN', 'admin@dmoney.com');
await printToken('SYSTEM_TOKEN', 'system@dmoney.com');
