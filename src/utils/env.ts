import * as dotenv from 'dotenv';

//Load .env file
dotenv.config();

export const Files = {
  stockFile: process.env.STOCK_FILE_PATH ?? '',
  transactionFile: process.env.TRANSACTIONS_FILE_PATH ?? '',
}