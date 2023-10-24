/*
    Desenvolvedor : Ricardo C. Miranda
    Data          : 24/10/2023 
*/

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

module.exports = {
    selectCustomers, selectCustomer,
    insertCustomer, updateCustomer, deleteCustomer
}
