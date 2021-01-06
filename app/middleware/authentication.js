exports.authenticate = (eNum) => {
    return (req, res, next) => {
        if (req.isAuthenticated())
            return next()
        return res.json({ success: false, message: `access denied ,  please login first` })
    }
}
exports.notAuthenticate = () => {
    return (req, res, next) => {
        console.log(req.isAuthenticated())
        if (!req.isAuthenticated())
            return next()
        return res.send({ success: false, message: `access denied ,  please logout first` })
    }
}
