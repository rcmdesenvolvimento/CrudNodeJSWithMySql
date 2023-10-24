/*
    Desenvolvedor : Ricardo C. Miranda
    Data          : 24/10/2023 
*/

require("dotenv").config();

const express = require('express');
const app = express();
const db = require("./db.js")
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Seja Bem Vindo!' }));

app.get('/clientes', async (req, res) => {
    const results = await db.selectCustomers();
    res.json(results);
});

app.get("/clientes/:id", async (req, res) => {
    const cliente = await db.selectCustomer(req.params.id);
    res.json(cliente);
});

app.post("/clientes", async (req, res) => {
    await db.insertCustomer(req.body);
    res.sendStatus(201);
})

app.patch('/clientes/:id', async (req, res) => {
    await db.updateCustomer(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/clientes/:id", async (req, res) => {
    const cliente = await db.deleteCustomer(req.params.id);
    res.sendStatus(204);
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
