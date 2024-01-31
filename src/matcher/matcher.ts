import { Loader } from "../loader"
import { Files } from "../utils"
import { Matcher, Stocks, Transactions } from "../types";

export const matcher = async (sku: string):Promise<Matcher> => {
  const inStock: Matcher = {
    sku: sku,
    qty: 0
  }
  const loadSku = await Loader<Stocks[]>(Files.stockFile);
  const loadTransaction = await Loader<Transactions[]>(Files.transactionFile);

  if (!loadSku || !loadTransaction)
    throw new Error('Files not found');

  let quantity: number = loadSku.find(stock => stock.sku === sku)?.stock ?? 0;
  loadTransaction.filter(transaction => transaction.sku === sku)
                .every((transaction) => {
                  if (transaction.type === 'order') {
                    quantity -= transaction.qty;
                  } else if (transaction.type === 'refund') {
                    quantity += transaction.qty;
                  }
                  return quantity >= 0;
                });
  if (quantity === 0) throw new Error('Not in stock');
  inStock.qty = quantity
  return inStock;
}