import express from "express";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes = express.Router();

//let profissionais = [];

routes.get("/", async (req, res) => {
try {
        const profissionais = await prisma.profissional.findMany();
        res.status(200).json(profissionais);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar profissionais" });
    }
});


routes.post("/", async (req, res) => {
const dados = req.body;

    if (!dados || Object.keys(dados).length === 0) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    if (dados.crp) {
        dados.crp = parseInt(dados.crp, 10);
    }

    try {
        const novoProfissional = await prisma.profissional.create({
            data: dados
        });
        return res.status(201).json(novoProfissional);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao criar profissional" });
    }
});

routes.get("/:id", async (req, res) => {
const id = parseInt(req.params.id);

    try {
        const profissional = await prisma.profissional.findUnique({
            where: { id: id }
        });

        if (profissional) {
            return res.status(200).json(profissional);
        }
        return res.status(404).json({ erro: "Profissional não encontrado (404)" });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao buscar profissional" });
    }
});

routes.put("/:id", async (req, res) => {
const id = parseInt(req.params.id);
    const dadosNovos = req.body;

    try {
        const profissionalAtualizado = await prisma.profissional.update({
            where: { id: id },
            data: dadosNovos
        });
        return res.status(200).json(profissionalAtualizado);
    } catch (error) {
        // O Prisma dispara um erro automaticamente se tentar dar update num ID que não existe
        return res.status(404).json({ erro: "Profissional não encontrado (404)" });
    }
});

routes.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.profissional.delete({
            where: { id: id }
        });
        return res.status(200).json({ status: "removido" });
    } catch (error) {
        // O Prisma dispara um erro automaticamente se tentar deletar um ID que não existe
        return res.status(404).json({ erro: "Profissional não encontrado (404)" });
    }
});

export default routes;