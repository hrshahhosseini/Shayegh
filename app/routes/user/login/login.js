const express = require(`express`)
const router = express.Router()
const loginValidator = require(`../../../validator/loginValidatorMiddleware`)
const validatorPartials = require(`../../../validator/loginValidator`)
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const controller = require(`../../../controllers/user/authControllers`)

router.get(`/`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `ur here to login ...` })
})
router.post(`/`, [loginValidator(validatorPartials), isNotAuthenticated()], controller.login) // login

router.get(`/:where/:to/:go`, [isAuthenticated()], (req, res) => {
    res.send({ message: `ur here to login ... , ${req.params.where}` })
})
router.post(`/:where/:to/:go/:token`, [loginValidator(validatorPartials), isAuthenticated()], controller.loginGoWhere) // req

router.get(`/forget-password`, [isAuthenticated()], (req, res) => {
    res.send({ message: `ur here to enter ur email ...` })
})
router.post(`/forget-password`, [isAuthenticated()], controller.forgetPassword) // enter email  |  request midim baray in safhe

router.get(`/reset-password/:token`, [isAuthenticated()], (req, res) => {
    res.send({ message: `ur here to enter new password ...` })
})
router.post(`/reset-password/:token`, [isAuthenticated()], controller.resetPassword) // enter new password


module.exports = router