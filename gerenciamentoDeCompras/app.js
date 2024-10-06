// Acessando os elementos do DOM
var inputItem = document.getElementById('input-item');
var inputQuantidade = document.getElementById('input-quantidade');
var inputPreco = document.getElementById('input-preco');
var inputData = document.getElementById('input-data');
var addItemBtn = document.getElementById('add-item-btn');
var listaDeItens = document.getElementById('lista-de-itens');
var listaDeCompras = document.getElementById('lista-de-compras');
var alterarItemNome = document.getElementById('alterar-item-nome');
var alterarQuantidade = document.getElementById('alterar-quantidade');
var alterarPreco = document.getElementById('alterar-preco');
var alterarData = document.getElementById('alterar-data');
var alterarItemBtn = document.getElementById('alterar-item-btn');
// Função para carregar itens do LocalStorage
function carregarItens() {
    var itensSalvos = localStorage.getItem('itens');
    if (itensSalvos) {
        var itensArray = JSON.parse(itensSalvos);
        itensArray.forEach(function (item) {
            adicionarItemNaLista(item.id, item.nome, item.quantidade, item.preco, item.data);
            verificarItemParaCompra(item);
        });
    }
}
// Função para adicionar um item à lista e ao LocalStorage
function adicionarItem() {
    var itemTexto = inputItem.value.trim();
    var quantidade = parseInt(inputQuantidade.value);
    var preco = parseFloat(inputPreco.value);
    var data = inputData.value;
    if (itemTexto !== "" && !isNaN(quantidade) && !isNaN(preco) && data !== "") {
        var itemId = Date.now(); // Usando timestamp como ID único
        adicionarItemNaLista(itemId, itemTexto, quantidade, preco, data);
        salvarItemNoLocalStorage(itemId, itemTexto, quantidade, preco, data);
        verificarItemParaCompra({ id: itemId, nome: itemTexto, quantidade: quantidade, preco: preco, data: data });
        inputItem.value = "";
        inputQuantidade.value = "";
        inputPreco.value = "";
        inputData.value = "";
    }
    else {
        alert("Por favor, preencha todos os campos.");
    }
}
// Função para adicionar o item à interface (DOM)
function adicionarItemNaLista(id, nome, quantidade, preco, data) {
    var novoItem = document.createElement('li');
    novoItem.innerHTML = "".concat(nome, " - Quantidade: ").concat(quantidade, ", Pre\u00E7o: R$").concat(preco.toFixed(2), ", Pr\u00F3xima compra: ").concat(data);
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Remover";
    deleteBtn.addEventListener('click', function () { return removerItem(id, novoItem); });
    novoItem.appendChild(deleteBtn);
    listaDeItens.appendChild(novoItem);
}
// Função para salvar o item no LocalStorage
function salvarItemNoLocalStorage(id, nome, quantidade, preco, data) {
    var itensSalvos = localStorage.getItem('itens');
    var itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];
    itensArray.push({ id: id, nome: nome, quantidade: quantidade, preco: preco, data: data });
    localStorage.setItem('itens', JSON.stringify(itensArray));
}
// Função para remover um item
function removerItem(id, elementoHTML) {
    listaDeItens.removeChild(elementoHTML);
    var itensSalvos = localStorage.getItem('itens');
    var itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];
    itensArray = itensArray.filter(function (item) { return item.id !== id; });
    localStorage.setItem('itens', JSON.stringify(itensArray));
}
// Função para verificar se um item precisa ser comprado
function verificarItemParaCompra(item) {
    var dataHoje = new Date().toISOString().split('T')[0];
    if (new Date(item.data) <= new Date(dataHoje)) {
        var itemCompra = document.createElement('li');
        itemCompra.textContent = "".concat(item.nome, " - Quantidade: ").concat(item.quantidade, ", Pre\u00E7o: R$").concat(item.preco.toFixed(2));
        listaDeCompras.appendChild(itemCompra);
    }
}
// Função para alterar um item existente
function alterarItem() {
    var nome = alterarItemNome.value.trim();
    var novaQuantidade = parseInt(alterarQuantidade.value);
    var novoPreco = parseFloat(alterarPreco.value);
    var novaData = alterarData.value;
    if (nome !== "" && !isNaN(novaQuantidade) && !isNaN(novoPreco) && novaData !== "") {
        var itensSalvos = localStorage.getItem('itens');
        var itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];
        var itemExistente = itensArray.find(function (item) { return item.nome === nome; });
        if (itemExistente) {
            itemExistente.quantidade = novaQuantidade;
            itemExistente.preco = novoPreco;
            itemExistente.data = novaData;
            localStorage.setItem('itens', JSON.stringify(itensArray));
            location.reload(); // Recarregar a página para mostrar os itens atualizados
        }
        else {
            alert("Item não encontrado.");
        }
    }
    else {
        alert("Preencha todos os campos para alterar o item.");
    }
}
// Evento para adicionar um item quando o botão for clicado
addItemBtn.addEventListener('click', adicionarItem);
alterarItemBtn.addEventListener('click', alterarItem);
// Carregar os itens quando a página for carregada
window.addEventListener('load', carregarItens);
