     let listaDeProfissionais = JSON.parse(localStorage.getItem('profissionais') || '[]');
        let index = listaDeProfissionais.length > 0
                ? Math.max(...listaDeProfissionais.map(p => p.id)) + 1
                : 0;

        Retrieve();

        function Create(){
          let nome = document.getElementById("nome").value;
          let crp = document.getElementById("crp").value;
          let presencial = document.getElementById("modPresencial").checked;
          let remota = document.getElementById("modRemota").checked;
          let link = document.getElementById("link").value;
          let numero = document.getElementById("numero").value;
          let contato = document.getElementById("contato").value;

          let modalidade = "";
          if (presencial && remota) modalidade = "Presencial e Remota";
          else if (presencial) modalidade = "Presencial";
          else if (remota) modalidade = "Remota";

          if (nome === "" || crp === "" || modalidade === "" || link === "" || numero === "" || contato === "") {
            alert("Por favor, preencha todos os campos.");
            return;
          }

          let entradaObj = {
            id: index,
            nome: nome,
            crp: crp,
            modalidade: modalidade,
            link: link,
            numero: numero,
            contato: contato
          }
          index++;
          listaDeProfissionais.push(entradaObj);
          localStorage.setItem('profissionais', JSON.stringify(listaDeProfissionais));
          Retrieve();

          document.getElementById("nome").value = "";
          document.getElementById("crp").value = "";
          document.getElementById("modPresencial").checked = false;
          document.getElementById("modRemota").checked = false;
          document.getElementById("link").value = "";
          document.getElementById("numero").value = "";
          document.getElementById("contato").value = "";
        };

        function Retrieve(){
          let tbody = document.getElementById("resultados");
          let html = "";
          listaDeProfissionais.forEach(elemento => {
            html += `<tr style="border-bottom: 1px solid #eee;">
                          <td style="padding: 8px;">${elemento.nome}</td>
                          <td style="padding: 8px;">${elemento.crp}</td>
                          <td style="padding: 8px;">${elemento.modalidade}</td>
                          <td style="padding: 8px;">${elemento.link}</td>
                          <td style="padding: 8px;">${elemento.numero}</td>
                          <td style="padding: 8px;">${elemento.contato}</td>
                          <td style="padding: 8px;">
                              <button onclick="Update(${elemento.id})" style="cursor: pointer;">Editar</button>
                              <button onclick="Delete(${elemento.id})" style="cursor: pointer;">Excluir</button>
                          </td>
                      </tr>`;
          });
          tbody.innerHTML = html;
        };

        function Update(id){
          let resultado = listaDeProfissionais.find(obj => obj.id === id);
          let html = `<input type="text" id="nomeParaEditar" placeholder="Nome" value="${resultado.nome}">
                      <input type="text" id="crpParaEditar" placeholder="CRP" value="${resultado.crp}">
                      <input type="text" id="modalidadeParaEditar" placeholder="Modalidade" value="${resultado.modalidade}">
                      <input type="text" id="linkParaEditar" placeholder="Link Instagram" value="${resultado.link}">
                      <input type="text" id="numeroParaEditar" placeholder="Número" value="${resultado.numero}">
                      <input type="text" id="contatoParaEditar" placeholder="Contato" value="${resultado.contato}">
                      <button onclick="editarDados(${id})" style="padding: 10px; cursor: pointer;">Confirmar Edição</button>`;
          let divEditar = document.getElementById('editar');
          divEditar.innerHTML = html;
        };

        function editarDados(id){
          let nome = document.getElementById("nomeParaEditar").value;
          let crp = document.getElementById("crpParaEditar").value;
          let modalidade = document.getElementById("modalidadeParaEditar").value;
          let link = document.getElementById("linkParaEditar").value;
          let numero = document.getElementById("numeroParaEditar").value;
          let contato = document.getElementById("contatoParaEditar").value;

          let resultado = listaDeProfissionais.find(obj => obj.id === id);
          resultado.nome = nome;
          resultado.crp = crp;
          resultado.modalidade = modalidade;
          resultado.link = link;
          resultado.numero = numero;
          resultado.contato = contato;

          localStorage.setItem('profissionais', JSON.stringify(listaDeProfissionais));
          Retrieve();
          let divEditar = document.getElementById('editar');
          divEditar.innerHTML = "";
        };

        function Delete(id){
          let novaLista = listaDeProfissionais.filter(obj => obj.id !== id);
          listaDeProfissionais = novaLista;
          localStorage.setItem('profissionais', JSON.stringify(listaDeProfissionais));
          Retrieve();
        };