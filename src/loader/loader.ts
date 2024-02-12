import * as fs from 'fs';
import { Stock, Transaction } from '../types';
import { Files } from "../utils"

const Loader = async<T> (file: string): Promise<T | undefined> => { 
  try {
    return await fs.promises.readFile(file, 'utf8').then(JSON.parse)
  } catch (error) {
    return undefined
  }
};

const LoadStocks = async (): Promise<Stock[] | undefined> => Loader<Stock[] | undefined>(Files.stockFile);
const LoadTransactions = async (): Promise<Transaction[] | undefined> => Loader<Transaction[]| undefined>(Files.transactionFile);

export { Loader, LoadStocks, LoadTransactions };