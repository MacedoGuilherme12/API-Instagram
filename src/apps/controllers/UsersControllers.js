const Users = require('../models/Users')

class UsersControllers {
    async create(req, res) {
        console.log(req.body)
        const user = await Users.create(req.body)
        res.send({ message : "Teste"})
    }
}

module.exports = new UsersControllers()





