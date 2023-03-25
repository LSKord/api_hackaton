const globalSettings = require('../config');
const kquery = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports.login = (user) => {
    return new Promise((resolve) => {
        kquery("users")
            .where({username: user.username })
            .first()
        .then(retrievedUser  => {
            if(!retrievedUser) {
                resolve({error: "user not found!"})
            }
            // bcrypt.hash(user.password, 12).then(hashed_password => {
            //    console.log(hashed_password)
            // })
            const { password_hash } = retrievedUser
            console.log(password_hash)
            let samePasswordHashed = bcrypt.compareSync(user.password, password_hash)
            if(!samePasswordHashed) {
                resolve({error: "wrong Password!"})
            }            
            const payload = {username: retrievedUser.username}
            const token = jwt.sign(payload, globalSettings.secretkeyjwt/*, { expiresIn: globalSettings.expiresJWTToken }*/)
            resolve({token, user: payload})

        }).catch(error => {
            resolve({errorj: error.message})
        })
    })
}

module.exports.verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports.getUser = (user) => {
    return new Promise((resolve) => {
        kquery("users")
            .where({username: user.username})
            .first()
        .then(retrievedUser  => {
            resolve(retrievedUser)
        }).catch(error => {
            resolve(null)
        })
    })
}

module.exports.insert = (data) => {
    return new Promise((resolve) => {
        const { user } = data
        bcrypt.hash(user.password, 12).then(hashed_password => {
            return kquery("users")
                .insert({
                    username: user.username,
                    password_hash: hashed_password
                }) 
                .returning("*")
                .then(users => {
                    const user = users[0]
                    resolve({ user })
                }).catch(error => {
                    resolve({ error: error.message })
                })
        })
    })
}

