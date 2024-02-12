import { Loader } from '../../src/loader/loader';
import { Stock, Transaction } from '../../src/types';
import path from 'path';

const stock: Stock[] = [
  { sku: "LTV719449/39/39", stock: 8525 },
  { sku: "CLQ274846/07/46", stock: 8414 }
];

const transaction: Transaction[] = [
  { sku: "KED089097/68/09", type: "order", qty: 8 },
  { sku: "DOK019240/66/49", type: "order", qty: 4 }
];

describe('Loader', () => {
  test('Loader should load stocks from file', async () => {
    const stocks = await Loader<Stock[]>(path.join(__dirname, 'data/test_stock.json'));
    expect(stocks).toEqual(stock);
  });

  test('Loader should load transactions from file', async () => {
    const transactions = await Loader<Transaction[]>(path.join(__dirname, 'data/test_transactions.json'));
    expect(transactions).toEqual(transaction);
  });

  test('Loader should return undefined for non-existing file', async () => {
    const data = await Loader<Stock[] | Transaction[]>(path.join(__dirname, 'data/non-existing.json'));
    expect(data).toBeUndefined();
  });

  test('Loader should return undefined for invalid JSON file', async () => {
    const data = await Loader<Stock[] | Transaction[]>(path.join(__dirname, 'data/invalid.json'));
    expect(data).not.toBe(stock);
  });
});