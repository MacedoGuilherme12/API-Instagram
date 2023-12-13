const Users = require('../models/Users')

class UsersControllers {
    async create(req, res) {
        const user = await Users.create(req.body)
        res.send({ user })
    }
}

module.exports = new UsersControllers()





