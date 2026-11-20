# dMoney API Automation

## What is dMoney?

dMoney is a digital financial service that supports account management and transactions between system, agent, customer, and merchant accounts.

## Project Overview

This project is an automated integration test suite for the dMoney API. It uses real HTTP requests to verify authentication, account setup, OTP verification, and money movement. Tests run sequentially because later scenarios use accounts and balances created by earlier scenarios.

## Technology & Tools

- **Node.js and npm** — JavaScript runtime and package management
- **Mocha** — test runner
- **Chai** — assertions
- **Axios** — HTTP client
- **dotenv** — loads configuration from `.env`

## How to Run

1. Start the dMoney API and make sure it is reachable.
2. Install Node.js and npm, then install the project dependencies:

   ```bash
   npm install
   ```

3. Create a local `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

4. Set `BASE_URL` and `X-AUTH-SECRET-KEY` in `.env` to match your API environment. The login and OTP credentials used by the tests must also be valid for that API.
5. Run the complete suite:

   ```bash
   npm test
   ```

   The test suite logs in and verifies OTPs, then saves the resulting Admin, System, Agent, and Customer tokens to `.env`. It prints the token responses in the terminal. Tokens expire, so run the suite again to refresh them. Keep `.env` and terminal output containing tokens private; do not commit them.

To generate fresh Admin and System tokens separately, run:

```bash
npm run generate:tokens
```

## Test Scenarios (Positive & Negative)

### Positive scenarios

- Check the configured API base URL and log in as Admin.
- Create and activate two Customers, an Agent, and a Merchant.
- Log in as System and deposit 5,000 to the Agent.
- Log in and verify OTP for the Agent, then deposit 2,000 to Customer 1.
- Log in and verify OTP for Customers 1 and 2.
- Send 1,000 from Customer 1 to Customer 2.
- Withdraw 500 from Customer 2 through the Agent.
- Pay 400 from Customer 2 to the Merchant.

### Negative scenarios

Negative cases run at the end of the suite:

- Admin login with an incorrect password.
- Attempt to create a user with a duplicate email.
- Attempt to activate a user without an authorization token.
- System deposit to a nonexistent account.
- Customer money transfer without the required secret key.
- Merchant payment with insufficient balance.

## Test Report

`npm test` uses Mocha’s default terminal reporter. It displays each passing or failing test and a final summary with the total number of passing and failing tests. The project does not currently generate a separate HTML or JSON report.

### Reference screenshots

<img width="1105" height="1600" alt="Test output screenshot 1" src="https://github.com/user-attachments/assets/55596c39-139e-47dc-ac45-76ac2aaf7880" />
<img width="1113" height="1600" alt="Test output screenshot 2" src="https://github.com/user-attachments/assets/2eb9d379-36f9-4642-8b32-b590e3f79f7c" />
<img width="1600" height="850" alt="Test output screenshot 3" src="https://github.com/user-attachments/assets/3dc69041-2acd-4b13-9e6e-cd2492077f1c" />
