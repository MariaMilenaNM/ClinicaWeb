import express from "express";
import { PrismaClient } from "@prisma/client";

const routes = express.Router();

const prisma = new PrismaClient();

routes.post("/cadastrar", async (req, res) => {
    const dados = req.body;

    const jaExiste = await prisma.paciente.findUnique({
        where: { email: dados.email }
    });
    if (jaExiste) {
        return res.status(409).json({ status: "duplicado" });
    }

    await prisma.paciente.create({
        data: {
            nome:     dados.nome,
            data:     dados.data,
            email:    dados.email,
            telefone: dados.telefone,
            cidade:   dados.cidade,
            estado:   dados.estado,
            senha:    dados.senha
        }
    });
    return res.status(201).json({ status: "ok" });
});

routes.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const paciente = await prisma.paciente.findFirst({
        where: { email, senha }
    });
    if (!paciente) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    const { senha: _, ...pacienteSeguro } = paciente;
    return res.status(200).json(pacienteSeguro);
});

routes.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const paciente = await prisma.paciente.findUnique({
        where: { id }
    });
    if (!paciente) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    const { senha: _, ...pacienteSeguro } = paciente;
    return res.status(200).json(pacienteSeguro);
});

routes.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const dados = req.body;

    const existe = await prisma.paciente.findUnique({ where: { id } });
    if (!existe) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    await prisma.paciente.update({
        where: { id },
        data: {
            ...(dados.nome     && { nome:     dados.nome }),
            ...(dados.telefone && { telefone: dados.telefone }),
            ...(dados.cidade   && { cidade:   dados.cidade }),
            ...(dados.estado   && { estado:   dados.estado })
        }
    });
    return res.status(200).json({ status: "atualizado" });
});

routes.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const existe = await prisma.paciente.findUnique({ where: { id } });
    if (!existe) {
        return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    await prisma.paciente.delete({ where: { id } });
    return res.status(200).json({ status: "removido" });
});

export default routes;