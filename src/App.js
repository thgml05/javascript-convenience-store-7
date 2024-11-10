import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './io/InputView.js';
import OutputView from './io/OutputView.js';
import StockManager from './stock-manager/StockManager.js';

class App {
  async run() {
    const stockManager = new StockManager();
    await stockManager.loadProducts();

    OutputView.printProducts(stockManager.products);
    let items = await this.requestItems(stockManager);
    console.log(items);
  }

  async requestItems(stockManager) {
    while (true) {
      try {
        let items = await InputView.readItems();
        stockManager.validatePurchase(items);
        items = stockManager.addPriceToItems(items);
        return items;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }
}

export default App;
