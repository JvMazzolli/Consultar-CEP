const inputCep = document.getElementById('inputCep')
const inputLogradouro = document.getElementById('inputLogradouro')
const inputBairro = document.getElementById('inputBairro')
const inputUf = document.getElementById('inputUf')
const inputIbge = document.getElementById('inputIbge')
const inputCidade = document.getElementById('inputCidade')
const inputComplemento = document.getElementById('inputComplemento')
const listaCeps = document.getElementById('listaCEPs')

let = cepsPesquisados = []
function consultaCep() {
    const cep = document.getElementById('cep').value
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(json => {
            inputCep.value = json.cep
            inputLogradouro.value = json.logradouro
            inputBairro.value = json.bairro
            inputCidade.value = json.localidade
            inputIbge.value = json.ibge
            inputUf.value = json.uf
            inputComplemento.value = json.complemento
        })
        .catch(error => console.log(error))
}

function salvarCep() {
    cepsPesquisados.push({
        cep: inputCep.value,
        logradouro: inputLogradouro.value,
        bairro: inputBairro.value,
        cidade: inputCidade.value,
        ibge: inputIbge.value,
        uf: inputUf.value,
        complemento: inputComplemento.value,
    })
    criarLista()
}

function criarLista() {
    while (listaCeps.firstChild) {
        listaCeps.firstChild.remove()
    }
    cepsPesquisados.forEach((cep, posicao) => {
        const textoLinha = `${cep.cep} - ${cep.logradouro} - ${cep.bairro} - ${cep.cidade} - ${cep.ibge} - ${cep.uf} - ${cep.complemento}`
        const linha = document.createElement('li')
        const p = document.createElement('p')
        const botao = document.createElement('button')
        botao.setAttribute('onclick', `deletarCep(${posicao})`)
        botao.innerText = 'Deletar'
        p.innerText = textoLinha
        p.appendChild(botao)
        linha.appendChild(p)
        listaCeps.appendChild(linha)
    })
    localStorage.setItem('ceps', JSON.stringify(cepsPesquisados))
}

function deletarCep(posicao) {
    cepsPesquisados.splice(posicao, 1)
    criarLista()
}

function recarregarCeps() {
    const cepsLocalStorage = localStorage.getItem('ceps')
    if (cepsLocalStorage) {
        cepsPesquisados = JSON.parse(cepsLocalStorage)
    }
    criarLista()
}

recarregarCeps()