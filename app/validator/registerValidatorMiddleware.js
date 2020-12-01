const validator = require(`fastest-validator`)
const v = new validator()

module.exports = (schema) => {
    return (req, res, next) => {
        const check = v.compile(schema)
        const reqBody = check(req.body)
        if (reqBody !== true) {
            // console.log("reqBody", reqBody)

            return res.status(400).send(JSON.stringify(reqBody))
        }
        next()
    }
}
