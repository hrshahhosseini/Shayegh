const express = require(`express`)
const Router = express.Router()
const login = require(`./login/index`)
const registerController = require(`../../controllers/user/authControllers`)
const validatorPartials = require(`../../validator/registerValidator`)
const registerValidator = require(`../../validator/registerValidatorMiddleware`)
const authenticated = require(`../../middleware/authentication`)
const loggedIn = authenticated.authenticate
const notLoggedIn = authenticated.notAuthenticate
// Router.get(`/sample`, [middleware] , myFunction)
Router.use(`/login`, login)
Router.delete(`/logout`, [loggedIn()], (req, res) => {
    req.logout()
    res.json({ success: true, message: `successfully logged out` })
})
Router.post(`/register`, registerValidator(validatorPartials), registerController.register)

module.exports = Router