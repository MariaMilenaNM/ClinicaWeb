    let pacienteLogado = JSON.parse(localStorage.getItem('pacienteLogado'));

    if (!pacienteLogado) {
        window.location.href = 'paciente.html';
    }

    let todosPsicologos = [];
    const ITENS_POR_PAGINA = 6;
    let paginaAtual = 1;

    window.onload = function() {
        atualizarSidebar();
        carregarPsicologos();
    };

    function atualizarSidebar() {
        let p = pacienteLogado;
        document.getElementById('avatarLetra').innerText   = p.nome.charAt(0).toUpperCase();
        document.getElementById('sidebarNome').innerText   = p.nome;
        document.getElementById('sidebarEmail').innerText  = p.email;
        document.getElementById('sidebarTelefone').innerText = p.telefone;
        document.getElementById('sidebarData').innerText   = formatarData(p.data);
        document.getElementById('sidebarLocal').innerText  = p.cidade + ' / ' + p.estado;
    }

    function formatarData(data) {
        if (!data) return '–';
        let partes = data.split('-');
        return partes[2] + '/' + partes[1] + '/' + partes[0];
    }

    let sidebarAberta = true;

    function toggleSidebar() {
        let sidebar  = document.getElementById('sidebar');
        let conteudo = document.getElementById('sidebarConteudo');
        sidebarAberta = !sidebarAberta;
        if (sidebarAberta) {
            sidebar.classList.remove('sidebar-fechada');
            conteudo.style.display = 'block';
        } else {
            sidebar.classList.add('sidebar-fechada');
            conteudo.style.display = 'none';
        }
    }

    function toggleEdicao() {
        let form = document.getElementById('formEditar');
        let visivel = form.style.display === 'block';
        if (!visivel) {
            document.getElementById('editNome').value     = pacienteLogado.nome;
            document.getElementById('editTelefone').value = pacienteLogado.telefone;
            document.getElementById('editCidade').value   = pacienteLogado.cidade;
            document.getElementById('editEstado').value   = pacienteLogado.estado;
        }
        form.style.display = visivel ? 'none' : 'block';
    }

    function salvarEdicao() {
        let novoNome     = document.getElementById('editNome').value.trim();
        let novoTelefone = document.getElementById('editTelefone').value.trim();
        let novaCidade   = document.getElementById('editCidade').value.trim();
        let novoEstado   = document.getElementById('editEstado').value;

        if (!novoNome || !novoTelefone || !novaCidade || !novoEstado) {
            alert('Preencha todos os campos para salvar.');
            return;
        }

        let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
        let idx = pacientes.findIndex(p => p.email === pacienteLogado.email);
        pacientes[idx].nome     = novoNome;
        pacientes[idx].telefone = novoTelefone;
        pacientes[idx].cidade   = novaCidade;
        pacientes[idx].estado   = novoEstado;
        localStorage.setItem('pacientes', JSON.stringify(pacientes));

        pacienteLogado.nome     = novoNome;
        pacienteLogado.telefone = novoTelefone;
        pacienteLogado.cidade   = novaCidade;
        pacienteLogado.estado   = novoEstado;
        localStorage.setItem('pacienteLogado', JSON.stringify(pacienteLogado));

        atualizarSidebar();
        toggleEdicao();
        alert('Perfil atualizado!');
    }

    function carregarPsicologos() {
        todosPsicologos = getProfissionais();
        paginaAtual = 1;
        renderizarCards();
    }

    function renderizarCards() {
        let grid = document.getElementById('cardsGrid');

        if (todosPsicologos.length === 0) {
            grid.innerHTML = '<p class="sem-dados">Nenhum profissional cadastrado ainda.</p>';
            document.getElementById('paginacao').innerHTML = '';
            return;
        }

        let inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
        let fim    = inicio + ITENS_POR_PAGINA;
        let pagina = todosPsicologos.slice(inicio, fim);

        let html = '';
        pagina.forEach(p => {
            let letra = p.nome ? p.nome.charAt(0).toUpperCase() : '?';
            let linkInsta = p.link ? p.link.replace('@', '') : '';
            html += `
        <div class="psi-card">
          <div class="psi-avatar">${letra}</div>
          <div class="psi-info">
            <h3 class="psi-nome">${p.nome}</h3>
            <span class="psi-crp">CRP: ${p.crp}</span>
            <span class="psi-modalidade tag-${p.modalidade === 'Presencial ' +
            'e Remota' ? 'ambas' : p.modalidade.toLowerCase()}">${p.modalidade}</span>
            <p class="psi-contato"> ${p.contato}</p>
            <p class="psi-contato"> ${p.numero}</p>
          </div>
          <a href="https://instagram.com/${linkInsta}" target="_blank" class="psi-btn-insta">
            Ver Instagram
          </a>
        </div>`;
        });

        grid.innerHTML = html;
        renderizarPaginacao();
    }

    function renderizarPaginacao() {
        let totalPaginas = Math.ceil(todosPsicologos.length / ITENS_POR_PAGINA);
        let div = document.getElementById('paginacao');

        if (totalPaginas <= 1) {
            div.innerHTML = '';
            return;
        }

        let html = '';
        for (let i = 1; i <= totalPaginas; i++) {
            html += `<button class="pag-btn ${i === paginaAtual ? 'pag-ativa' : ''}"
                       onclick="irParaPagina(${i})">${i}</button>`;
        }
        div.innerHTML = html;
    }

    function irParaPagina(num) {
        paginaAtual = num;
        renderizarCards();
        document.getElementById('cardsGrid').scrollIntoView({ behavior: 'smooth' });
    }

    function sair() {
        localStorage.removeItem('pacienteLogado');
        window.location.href = 'index.html';
    }

