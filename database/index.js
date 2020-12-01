const mysql = require(`mysql2`)

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


connection.connect((err) => {
if(!err)
    console.log(`${process.env.MYSQL_DATABASE} database is working properly ...`)
})
module.exports = connection.promise()