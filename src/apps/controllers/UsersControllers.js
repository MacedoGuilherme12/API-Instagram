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

        const user = Users.findOne({
            where: {
                userId: req.body
            }
        })

        if (!user) {
            res.status(401).json({ message: "Not found user" })
        }
        if (old_password) {

            if (!(await user).checkPassword(old_password)) {
                res.status(401).json({ message: "Old Password dot match!!" })
            }

            if (!new_password || !confirm_new_password) {
                res.status(401).json({ message: "New password null!!" })
            }

            if (new_password !== confirm_new_password) {
                res.status(401).json({ message: "Passwords are not the same" })
            }
            
            encryptPassword = await bcryptjs.hash(new_password,8)
        }
    }

}

module.exports = new UsersControllers()





