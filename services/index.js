const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(10, 'minutes').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

const decodeToken = (token) => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            console.log(payload)
            resolve(payload.sub)
        } catch (err) {
            if (err.message == 'Token expired') {
                reject({
                    status: 401,
                    msg: 'Token expired'
                })
            }
            reject({
                status: 500,
                msg: 'Invalid Token'
            })
        }
    })
    return decoded
}




module.exports = {
    createToken,
    decodeToken
};