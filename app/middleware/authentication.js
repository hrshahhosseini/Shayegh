exports.authenticate = () => {
    return (req, res, next) => {
        if (req.isAuthenticated())
            return next()
        return res.redirect(`/auth/login`)
    }
}
exports.notAuthenticate = () => {
    return (req, res, next) => {
        if (!req.isAuthenticated())
            return next()
        return res.redirect(`/dashboard`)
    }
}
