const jwt = require('jwt-simple')
const User = require('./../models/User')
const config = require('./../config')

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()

    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret)
}

module.exports = {
    signIn(req, res, next) {
        const user = req.user
        const token = tokenForUser(user)

        res.send({ token })
    },
    signUp(req, res, next) {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(422)
                .send({ error: 'You must provide email and password' })
        }

        User.findOne({ email: email }, (err, existingUser) => {
            if (err) { return next(err) }

            if (existingUser) {
                return res.status(422).send({ error: 'Email is in use' })
            }

            const user = new User({
                email,
                password
            })

            user.save((err) => {
                if (err) { return next(err) }
                const token = tokenForUser(user)
                res.json({ token })
            })
        })
    }
}
