const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.hashPassword = (hasToBeHash) => {
    return bcrypt.hashSync(hasToBeHash, saltRounds)
}

exports.checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)

}