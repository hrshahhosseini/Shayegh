const express = require('express')
const { notAuthenticate } = require('../../middleware/authentication')
const Router = express.Router()
const login = require(`./auth`)
const router = require('./login/login')
const dashboard = require(`./dashboard`)
const userIsAuthenticated = require(`../../middleware/authentication`).authenticate
const userIsNotAuthenticate = require(`../../middleware/authentication`).notAuthenticate



Router.use(`/dashboard` , dashboard )



Router.get(`/dashboard`, userIsAuthenticated(), (req, res) => {
    res.send({ message: `here is dashboard` })
})
Router.use(`/auth`, login)

module.exports = Router