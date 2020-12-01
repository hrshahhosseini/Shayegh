const cookieParser = require(`cookie-parser`)
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const session = require(`express-session`)
const passport = require(`passport`)
const MySQLStore = require('express-mysql-session')(session)
const mySQLOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    schema: {
        tableName: `DD_session`
    }
}; const sessionStore = new MySQLStore(mySQLOptions)

exports.bootConfig = (application) => {
    application.use(bodyParser.json())
    application.use(bodyParser.urlencoded({ extended: 'false' }))
    application.use(express.static(path.join(__dirname, '../../public')))
    application.use(cookieParser())
    application.use(session({
        name: 'DD.sid',
        store: sessionStore,
        secret: "sth hashed",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false
        }
    }))
    application.use(passport.initialize())
    application.use(passport.session())
}