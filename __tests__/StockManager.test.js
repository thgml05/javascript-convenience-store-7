import StockManager from '../src/stock-manager/StockManager.js';

describe('재고 예외 테스트', () => {
  let stockManager;
  beforeEach(() => {
    stockManager = new StockManager();
    stockManager.loadProducts();
  });

  test('구매 상품이 존재하지 않는 상품인 경우 예외 테스트', () => {
    const items = [
      {
        name: '신라면',
        quantity: 1,
      },
      {
        name: '진라면',
        quantity: 2,
      },
    ];
    expect(() => {
      stockManager.validatePurchase(items);
    }).toThrow('[ERROR]');
  });

  test('구매 수량이 재고 수량을 초과한 경우 예외 테스트', () => {
    const items = [
      {
        name: '컵라면',
        quantity: 11,
      },
      {
        name: '콜라',
        quantity: 9,
      },
    ];
    expect(() => {
      stockManager.validatePurchase(items);
    }).toThrow('[ERROR]');
  });
});
