import { CashRegister } from "./modules/CashRegister.js";

// Criando uma instância da classe CaixaRegistradora
const cashRegister = new CashRegister();

// Adicionando alguns produtos no estoque
cashRegister.addProduct("123456", "Arroz", 10.0, 5);
cashRegister.addProduct("789012", "Feijão", 20.0, 10);
console.log("Estado após adicionar produtos ao estoque:", cashRegister);

// Iniciando atendimento para o cliente 'João'
cashRegister.startSale("João");

// Adicionando alguns itens na caixa registradora
cashRegister.addItem("123456", 2);
cashRegister.addItem("789012", 3);
console.log("Estado após adicionar itens ao carrinho:", cashRegister);

// Calculando o valor total da conta do cliente
console.log("Total:", cashRegister.getTotal());
cashRegister.closeSale(200);
console.log("Estado depois de fechar a venda:", cashRegister);