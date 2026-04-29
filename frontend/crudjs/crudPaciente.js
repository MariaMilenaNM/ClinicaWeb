function cadastrarPaciente(nome, data, email, telefone, cidade, estado, senha) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    let jaExiste = pacientes.find(p => p.email === email);
    if (jaExiste) return 'duplicado';
    let novoPaciente = { nome, data, email, telefone, cidade, estado, senha };
    pacientes.push(novoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    return 'ok';
}

function buscarPaciente(email, senha) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    return pacientes.find(p => p.email === email && p.senha === senha);
}