const express = require(`express`)
const router = express.Router()
const loginValidator = require(`../../../validator/loginValidatorMiddleware`)
const validatorPartials = require(`../../../validator/loginValidator`)
const authenticated = require(`../../../middleware/authentication`)
const isAuthenticated = authenticated.authenticate
const isNotAuthenticated = authenticated.notAuthenticate
const controller = require(`../../../controllers/user/authControllers`)

router.get(`/`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `you are here to login ...` })
})
router.post(`/`, [loginValidator(validatorPartials), isNotAuthenticated()], controller.login) // login

router.get(`/:where/:to/:go`, [isAuthenticated()], (req, res) => {
    res.send({ message: `you are here to login ... , ${req.params.where}` })
})
router.post(`/:where/:to/:go/:token`, [loginValidator(validatorPartials), isAuthenticated()], controller.loginGoWhere)

router.get(`/forget-password`, [isAuthenticated()], (req, res) => {
    res.send({ message: `you are here to enter you are email ...` })
})
router.post(`/forget-password`, [isAuthenticated()], controller.forgetPassword)

router.get(`/reset-password/:token`, [isAuthenticated()], (req, res) => {
    res.send({ message: `you are here to enter new password ...` })
})
router.post(`/reset-password/:token`, [isAuthenticated()], controller.resetPassword)


module.exports = router