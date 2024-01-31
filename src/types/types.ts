export type Stocks = {
  sku: string;
  stock: number;
}

export type Transactions = {
  sku: string;
  type: string;
  qty: number;
}

export type Matcher = {
  sku: string;
  qty: number;
}