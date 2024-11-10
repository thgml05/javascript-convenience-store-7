import InputView from './io/InputView.js';
import OutputView from './io/OutputView.js';
import StockManager from './stock-manager/StockManager.js';

class App {
  async run() {
    const stockManager = new StockManager();
    await stockManager.loadProducts();

    OutputView.printProducts(stockManager.products);
    let items = await InputView.readItems();
  }
}

export default App;
