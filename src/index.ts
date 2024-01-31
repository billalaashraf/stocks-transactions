import figlet from 'figlet';
import { Command } from 'commander';
import { matcher } from './matcher';

console.log(figlet.textSync('Stocks and Transactions', { horizontalLayout: 'default' }));

const program = new Command();
program
  .version('0.0.1')
  .description('Stocks and Transactions')
  .option('-s, --sku <value>', 'Input the SKU ')
  .parse(process.argv);

const options = program.opts();

if (options.sku) {
  const sku = options.sku;
  console.log(`SKU: ${sku}`);
  matcher(sku).then((result) => {
    console.table([result]);
  })
}