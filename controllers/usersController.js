const globalSettings = require('../config');
const userService = require('../services/usersService')

module.exports.login = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await userService.login(req.body)
        res.json(user)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
};

module.exports.authenticate = async (req, res, next) => {
    try {
        console.log(req.body)
        const jwt = await userService.authenticate(req)
        if(!jwt.ok) {
            return res.sendStatus(401)
        }
        req.user = jwt.ok
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
}