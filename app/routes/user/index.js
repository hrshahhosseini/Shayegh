const express = require('express')
const { notAuthenticate } = require('../../middleware/authentication')
const Router = express.Router()
const login = require(`./auth`)
const userIsAuthenticated = require(`../../middleware/authentication`).authenticate
const userIsNotAuthenticate = require(`../../middleware/authentication`).notAuthenticate
// Router.get(`/`, (req, res) => {
//     console.log(req.user, req.userIsAuthenticated())
//     res.send({ message: `here is dashboard ...` })
// })

Router.get(`/dashboard`, userIsAuthenticated(), (req, res) => {
    res.send({ message: `here is dashboard` })
})
Router.use(`/auth`, login)

module.exports = Router