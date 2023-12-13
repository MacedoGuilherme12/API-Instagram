const Users = require('../models/Users')

class UsersControllers {
    async create(req, res) {
        console.log(req.body)
        const verifyUser = await Users.findOne({
            where : {
                email : req.body.email
            }
        })
        if(verifyUser){
             return res.status(400).json({ message : "User already exists!  " })
        }
        const user = await Users.create(req.body)
        res.send({ user })
    }
}

module.exports = new UsersControllers()





