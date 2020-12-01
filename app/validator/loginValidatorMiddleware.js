const fastestValidator = require(`fastest-validator`)
const v = new fastestValidator()
const validator = (schema) => {
    return (req, res, next) => {
        const check = v.compile(schema)
        const reqBody = check(req.body)
        if (reqBody !== true) {
            res.status(404).send(JSON.stringify(reqBody))
        }
        next()
    }
}


module.exports = validator