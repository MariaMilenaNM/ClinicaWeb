import express from "express";

const routes = express.Router();

let pacientes = [];
let proximoId = 1;

routes.post("/cadastrar", (req, res) => {
    const dados = req.body;

    const jaExiste = pacientes.find((p) => p.email === dados.email);
    if (jaExiste) {
        return res.status(409).json({ status: "duplicado" });
    }

    const novoPaciente = {
        id: proximoId++,
        nome: dados.nome,
        data: dados.data,
        email: dados.email,
        telefone: dados.telefone,
        cidade: dados.cidade,
        estado: dados.estado,
        senha: dados.senha
    };

    pacientes.push(novoPaciente);
    return res.status(201).json({ status: "ok" });
});

routes.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const paciente = pacientes.find((p) => p.email === email && p.senha === senha);

    if (!paciente) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    const { senha: _, ...pacienteSeguro } = paciente;
    return res.status(200).json(pacienteSeguro);
});

routes.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const paciente = pacientes.find((p) => p.id === id);

    if (!paciente) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    const { senha: _, ...pacienteSeguro } = paciente;
    return res.status(200).json(pacienteSeguro);
});

routes.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dados = req.body;

    const paciente = pacientes.find((p) => p.id === id);
    if (!paciente) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    if (dados.nome)     paciente.nome     = dados.nome;
    if (dados.telefone) paciente.telefone = dados.telefone;
    if (dados.cidade)   paciente.cidade   = dados.cidade;
    if (dados.estado)   paciente.estado   = dados.estado;

    return res.status(200).json({ status: "atualizado" });
});

routes.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = pacientes.findIndex((p) => p.id === id);
 
    if (index === -1) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }
 
    pacientes.splice(index, 1);
    return res.status(200).json({ status: "removido" });
});
 

export default routes;