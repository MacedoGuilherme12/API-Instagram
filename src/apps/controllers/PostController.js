const { where } = require('sequelize')
const Posts = require('../models/Posts')
const Users = require('../models/Users')

class PostController {
    async create(req, res) {
        const { description, image } = req.body

        const postCreate = Posts.create({
            description,
            image,
            author_id: req.userId
        })
        if (!postCreate) {
            return res.status(401).json({ message: "Created Post Falied" })
        }
        return res.status(200).json({ data: description, image })
    }


    async delete(req, res) {
        const { id } = req.params
        const verifyUser = await Posts.findOne({
            where: {
                id,
            }
        })
       
        if(!verifyUser){
            return res.status(401).json({ message : "Post not exists"})
        }
       
        if(ver.author_id != req.userId){
            return res.status(401).json( { message: "Not permission"})
        }
        
        await Posts.destroy({
            where : {
                id,
            }
        })
        return res.status(200).json({ message  : "Post Deleted"})

    }
    async update(req,res){
        const { id } = req.params
        const verifyUser = await Posts.findOne({
            where: {
                id,
            }
        })
       
        if(!verifyUser){
            return res.status(401).json({ message : "Post not exists"})
        }
       
        if(verifyUser.author_id != req.userId){
            return res.status(401).json( { message: "Not permission"})
        }
        const postUpdate = await Posts.update(req.body, {where : {id}})

        if(!postUpdate){
            return res.status(401).json( { message : "Falied update Post"})
        }
        
        return res.status(200).json( {message : "Post Update "})
    }

}
module.exports = new PostController()