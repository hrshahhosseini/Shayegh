exports.authenticate = (eNum) => {
    return (req, res, next) => {
        if (req.isAuthenticated())
            return next()
        return res.send({ accessCode: 1001 }) // access denied
    }
}
exports.notAuthenticate = () => {
    return (req, res, next) => {
        if (!req.isAuthenticated())
            return next()
        return res.send({ accessCode: 1002})
    }
}
