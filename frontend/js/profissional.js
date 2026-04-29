        Retrieve();

        async function Create(){
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

          let dadosProfissional = { nome, crp, modalidade, link, numero, contato };
          
          await criarProfissional(dadosProfissional);
          await Retrieve();
          
          document.getElementById("nome").value = "";
          document.getElementById("crp").value = "";
          document.getElementById("modPresencial").checked = false;
          document.getElementById("modRemota").checked = false;
          document.getElementById("link").value = "";
          document.getElementById("numero").value = "";
          document.getElementById("contato").value = "";
        
        
        };

        async function Retrieve(){
          let tbody = document.getElementById("resultados");
          let html = "";

          let profissionais = await getProfissionais();  

          profissionais.forEach(elemento => {
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

        async function Update(id){

          let resultado = await buscarProfissionalPorId(id);

          let html = `<input type="text" id="nomeParaEditar" placeholder="Nome" value="${resultado.nome}">
                      <input type="text" id="crpParaEditar" placeholder="CRP" value="${resultado.crp}">
                      <input type="text" id="modalidadeParaEditar" placeholder="Modalidade" value="${resultado.modalidade}">
                      <input type="text" id="linkParaEditar" placeholder="Link Instagram" value="${resultado.link}">
                      <input type="text" id="numeroParaEditar" placeholder="Número" value="${resultado.numero}">
                      <input type="text" id="contatoParaEditar" placeholder="Contato" value="${resultado.contato}">
                      <button onclick="editarDados(${id})" style="padding: 10px; cursor: pointer;">Confirmar Edição</button>`;
          
          document.getElementById('editar').innerHTML = html;
        };

        async function editarDados(id){
        let dadosAtualizados = {
              nome: document.getElementById("nomeParaEditar").value,
              crp: document.getElementById("crpParaEditar").value,
              modalidade: document.getElementById("modalidadeParaEditar").value,
              link: document.getElementById("linkParaEditar").value,
              numero: document.getElementById("numeroParaEditar").value,
              contato: document.getElementById("contatoParaEditar").value
            };

        await atualizarProfissionalBd(id, dadosAtualizados);

        await Retrieve();

        document.getElementById('editar').innerHTML = ""
        };

        async function Delete(id){
          await deletarProfissionalBd(id);
    
          Retrieve();
        };