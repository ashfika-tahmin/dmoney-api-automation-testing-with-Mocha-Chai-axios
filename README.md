# dMoney API Automation

## What is dMoney?

dMoney is a digital financial service for managing customer, agent, and merchant accounts.
This project automates API checks for account management, authentication, and money transactions.

## Technology & Tools

- **Node.js** — JavaScript runtime
- **Mocha** — test runner
- **Chai** — assertions
- **Axios** — HTTP requests
- **dotenv** — loads configuration from `.env`

## Project Features

- API integration tests for login, OTP verification, and user management
- Creates and activates customer, agent, and merchant accounts
- Exercises deposits, customer-to-customer transfers, withdrawals, and merchant payments
- Checks selected invalid requests, including duplicate users, missing authentication, and insufficient balance

## Test Scenarios

The test suite in `tests/dmoney.spec.js` covers:

- API base URL configuration and admin/system login
- Creating and activating customers, an agent, and a merchant
- System deposits to an agent and agent deposits to a customer
- Customer-to-customer money transfers, cashouts, and merchant payments
- Negative cases for invalid credentials, duplicate email, missing authorization or secret key, nonexistent accounts, and insufficient balance

The scenarios run in sequence and use accounts and credentials expected by the configured dMoney API environment.

## How to Run Tests

1. Install Node.js.
2. Install project dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (you can start from `.env.example`) and configure:

   ```env
   BASE_URL=http://localhost:5000
   X-AUTH-SECRET-KEY=your-api-secret
   ```

   Set these values to match your running API. The test suite also expects the login and OTP credentials currently specified in `tests/dmoney.spec.js` to be valid for that environment.

4. Run the tests:

   ```bash
   npm test
   ```

## Test Reports

Mocha's default reporter prints test results to the terminal, along with response details logged by the tests. The current setup does not generate a separate HTML or JSON report file.

## Attachments
<img width="1105" height="1600" alt="image-1" src="https://github.com/user-attachments/assets/55596c39-139e-47dc-ac45-76ac2aaf7880" />
<img width="1113" height="1600" alt="image-2" src="https://github.com/user-attachments/assets/2eb9d379-36f9-4642-8b32-b590e3f79f7c" />
<img width="1600" height="850" alt="image-3" src="https://github.com/user-attachments/assets/3dc69041-2acd-4b13-9e6e-cd2492077f1c" />




