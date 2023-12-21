const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')

class UsersControllers {
    async create(req, res) {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (verifyUser) {
            return res.status(400).json({ message: "User already exists!  " })
        }
        const user = await Users.create(req.body)
        if (!user) {
            return res.status(400).json({ message: "Failed to create user " })
        }

        return res.send({ message: 'User created!' });
    }
    async update(req, res) {
        const {
            name,
            bio,
            gender,
            avatar,
            old_password,
            new_password,
            confirm_new_password
        } = req.body
        
        let encryptPassword = ''
        
        const user = await Users.findOne({
            where: {
                id: req.userId
            }
        })
        
        if (!user) {
            res.status(401).json({ message: "Not found user" })
        }
        
        if (old_password) {
            if (!await user.checkPassword(old_password)) {
                res.status(401).json({ message: "Old Password dot match!!" })
            }

            if (new_password == '' || confirm_new_password == '') {
                res.status(401).json({ message: "New password null!!" })
            }

            if (new_password !== confirm_new_password) {
                res.status(401).json({ message: "Passwords are not the same" })
            }
            encryptPassword = await bcryptjs.hash(new_password, 8)
        }

        await Users.update(
            {
            name: name || user.name,
            bio: bio || user.bio,
            gender: gender || user.gender,
            avatar: avatar || user.avatar,
            password_hash: encryptPassword || user.password_hash
        }, {
            where: {
                id: user.id
            }
        })
        return res.status(200).json({ message : "User Update!!"})
    }
    async delete(req,res){


        const userDelete = Users.findOne({
            where : req.userId,
        })


        if(!userDelete){
            return res.status(400).json({ message : "User not exists!!"})
        }
        console.log(req.userId)
        await Users.destroy({
            where : {
                id : req.userId
            }
        })

        return res.status(200).json({ message : "User deleted"})
    }
    async userProfile(req, res) {
        const user = await Users.findOne({
            attributes : ['id', 'name', "user_name", "email", "gender", "avatar", "bio"],
            where: {
                id : req.userId
            }
        })

        if(!user){
            res.status(400).json({ message : "User not found!!"})
        }

        return res.status(200).json({ user })
    }
}

module.exports = new UsersControllers()





