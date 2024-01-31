import { matcher } from '../../src/matcher/matcher';

describe('matcher function', () => {
  it('should throw an error if stock are not found', async () => {
    const loadSku = await matcher('SOMESKU');
    expect(loadSku).toThrow('Not in stock');
  });

  it('should throw an error if sku is not in stock', async () => {
    
  });

  it('should return the correct quantity if sku is in stock', async () => {
    
  });

  it('should handle order and refund transactions correctly', async () => {
    
  });
});