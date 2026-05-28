import express from "express";

const routes = express.Router();


let profissionais = [];


routes.get("/", (req, res) => {
    res.status(200).json(profissionais);
});


routes.post("/", (req, res) => {
    const dados = req.body;
    
    if (!dados || Object.keys(dados).length === 0) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }


    const newId = profissionais.length > 0 ? Math.max(...profissionais.map(p => p.id)) + 1 : 1;
    
    const novoProfissional = { id: newId, ...dados };
    profissionais.push(novoProfissional);

    return res.status(201).json(novoProfissional);
});

routes.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const profissional = profissionais.find(p => p.id === id);

    if (profissional) {
        return res.status(200).json(profissional);
    }
    return res.status(404).json({ erro: "404" });
});

routes.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosNovos = req.body;
    
    const index = profissionais.findIndex(p => p.id === id);

    if (index !== -1) {
        profissionais[index] = { ...profissionais[index], ...dadosNovos, id: id };
        return res.status(200).json(profissionais[index]);
    }
    return res.status(404).json({ erro: "404" });
});

routes.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = profissionais.findIndex(p => p.id === id);

    if (index !== -1) {
        profissionais.splice(index, 1); 
        return res.status(200).json({ status: "removido" });
    }
    return res.status(404).json({ erro: "404" });
});

export default routes;