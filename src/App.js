import OutputView from './io/OutputView.js';
import StockManager from './stock-manager/StockManager.js';

class App {
  async run() {
    const stockManager = new StockManager();
    await stockManager.loadProducts();

    OutputView.printProducts(stockManager.products);
  }
}

export default App;
