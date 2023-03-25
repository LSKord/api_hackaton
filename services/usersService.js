const globalSettings = require('../config');
const userRepo = require('../repositories/userRepository')
const jwt = require('jsonwebtoken');

module.exports.login = async (data) => {
    console.log(data)
    const { username, password } = data;
    const user = await userRepo.login({ username: username, password: password })
    return user
};

module.exports.authenticate = async (req) => {
    // console.log(req)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return false
    }
    const jwtVerify = jwt.verify(token, globalSettings.secretkeyjwt)

    return {
        ok: jwtVerify
    }
};