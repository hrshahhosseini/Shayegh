const express = require(`express`)
const Router = express.Router()
const authenticated = require(`../../../middleware/authentication`)
const notLoggedIn = authenticated.notAuthenticate
const loggedIn = authenticated.authenticate
const controller = require(`../../../controllers/user/dashboardController`)

Router.get(`/`, [loggedIn()], (req, res) => {
    res.send({ message: `here is wallet ...` })
})
Router.post(`/charge-wallet`, [loggedIn()], controller.wallet)

Router.post(`/charge-request`, [loggedIn()], controller.requestCharge)

Router.get(`/confirm-charge-request/:token`, [loggedIn()], function (req, res, next) {
    const token = req.params.token
    if (req.isAuthenticated())
        return next()
    else {
        return res.redirect(`/auth/login/dashboard/wallet/confirm-charge-request/${token}`)
    }
}, controller.requestChargeShow)

Router.post(`/confirm-charge-request/:token`, [loggedIn()], controller.requestChargeDo)


module.exports = Router