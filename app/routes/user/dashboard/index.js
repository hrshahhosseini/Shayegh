const express = require(`express`)
const Router = express.Router()
const wallet = require(`./wallet`)
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const dashboardController = require(`../../../controllers/user/dashboardController`)

Router.get(`/`, (req, res) => {
    res.send({ msg: req.user, message: `here is dashboard ...` })
})
Router.post(`/newGroup`, [isAuthenticated()], dashboardController.createGroup)
Router.post(`/addToGroup`, [isAuthenticated()], dashboardController.addToGroup)
Router.post(`/removeFromGroup`, [isAuthenticated()], dashboardController.remove)
Router.post(`/removeGroup`, [isAuthenticated()], dashboardController.removeGroup)
Router.use(`/wallet`, wallet)


module.exports = Router