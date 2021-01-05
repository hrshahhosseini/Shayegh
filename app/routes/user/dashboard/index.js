const express = require(`express`)
const Router = express.Router()
const wallet = require(`./wallet`)
const authenticated = require(`../../../middleware/authentication`)
const loggedIn = authenticated.authenticate
const notLoggedIn = authenticated.notAuthenticate
const dashboardController = require(`../../../controllers/user/dashboardController`)
Router.get(`/`, [loggedIn()], dashboardController.dashboard)
Router.post(`/newGroup`, [loggedIn()], dashboardController.createGroup)
Router.post(`/addToGroup`, [loggedIn()], dashboardController.addToGroup)
Router.post(`/removeFromGroup`, [loggedIn()], dashboardController.remove)
Router.post(`/removeGroup`, [loggedIn()], dashboardController.removeGroup)
Router.use(`/wallet`, wallet)


module.exports = Router