import { LoadStocks, LoadTransactions } from "../loader";
import { InStock, Stock, Transaction } from "../types";

/**
 * Retrieves the stock quantity for a given SKU.
 * @param {string} sku - The stock keeping unit.
 * @returns {Promise<InStock>} - An object containing the SKU and its quantity in stock.
 */

export const matcher = async (sku: string):Promise<InStock> => {
  const inStock: InStock = {
    sku: sku,
    qty: 0
  }
  
  const skus: Stock[] | undefined = await LoadStocks();
  const transactions: Transaction[] | undefined = await LoadTransactions();

  let quantity: number = skus?.find(stock => stock.sku === sku)?.stock ?? 0;
  transactions?.filter(transaction => transaction.sku === sku)
                .every((transaction) => {
                  if (transaction.type === 'order') {
                    quantity -= transaction.qty;
                  } else if (transaction.type === 'refund') {
                    quantity += transaction.qty;
                  }
                  return quantity >= 0;
                });
  if (quantity <= 0) throw new Error('Not in stock');
  inStock.qty = quantity
  
  return inStock;
}