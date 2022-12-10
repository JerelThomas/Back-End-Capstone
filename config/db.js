const { Client } = require("pg");

const db = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'capstone_inventory_project',
    password:'03102004'
  })

db.connect()
.then(()=>console.log("Connected to db"))
.catch(err=>console.log("Error",err))

module.exports =db;