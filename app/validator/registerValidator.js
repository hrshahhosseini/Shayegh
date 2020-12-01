module.exports = {
    name: {
        type: `string`
    },
    email: {
        type: `email`

    },
    lastName: {
        type: `string`

    },
    username: {
        type: `string`

    },
    password: {
        type: `string`,
        alphanum: `true`
    },
    confirmPassword: {
        type: `equal`,
        field: `password`
    },

    // $$strict: true // no additional properties allowed
}