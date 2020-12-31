const express = require(`express`)
const Router = express.Router()
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const controller = require(`../../../controllers/user/dashboardController`)

Router.get(`/`, [isAuthenticated()], (req, res) => {
    res.send({ message: `hi` })
})
Router.post(`/charge-wallet`, [isAuthenticated()], controller.wallet)

Router.post(`/charge-request`, [isAuthenticated()], controller.requestCharge)

Router.get(`/confirm-charge-request/:token`, function (req, res, next) {
    const token = req.params.token
    if (req.isAuthenticated())
        return next()
    else {
        return res.redirect(`/auth/login/dashboard/wallet/confirm-charge-request/${token}`)
    }
}, controller.requestChargeShow)

Router.post(`/confirm-charge-request/:token`, [isAuthenticated()], controller.requestChargeDo)




module.exports = Router