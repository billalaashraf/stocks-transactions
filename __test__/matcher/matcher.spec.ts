import { matcher } from '../../src/matcher/matcher';

jest.mock('../../src/loader/loader', () => ({
  LoadStocks: jest.fn().mockImplementation((T) => Promise.resolve(
    [
      { sku: "LTV719449/39/39", stock: 8525 },
      { sku: "CLQ274846/07/46", stock: 8414 },
      { sku: "CLQ274846/07/47", stock: 0 }
    ]
    )),
  LoadTransactions: jest.fn().mockImplementation((T) => Promise.resolve(
    [
      { sku: "LTV719449/39/39", type: "order", qty: 8 },
      { sku: "LTV719449/39/39", type: "order", qty: 4 },
      { sku: "CLQ274846/07/46", type: "order", qty: 4 },
      { sku: "CLQ274846/07/46", type: "refund", qty: 4 }
    ]
    ))
}));
describe('matcher function', () => {

  it('should throw an error if stock are not found', async () => {
    try {
      await matcher('SOMESKU');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw an error if sku is not in stock', async () => {
    try {
      await matcher('CLQ274846/07/47');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return the correct quantity if sku is in stock', async () => {
    const loadSku = await matcher('LTV719449/39/39');
    expect(loadSku.sku).toBe('LTV719449/39/39');
    expect(loadSku.qty).toBe(8513);

  });

  it('should handle order and refund transactions correctly', async () => {
    const loadSku = await matcher('CLQ274846/07/46');
    expect(loadSku.sku).toBe('CLQ274846/07/46');
    expect(loadSku.qty).toBe(8414);
  });
});