export class CashRegister {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("stock")) || [];
    this.clientName = null;
  }

  startSale(clientName) {
    this.clientName = clientName;
    console.log(`Venda iniciada para o cliente ${clientName}`);
  }

  addItem(barcode, quantity) {
    try {
      if (!barcode || !quantity) {
        throw new Error("Código de barras e quantidade são obrigatórios");
      }
      const product = this.items.find((item) => item.barcode === barcode);
      if (!product) {
        throw new Error(
          `Produto com código de barras ${barcode} não encontrado`
        );
      }
      if (product.quantity < quantity) {
        throw new Error(
          `Quantidade solicitada (${quantity}) maior do que a quantidade em estoque (${product.quantity})`
        );
      }
      product.quantity -= quantity;
      console.log(`${quantity} ${product.name}(s) adicionado ao carrinho`);
      localStorage.setItem("estoque", JSON.stringify(this.items));
    } catch (error) {
      console.error(error.message);
    }
  }

  addProduct(barcode, name, price, quantity) {
    try {
      if (!barcode || !name || !price || !quantity) {
        throw new Error("Todos os campos são obrigatórios");
      }
      const product = this.items.find((item) => item.barcode === barcode);
      if (product) {
        throw new Error(`Já existe um produto com código de barras ${barcode}`);
      }
      this.items.push({ barcode, name, price, quantity });
      console.log(`${name} adicionado ao estoque`);
      localStorage.setItem("estoque", JSON.stringify(this.items));
    } catch (error) {
      console.error(error.message);
    }
  }

  closeSale(money) {
    try {
      if (!money) {
        throw new Error("Dinheiro é necessário");
      }
      const total = this.getTotal();
      if (money < total) {
        throw new Error("Não há dinheiro suficiente para fechar a venda");
      }
      const change = money - total;
      console.log(`Venda fechada. Total: ${total}. Troco: ${change}`);
    } catch (error) {
      console.error(error.message);
    }
  }

  getTotal() {
    try {
      const total = this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return total;
    } catch (error) {
      console.error(error.message);
    }
  }
}
