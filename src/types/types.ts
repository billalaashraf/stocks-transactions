export type Stock = {
  sku: string;
  stock: number;
}

export type Transaction = {
  sku: string;
  type: string;
  qty: number;
}

export type InStock = {
  sku: string;
  qty: number;
}