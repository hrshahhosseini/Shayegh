module.exports = {
    email: {
        type: `email`,
        empty: `false`
    },
    password: {
        type: `string`,
        alphanum: `true`,
        min:6
    },
    resetLink:{
        data:`string`,
        default:``
    }
}