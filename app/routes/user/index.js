const express = require('express')
const { notAuthenticate } = require('../../middleware/authentication')
const Router = express.Router()
const login = require(`./auth`)
const dashboard = require(`./dashboard`)
const userIsAuthenticated = require(`../../middleware/authentication`).authenticate
const userIsNotAuthenticate = require(`../../middleware/authentication`).notAuthenticate



Router.use(`/dashboard`, dashboard)

Router.use(`/auth`, login)
Router.get(`/notFound`, (req, res) => {
    res.send({ message: `no such a route` })
})

module.exports = Router