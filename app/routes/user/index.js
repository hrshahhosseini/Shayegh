const express = require('express')
const Router = express.Router()
const login = require(`./auth`)
const dashboard = require(`./dashboard`)



Router.get(`/`, (req, res) => {
    res.send({ message: `here is root ...` })
})
Router.use(`/dashboard`, dashboard)

Router.use(`/auth`, login)
Router.get(`/notFound`, (req, res) => {
    res.send({ message: `no such a route` })
})

module.exports = Router