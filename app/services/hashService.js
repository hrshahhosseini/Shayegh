const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.BCRYPT_SECRET
exports.toHash = async (hasToBeHash) => {
    const result = await bcrypt.hash(hasToBeHash, saltRounds)
    return result
}