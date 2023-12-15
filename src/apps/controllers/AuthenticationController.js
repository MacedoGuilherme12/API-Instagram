const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const Users = require('../models/Users')

class AuthenticationController{
    async Authenticate(req,res){
        const { email, user_name, password } = req.body

        let whereClause = { }
        if(email){
            whereClause.email = email
        } else if(user_name){
            whereClause.user_name = user_name
        } else{
            return res.status(401).json({message : "We need a email or password"})
        }


        const user = await Users.findOne({
            where:  whereClause
        })

        if(!user){
            return res.status(401).json({ message : 'User not Found'})
        }
        if(!await user.checkPassword(password)){
            return res.status(401).json({ message : 'Password does not match!!'})
        }
        const {id, user_name : userName} = user

        const token = jwt.sign({}, process.env.HASH_BCRYPT, {
            expiresIn : '7d'
        })

        return res.status(200).json({ user : {id, user_name : userName, token} })
    }
}

module.exports = new AuthenticationController()