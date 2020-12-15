const express = require(`express`)
const Router = express.Router()
const wallet = require(`./wallet`)
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const dashboardController = require(`../../../controllers/user/dashboardController`)
Router.get(`/`, (req, res) => {
    res.send({ msg: `Hi, here is dashboard` })
})
Router.post(`/newGroup`, [isAuthenticated()], dashboardController.createGroup)
Router.post(`/addToGroup`, [isAuthenticated()], dashboardController.addToGroup)
Router.use(`/wallet`, wallet)


module.exports = Router