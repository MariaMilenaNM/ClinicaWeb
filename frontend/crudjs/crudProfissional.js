const URL_PROF = 'http://127.0.0.1:5000/profissionais';

async function getProfissionais() {
    const res = await fetch(URL_PROF);
    return await res.json();
}

async function criarProfissional(dados) {
    await fetch(URL_PROF, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

async function buscarProfissionalPorId(id) {
    const res = await fetch(`${URL_PROF}/${id}`);
    return res.ok ? await res.json() : null;
}

async function atualizarProfissionalBd(id, dadosAtualizados) {
    await fetch(`${URL_PROF}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    });
}

async function deletarProfissionalBd(id) {
    await fetch(`${URL_PROF}/${id}`, { method: 'DELETE' });
}