const URL_BASE = 'http://127.0.0.1:5000/pacientes';

async function cadastrarPaciente(nome, data, email, telefone, cidade, estado, senha) {
    const response = await fetch(`${URL_BASE}/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, data, email, telefone, cidade, estado, senha })
    });
    
    if (response.status === 409) return 'duplicado';
    return response.ok ? 'ok' : 'erro';
}

async function buscarPaciente(email, senha) {
    const response = await fetch(`${URL_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    
    return response.ok ? await response.json() : null;
}