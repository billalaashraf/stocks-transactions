import * as fs from 'fs';
import { Stocks, Transactions } from '../types';

const Loader = async<T extends Stocks[] | Transactions[]>(file: string): Promise<T | undefined> => {
  try {
    const data = await fs.promises.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

export { Loader };