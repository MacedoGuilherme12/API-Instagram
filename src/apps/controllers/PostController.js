const Posts = require('../models/Posts')
const Users = require('../models/Users')

class PostController{
    async create(req, res){
        const { description, image} = req.body

        const postCreate = Posts.create({
            description,
            image,
            author_id : req.userId
        })
        return res.status(200).json({ message : "Post feito"})
    }

}
module.exports = new PostController()