/*
    Desenvolvedor : Ricardo C. Miranda
    Data          : 24/10/2023 
*/

const axios = require("axios").default;
const mysql = require('mysql2/promise');
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers() {
    const res = await client.query('SELECT * FROM clientes');
    return res[0];
}

async function selectCustomer(id) {
    const res = await client.query("SELECT * FROM Clientes WHERE id=?", [id]);
    return res[0];
}

async function insertCustomer(cliente) {
    const sql = "INSERT INTO Clientes(nome,idade,uf) VALUES(?, ?, ?)";
    const values = [cliente.nome, cliente.idade, cliente.uf]
    await client.query(sql, values);
}

async function updateCustomer(id, customer) {
    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?';
    const values = [customer.nome, customer.idade, customer.uf, id];
    await client.query(sql, values);
}

async function deleteCustomer(id) {
    return await client.query('DELETE FROM clientes where id=?;', [id]);
};

const getEndereco = async (cep) => {
    try {
        const viaCepURL = `https://brasilapi.com.br/api/cep/v1/22710310`;
        const { data } = await axios.get(viaCepURL)
        return data
    } catch (error) {
        console.error(error)
    }
}

async function getEndereco2(cep) {
    try {
        const viaCepURL = `https://brasilapi.com.br/api/cep/v1/${cep}`;
        const { data } = await axios.get(viaCepURL);
        return data;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    selectCustomers, selectCustomer, getEndereco, getEndereco2,
    insertCustomer, updateCustomer, deleteCustomer
}
