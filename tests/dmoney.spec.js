import 'dotenv/config';
import axios from 'axios';
import { expect } from 'chai';

const baseUrl = process.env.BASE_URL;
let accessToken;
let customer1Id;
let customer2Id;
let agentId;
let merchantId;
let systemToken;
let agentToken;
let customer1Token;
let customer2Token;

const customerSuffix = Date.now().toString().slice(-8);
const agentPhoneNumber = `017${customerSuffix}`;

describe('dMoney Integration Testing', function () {

    it('Check API Base URL', async function () {

        console.log('Base URL:', baseUrl);

        expect(baseUrl).to.not.be.empty;

    });

    it('Verify admin can login with correct credentials', async function () {

        const response = await axios.post(`${baseUrl}/user/login`, {
            email: 'admin@dmoney.com',
            password: '1234'
        });

        console.log('Admin login response:', response.data);
        console.log('Status code:', response.status);

        expect(response.status).to.equal(200);
        expect(response.data.token).to.exist;

        accessToken = response.data.token;

        console.log('Admin Access Token Stored Successfully');

    });

    it('Verify admin can create Customer 1 successfully', async function () {

        const response = await axios.post(`${baseUrl}/user/create`, {
            name: 'Customer 1',
            email: `tahminira+${customerSuffix}@gmail.com`,
            password: '1234',
            phone_number: `018${customerSuffix}`,
            nid: `56${customerSuffix}`,
            role: 'Customer'
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
            }
        });

        console.log('Create customer 1 response:', response.data);
        console.log('Status code:', response.status);

        expect(response.status).to.equal(201);

        customer1Id = response.data.user.id;
        expect(customer1Id, 'Customer creation response did not include a user ID').to.exist;

        console.log('Stored customer1Id:', customer1Id);

    });

    it('Verify admin can activate Customer 1 successfully', async function () {

        expect(customer1Id, 'Customer 1 was not created; activation requires its user ID').to.exist;

        const response = await axios.patch(
            `${baseUrl}/user/update/${customer1Id}`,
            { status: 'active' },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
                }
            }
        );

        console.log('Activate customer 1 response:', response.data);
        console.log('Status code:', response.status);

        expect(response.status).to.equal(200);
        expect(response.data.message).to.equal('User updated successfully');
        expect(response.data.user.status).to.equal('active');

    });


it('Verify admin can create Customer 2 successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/create`, {
        name: 'Customer 2',
        email: `tahminira+${Number(customerSuffix) + 1}@gmail.com`,
        password: '1234',
        phone_number: `019${customerSuffix}`,
        nid: `57${customerSuffix}`,
        role: 'Customer'
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Create customer 2 response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);

    customer2Id = response.data.user.id;
    expect(customer2Id).to.exist;

    console.log('Stored customer2Id:', customer2Id);

});


it('Verify admin can activate Customer 2 successfully', async function () {

    expect(customer2Id).to.exist;

    const response = await axios.patch(
        `${baseUrl}/user/update/${customer2Id}`,
        { status: 'active' },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
            }
        }
    );

    console.log('Activate customer 2 response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('User updated successfully');
    expect(response.data.user.status).to.equal('active');

});


it('Verify admin can create Agent successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/create`, {
        name: 'Agent',
        email: `tahminira+${Number(customerSuffix) + 2}@gmail.com`,
        password: '1234',
        phone_number: agentPhoneNumber,
        nid: `58${customerSuffix}`,
        role: 'Agent'
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Create agent response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);

    agentId = response.data.user.id;
    expect(agentId).to.exist;

    console.log('Stored agentId:', agentId);

});


it('Verify admin can activate Agent successfully', async function () {

    expect(agentId).to.exist;

    const response = await axios.patch(
        `${baseUrl}/user/update/${agentId}`,
        { status: 'active' },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
            }
        }
    );

    console.log('Activate agent response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('User updated successfully');
    expect(response.data.user.status).to.equal('active');

});

it('Verify admin can create Merchant successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/create`, {
        name: 'Merchant',
        email: `tahminira+${Number(customerSuffix) + 3}@gmail.com`,
        password: '1234',
        phone_number: `016${customerSuffix}`,
        nid: `59${customerSuffix}`,
        role: 'Merchant'
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Create merchant response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);

    merchantId = response.data.user.id;
    expect(merchantId).to.exist;

    console.log('Stored merchantId:', merchantId);

});


it('Verify admin can activate Merchant successfully', async function () {

    expect(merchantId).to.exist;

    const response = await axios.patch(
        `${baseUrl}/user/update/${merchantId}`,
        { status: 'active' },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
            }
        }
    );

    console.log('Activate merchant response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('User updated successfully');
    expect(response.data.user.status).to.equal('active');

});

it('Verify System can login successfully with correct credentials', async function () {

    const response = await axios.post(`${baseUrl}/user/login`, {
        email: 'system@dmoney.com',
        password: '1234'
    });

    console.log('System login response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Login successful');

    systemToken = response.data.token;
    expect(systemToken).to.exist;

});
it('Verify System can deposit 5000 Tk to Agent successfully', async function () {

    try {

        const response = await axios.post(`${baseUrl}/transaction/deposit`, {
            from_account: 'SYSTEM',
            to_account: agentPhoneNumber,
            amount: 5000
        }, {
            headers: {
                Authorization: `Bearer ${systemToken}`,
                'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
            }
        });

        console.log('System deposit response:', response.data);
        console.log('Status code:', response.status);

        expect(response.status).to.equal(201);

    } catch (error) {

        console.log('Deposit error:', error.response.data);
        console.log('Status code:', error.response.status);

        throw error;

    }

});

it('Verify Agent can login successfully with correct credentials', async function () {

    const response = await axios.post(`${baseUrl}/user/login`, {
        email: `tahminira+${Number(customerSuffix) + 2}@gmail.com`,
        password: '1234'
    });

    console.log('Agent login response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('OTP sent to your registered email address');

});

it('Verify Agent can verify OTP successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
        identifier: `tahminira+${Number(customerSuffix) + 2}@gmail.com`,
        otp: '0000'
    });

    console.log('Agent OTP verification response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);

    agentToken = response.data.token;
    expect(agentToken).to.exist;

    console.log('Stored agentToken:', agentToken);

});

it('Verify Agent can deposit 2000 Tk to Customer 1 successfully', async function () {

    const response = await axios.post(`${baseUrl}/transaction/deposit`, {
        from_account: agentPhoneNumber,
        to_account: `018${customerSuffix}`,
        amount: 2000
    }, {
        headers: {
            Authorization: `Bearer ${agentToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Agent deposit response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal('Deposit successful');
    expect(response.data.commission).to.equal(50);

});

it('Verify Customer 1 can login successfully with correct credentials', async function () {

    const response = await axios.post(`${baseUrl}/user/login`, {
        email: `tahminira+${customerSuffix}@gmail.com`,
        password: '1234'
    });

    console.log('Customer 1 login response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('OTP sent to your registered email address');

});

it('Verify Customer 1 can verify OTP successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
        identifier: `tahminira+${customerSuffix}@gmail.com`,
        otp: '0000'
    });

    console.log('Customer 1 OTP verification response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);

    customer1Token = response.data.token;
    expect(customer1Token).to.exist;

    console.log('Stored customer1Token:', customer1Token);

});

it('Verify Customer 1 can send money to Customer 2 successfully', async function () {

    const response = await axios.post(`${baseUrl}/transaction/sendmoney`, {
        from_account: '018' + customerSuffix,
        to_account: '019' + customerSuffix,
        amount: 1000
    }, {
        headers: {
            Authorization: `Bearer ${customer1Token}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Send money response:', response.data);
    console.log('Status code:', response.status);


    expect(response.status).to.equal(201);
expect(response.data.message).to.equal('Send money successful');
expect(response.data.fee).to.equal(5);

});

it('Verify Customer 2 can login successfully with correct credentials', async function () {

    const response = await axios.post(`${baseUrl}/user/login`, {
        email: `tahminira+${Number(customerSuffix) + 1}@gmail.com`,
        password: '1234'
    });

    console.log('Customer 2 login response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('OTP sent to your registered email address');

});

it('Verify Customer 2 can verify OTP successfully', async function () {

    const response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
        identifier: `tahminira+${Number(customerSuffix) + 1}@gmail.com`,
        otp: '0000'
    });

    console.log('Customer 2 OTP verification response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(200);

    customer2Token = response.data.token;
    expect(customer2Token).to.exist;

    console.log('Stored customer2Token:', customer2Token);

});

it('Verify Customer 2 can cashout 500 Tk from Agent successfully', async function () {

    const response = await axios.post(`${baseUrl}/transaction/withdraw`, {
        from_account: `019${customerSuffix}`,
        to_account: agentPhoneNumber,
        amount: 500
    }, {
        headers: {
            Authorization: `Bearer ${customer2Token}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Customer 2 cashout response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal('Withdraw successful');
    expect(response.data.fee).to.equal(5);

});

it('Verify Customer 2 can pay 400 Tk to Merchant successfully', async function () {

    const response = await axios.post(`${baseUrl}/transaction/payment`, {
        from_account: `019${customerSuffix}`,
        to_account: `016${customerSuffix}`,
        amount: 400
    }, {
        headers: {
            Authorization: `Bearer ${customer2Token}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        }
    });

    console.log('Customer 2 payment response:', response.data);
    console.log('Status code:', response.status);

    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal('Payment successful');
    expect(response.data.fee).to.equal(5);

});




it('Verify admin cannot login with wrong password', async function () {

    const response = await axios.post(`${baseUrl}/user/login`, {
        email: 'admin@dmoney.com',
        password: '12345'
    }, {
        validateStatus: () => true
    });

    console.log('Admin wrong password response:', response.data);
    console.log('Status code:', response.status);

    expect(response.data.message).to.exist;

});

it('Verify admin cannot create a user with already registered email', async function () {

    const response = await axios.post(`${baseUrl}/user/create`, {
        name: 'Customer 1',
        email: `tahminira+${customerSuffix}@gmail.com`,
        password: '1234',
        phone_number: `018${customerSuffix}`,
        nid: `56${customerSuffix}`,
        role: 'Customer'
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        },
        validateStatus: () => true
    });

    console.log('Duplicate email response:', response.data);
    console.log('Status code:', response.status);

    expect(response.data.message).to.exist;

});

it('Verify admin cannot activate a user without an Authorization token', async function () {

    const response = await axios.patch(`${baseUrl}/user/update/${customer1Id}`, {
        status: 'active'
    }, {
        headers: {
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        },
        validateStatus: () => true
    });

    console.log('Activate user without token response:', response.data);
    console.log('Status code:', response.status);

    expect(response.data.message).to.exist;

});

it('Verify System cannot deposit to a non-existing account', async function () {

    const response = await axios.post(`${baseUrl}/transaction/deposit`, {
        from_account: 'SYSTEM',
        to_account: '00000000000',
        amount: 5000
    }, {
        headers: {
            Authorization: `Bearer ${systemToken}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        },
        validateStatus: () => true
    });

    console.log('System deposit response:', response.data);
    console.log('Status code:', response.status);

    expect([400, 404]).to.include(response.status);
    expect(response.data.message).to.equal('To Account does not exist');

});

it('Verify Customer 1 cannot send money without X-AUTH-SECRET-KEY', async function () {

    const response = await axios.post(`${baseUrl}/transaction/sendmoney`, {
        from_account: `018${customerSuffix}`,
        to_account: `019${customerSuffix}`,
        amount: 1000
    }, {
        headers: {
            Authorization: `Bearer ${customer1Token}`
        },
        validateStatus: () => true
    });

    console.log('Send money response:', response.data);
    console.log('Status code:', response.status);

    expect([401, 403]).to.include(response.status);

});

it('Verify Customer 2 cannot make payment with insufficient balance', async function () {

    const response = await axios.post(`${baseUrl}/transaction/payment`, {
        from_account: `019${customerSuffix}`,
        to_account: `016${customerSuffix}`,
        amount: 2000
    }, {
        headers: {
            Authorization: `Bearer ${customer2Token}`,
            'X-AUTH-SECRET-KEY': process.env['X-AUTH-SECRET-KEY']
        },
        validateStatus: () => true
    });

    console.log('Insufficient balance response:', response.data);
    console.log('Status code:', response.status);

    expect(response.data.message).to.equal('Insufficient balance');

});


});
