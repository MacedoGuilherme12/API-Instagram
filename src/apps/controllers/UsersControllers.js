const Users = require('../models/Users')

class UsersControllers {
    async create(req, res) {
        console.log(req.body)
        const verifyUser = Users.findOne({
            where : {
                email : req.body.email
            }
        })
        if(verifyUser){
            return res.status(400).json({ message : "User already exits! "})
        }
        if(!user){
            return res.status(400).json({ message : "Failed to create user "})
        }
        const user = await Users.create(req.body)
        return res.send({ message: "Teste" })
    }
}

module.exports = new UsersControllers()





