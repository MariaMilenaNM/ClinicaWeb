function getProfissionais() {
    return JSON.parse(localStorage.getItem('profissionais') || '[]');
}

function setProfissionais(lista) {
    localStorage.setItem('profissionais', JSON.stringify(lista));
}

function criarProfissional(dados) {
    let lista = getProfissionais();
    let index = lista.length > 0 ? Math.max(...lista.map(p => p.id)) + 1 : 0;
    
    let novoProfissional = { id: index, ...dados };
    lista.push(novoProfissional);
    setProfissionais(lista);
}

function buscarProfissionalPorId(id) {
    let lista = getProfissionais();
    return lista.find(obj => obj.id === id);
}

function atualizarProfissionalBd(id, dadosAtualizados) {
    let lista = getProfissionais();
    let profissional = lista.find(obj => obj.id === id);
    
    if (profissional) {

        Object.assign(profissional, dadosAtualizados);
        setProfissionais(lista);
    }
}

function deletarProfissionalBd(id) {
    let lista = getProfissionais();
    let novaLista = lista.filter(obj => obj.id !== id);
    setProfissionais(novaLista);
}