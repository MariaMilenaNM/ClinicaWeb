    function mostrarCadastro() {
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('formCadastro').style.display = 'block';
        document.getElementById('authTitulo').innerText = 'Criar conta';
        document.getElementById('authSubtitulo').innerText = 'Preencha seus dados para se cadastrar';
    }

    function mostrarLogin() {
        document.getElementById('formCadastro').style.display = 'none';
        document.getElementById('formLogin').style.display = 'block';
        document.getElementById('authTitulo').innerText = 'Área do Paciente';
        document.getElementById('authSubtitulo').innerText = 'Acesse sua conta Mentis';
    }

    function cadastrar() {
        let nome      = document.getElementById('cadNome').value.trim();
        let data      = document.getElementById('cadData').value;
        let email     = document.getElementById('cadEmail').value.trim();
        let telefone  = document.getElementById('cadTelefone').value.trim();
        let cidade    = document.getElementById('cadCidade').value.trim();
        let estado    = document.getElementById('cadEstado').value;
        let senha     = document.getElementById('cadSenha').value;
        let senhaConf = document.getElementById('cadSenhaConf').value;

        if (!nome || !data || !email || !telefone || !cidade || !estado || !senha) {
            alert('Preencha todos os campos!');
            return;
        }
        if (senha.length < 6) {
            alert('A senha precisa ter pelo menos 6 caracteres.');
            return;
        }
        if (senha !== senhaConf) {
            alert('As senhas não coincidem!');
            return;
        }

        let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');

        let jaExiste = pacientes.find(p => p.email === email);
        if (jaExiste) {
            alert('Já existe uma conta com este e-mail. Faça login.');
            mostrarLogin();
            return;
        }

        let novoPaciente = { nome, data, email, telefone, cidade, estado, senha };
        pacientes.push(novoPaciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));

        alert('Conta criada com sucesso! Faça login.');
        mostrarLogin();
    }

    function fazerLogin() {
        let email = document.getElementById('loginEmail').value.trim();
        let senha = document.getElementById('loginSenha').value;

        if (!email || !senha) {
            alert('Preencha e-mail e senha.');
            return;
        }

        let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
        let encontrado = pacientes.find(p => p.email === email && p.senha === senha);

        if (!encontrado) {
            alert('E-mail ou senha incorretos.');
            return;
        }

        localStorage.setItem('pacienteLogado', JSON.stringify(encontrado));
        window.location.href = 'painel.html';
    }