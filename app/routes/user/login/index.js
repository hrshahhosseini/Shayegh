const express = require(`express`)
const route = express.Router()

const loginRouter = require(`./login`)

route.use(`/`, loginRouter)
route.get(`/test`, (req, res) => {
    res.send({ message: `it's a test ...` })
})
module.exports = route