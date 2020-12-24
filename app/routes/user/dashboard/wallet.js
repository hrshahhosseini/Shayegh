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

Router.post(`/charge-request`, controller.requestCharge)

Router.get(`/confirm-request/:token`, [isAuthenticated()], controller.requestChargeShow)

Router.post(`/confirm-request/:token`, function (req, res, next) {
    if (req.isAuthenticated())
        return next()
    else
        return res.redirect(`auth/login`)
}, controller.requestChargeDo)




module.exports = Router