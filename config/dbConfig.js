require('dotenv').config()
const mysql = require('mysql');
const connection =  mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DBNAME,
    dialect: "mysql"
})
connection.connect((err,res)=>{
    if (err) throw err;
    console.log("sql connection made")
})
module.exports = connection