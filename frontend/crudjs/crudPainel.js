const URL_PAINEL = 'http://127.0.0.1:5000/pacientes';

async function buscarPacientePorId(id) {
    const res = await fetch(`${URL_PAINEL}/${id}`);
    return res.ok ? await res.json() : null;
}

async function atualizarPacienteBd(id, dados) {
    const res = await fetch(`${URL_PAINEL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return res.ok;
}