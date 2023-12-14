const Users = require('../models/Users')
const bcryptjs = require('bcryptjs');

class UsersControllers {
    async create(req, res) {
        const verifyUser = await Users.findOne({
            where : {
                email : req.body.email
            }
        })
        console.log("aquiiii:" ,verifyUser)
        if(verifyUser){
            return res.status(400).json({ message : "User already exits! "})
        }
        const user = await Users.create(req.body)
        if(!user){
            return res.status(400).json({ message : "Failed to create user "})
        }

        return res.send({ message: 'User created!' });
    }
}

module.exports = new UsersControllers()





