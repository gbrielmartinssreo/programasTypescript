// Acessando os elementos do DOM
const inputItem = document.getElementById('input-item') as HTMLInputElement;
const inputQuantidade = document.getElementById('input-quantidade') as HTMLInputElement;
const inputPreco = document.getElementById('input-preco') as HTMLInputElement;
const inputData = document.getElementById('input-data') as HTMLInputElement;
const addItemBtn = document.getElementById('add-item-btn') as HTMLButtonElement;

const listaDeItens = document.getElementById('lista-de-itens') as HTMLUListElement;
const listaDeCompras = document.getElementById('lista-de-compras') as HTMLUListElement;

const alterarItemNome = document.getElementById('alterar-item-nome') as HTMLInputElement;
const alterarQuantidade = document.getElementById('alterar-quantidade') as HTMLInputElement;
const alterarPreco = document.getElementById('alterar-preco') as HTMLInputElement;
const alterarData = document.getElementById('alterar-data') as HTMLInputElement;
const alterarItemBtn = document.getElementById('alterar-item-btn') as HTMLButtonElement;

// Função para carregar itens do LocalStorage
function carregarItens(): void {
    const itensSalvos = localStorage.getItem('itens');
    if (itensSalvos) {
        const itensArray = JSON.parse(itensSalvos);
        itensArray.forEach((item: { id: number, nome: string, quantidade: number, preco: number, data: string }) => {
            adicionarItemNaLista(item.id, item.nome, item.quantidade, item.preco, item.data);
            verificarItemParaCompra(item);
        });
    }
}

// Função para adicionar um item à lista e ao LocalStorage
function adicionarItem(): void {
    const itemTexto = inputItem.value.trim();
    const quantidade = parseInt(inputQuantidade.value);
    const preco = parseFloat(inputPreco.value);
    const data = inputData.value;

    if (itemTexto !== "" && !isNaN(quantidade) && !isNaN(preco) && data !== "") {
        const itemId = Date.now(); // Usando timestamp como ID único

        adicionarItemNaLista(itemId, itemTexto, quantidade, preco, data);
        salvarItemNoLocalStorage(itemId, itemTexto, quantidade, preco, data);
        verificarItemParaCompra({ id: itemId, nome: itemTexto, quantidade, preco, data });

        inputItem.value = "";
        inputQuantidade.value = "";
        inputPreco.value = "";
        inputData.value = "";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para adicionar o item à interface (DOM)
function adicionarItemNaLista(id: number, nome: string, quantidade: number, preco: number, data: string): void {
    const novoItem = document.createElement('li');
    novoItem.innerHTML = `${nome} - Quantidade: ${quantidade}, Preço: R$${preco.toFixed(2)}, Próxima compra: ${data}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Remover";
    deleteBtn.addEventListener('click', () => removerItem(id, novoItem));

    novoItem.appendChild(deleteBtn);
    listaDeItens.appendChild(novoItem);
}

// Função para salvar o item no LocalStorage
function salvarItemNoLocalStorage(id: number, nome: string, quantidade: number, preco: number, data: string): void {
    const itensSalvos = localStorage.getItem('itens');
    let itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];

    itensArray.push({ id, nome, quantidade, preco, data });

    localStorage.setItem('itens', JSON.stringify(itensArray));
}

// Função para remover um item
function removerItem(id: number, elementoHTML: HTMLLIElement): void {
    listaDeItens.removeChild(elementoHTML);

    let itensSalvos = localStorage.getItem('itens');
    let itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];

    itensArray = itensArray.filter((item: { id: number }) => item.id !== id);
    localStorage.setItem('itens', JSON.stringify(itensArray));
}

// Função para verificar se um item precisa ser comprado
function verificarItemParaCompra(item: { id: number, nome: string, quantidade: number, preco: number, data: string }): void {
    const dataHoje = new Date().toISOString().split('T')[0];
    if (new Date(item.data) <= new Date(dataHoje)) {
        const itemCompra = document.createElement('li');
        itemCompra.textContent = `${item.nome} - Quantidade: ${item.quantidade}, Preço: R$${item.preco.toFixed(2)}`;
        listaDeCompras.appendChild(itemCompra);
    }
}

// Função para alterar um item existente
function alterarItem(): void {
    const nome = alterarItemNome.value.trim();
    const novaQuantidade = parseInt(alterarQuantidade.value);
    const novoPreco = parseFloat(alterarPreco.value);
    const novaData = alterarData.value;

    if (nome !== "" && !isNaN(novaQuantidade) && !isNaN(novoPreco) && novaData !== "") {
        let itensSalvos = localStorage.getItem('itens');
        let itensArray = itensSalvos ? JSON.parse(itensSalvos) : [];

        const itemExistente = itensArray.find((item: { nome: string }) => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade = novaQuantidade;
            itemExistente.preco = novoPreco;
            itemExistente.data = novaData;

            localStorage.setItem('itens', JSON.stringify(itensArray));
            location.reload(); // Recarregar a página para mostrar os itens atualizados
        } else {
            alert("Item não encontrado.");
        }
    } else {
        alert("Preencha todos os campos para alterar o item.");
    }
}

// Evento para adicionar um item quando o botão for clicado
addItemBtn.addEventListener('click', adicionarItem);
alterarItemBtn.addEventListener('click', alterarItem);

// Carregar os itens quando a página for carregada
window.addEventListener('load', carregarItens);
