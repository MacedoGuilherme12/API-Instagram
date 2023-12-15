const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const Users = require('../models/Users')

class AuthenticationController{
    async Authenticate(req,res){
        const { email, user_name, password } = req.body

        let whereClause = {}
        if(email){
            whereClause = {email}
        } else if(user_name){
            whereClause = {user_name}
        } else{
            return res.status(401).json({message : "We need a email or password"})
        }


        console.log(whereClause)
        const verifyUser = await Users.findOne({
            where:  whereClause
        })

        if(!verifyUser){
            return res.status(401).json({ message : 'User not Found'})
        }
        return res.status(200).json({ user : verifyUser})
    }
}

module.exports = new AuthenticationController()