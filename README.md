# Transaction Management API

This project is a Transaction Management API developed using NestJS. The API allows for managing transactions, checking their status, and receiving webhook updates. It also features JWT authentication for securing endpoints.

## Table of Contents

- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
  - [GET /transactions](#get-transactions)
  - [GET /transactions/school/:school_id](#get-transactions-by-school)
  - [POST /check-status](#post-check-status)
  - [POST /webhook-status-update](#post-webhook-status-update)
  - [POST /manual-status-update](#post-manual-status-update)
- [JWT Authentication](#jwt-authentication)
- [Deployment](#deployment)
- [License](#license)

## Project Setup

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB running on your local machine or a cloud instance
- `npm` or `yarn` for package management

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/avinash-18-art/transaction-bakend.git
    cd transaction-management-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following environment variables:

    ```
    MONGO_URI=mongodb://localhost:27017/transactionDB
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRATION=1h
    ```

4. Run the application:

    ```bash
    npm run start
    ```

    The API will be running on `http://localhost:3000`.

## API Endpoints

### GET /transactions

Fetch all transactions.

- **Response:**

    ```json
    [
      {
        "collect_id": "123",
        "school_id": "456",
        "gateway": "PayPal",
        "order_amount": 1000,
        "transaction_amount": 950,
        "status": "Success",
        "custom_order_id": "abcd1234"
      },
      ...
    ]
    ```

### GET /transactions/school/:school_id

Fetch transactions for a specific school by `school_id`.

- **Params:**
    - `school_id`: The ID of the school (e.g., `456`).

- **Response:**

    ```json
    [
      {
        "collect_id": "123",
        "school_id": "456",
        "gateway": "PayPal",
        "order_amount": 1000,
        "transaction_amount": 950,
        "status": "Success",
        "custom_order_id": "abcd1234"
      },
      ...
    ]
    ```

### POST /check-status

Check the status of a transaction by `custom_order_id`.

- **Body:**

    ```json
    {
      "custom_order_id": "abcd1234"
    }
    ```

- **Response:**

    ```json
    {
      "status": "Success"
    }
    ```

### POST /webhook-status-update

Webhook endpoint to receive status updates for transactions.

- **Body:**

    ```json
    {
      "custom_order_id": "abcd1234",
      "status": "Failed"
    }
    ```

- **Response:**

    ```json
    {
      "message": "Transaction status updated successfully"
    }
    ```

### POST /manual-status-update

Manually update the status of a transaction.

- **Body:**

    ```json
    {
      "custom_order_id": "abcd1234",
      "status": "Pending"
    }
    ```

- **Response:**

    ```json
    {
      "message": "Transaction status updated successfully"
    }
    ```

## JWT Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### How to authenticate:

1. Send a POST request to `/auth/login` with the following body:

    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```

2. If the credentials are correct, the API will respond with a JWT token.

3. Use the JWT token to authenticate protected routes by adding it to the `Authorization` header in the format `Bearer <token>`.

    ```bash
    curl -H "Authorization: Bearer <your-jwt-token>" http://localhost:3000/transactions
    ```

## Deployment

### Deployment to Heroku

To deploy the API to Heroku:

1. Create a new Heroku app:

    ```bash
    heroku create transaction-management-api
    ```

2. Set up your MongoDB URI and JWT secret as environment variables on Heroku:

    ```bash
    heroku config:set MONGO_URI=mongodb://your_mongo_uri
    heroku config:set JWT_SECRET=your-jwt-secret
    ```

3. Push the code to Heroku:

    ```bash
    git push heroku main
    ```

4. Open your application:

    ```bash
    heroku open
    ```

The application will now be live on Heroku.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

"# transaction-bakend" 
