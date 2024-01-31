"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const matcher_1 = require("./matcher");
console.log(figlet_1.default.textSync('Stocks and Transactions', { horizontalLayout: 'default' }));
const program = new commander_1.Command();
program
    .version('0.0.1')
    .description('Stocks and Transactions')
    .option('-s, --sku <value>', 'Input the SKU ')
    .parse(process.argv);
const options = program.opts();
if (options.sku) {
    const sku = options.sku;
    console.log(`SKU: ${sku}`);
    (0, matcher_1.matcher)(sku).then((result) => {
        console.table([result]);
    });
}
