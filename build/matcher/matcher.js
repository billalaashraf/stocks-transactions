"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcher = void 0;
const loader_1 = require("../loader");
const utils_1 = require("../utils");
const matcher = (sku) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const inStock = {
        sku: sku,
        qty: 0
    };
    const loadSku = yield (0, loader_1.Loader)(utils_1.Files.stockFile);
    const loadTransaction = yield (0, loader_1.Loader)(utils_1.Files.transactionFile);
    if (!loadSku || !loadTransaction)
        throw new Error('Files not found');
    let quantity = (_b = (_a = loadSku.find(stock => stock.sku === sku)) === null || _a === void 0 ? void 0 : _a.stock) !== null && _b !== void 0 ? _b : 0;
    loadTransaction.filter(transaction => transaction.sku === sku)
        .every((transaction) => {
        if (transaction.type === 'order') {
            quantity -= transaction.qty;
        }
        else if (transaction.type === 'refund') {
            quantity += transaction.qty;
        }
        return quantity >= 0;
    });
    if (quantity === 0)
        throw new Error('Not in stock');
    inStock.qty = quantity;
    return inStock;
});
exports.matcher = matcher;
