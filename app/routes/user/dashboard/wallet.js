const express = require(`express`)
const Router = express.Router()
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const controller = require(`../../../controllers/user/dashboardController`)

Router.get(`/`, (req, res) => {
    res.send({ message: `hi` })
})
Router.post(`/charge-wallet`, [isAuthenticated()], controller.wallet)





module.exports = Router