const express = require(`express`)
const router = express.Router()
const loginValidator = require(`../../../validator/loginValidatorMiddleware`)
const validatorPartials = require(`../../../validator/loginValidator`)
const notLoggedIn = require(`../../../middleware/authentication`).notAuthenticate
const loggedIn = require(`../../../middleware/authentication`).authenticate

const controller = require(`../../../controllers/user/authControllers`)

router.post(`/`, [loginValidator(validatorPartials), notLoggedIn()], controller.login) // login
router.get(`/`, notLoggedIn(), (req, res) => {
    res.send({ message: `ur here to login ...` })
})
router.get(`/:where/:to/:go`, [loggedIn()], (req, res) => {
    res.send({ message: `you are here to login ... , ${req.params.where}` })
})
router.post(`/:where/:to/:go/:token`, [loginValidator(validatorPartials), loggedIn()], controller.loginGoWhere)

router.get(`/:where/:to/:go`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `you are here to login ... , ${req.params.where}` })
})
router.post(`/:where/:to/:go/:token`, [loginValidator(validatorPartials), isNotAuthenticated()], controller.loginGoWhere)

router.get(`/forget-password`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `you are here to enter you are email ...` })
})
router.post(`/forget-password`, [isNotAuthenticated()], controller.forgetPassword)

router.get(`/reset-password/:token`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `you are here to enter new password ...` })
})
router.post(`/reset-password/:token`, [isNotAuthenticated()], controller.resetPassword)


module.exports = router