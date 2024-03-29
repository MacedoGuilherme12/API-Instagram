const {Router} = require('express')
const { upload } = require('./config/multer')
const schemaValidator = require('./apps/middlewares/schemaValidator')

const AuthenticationMiddleware = require('./apps/middlewares/authenticator')

const AuthenticationController = require('./apps/controllers/AuthenticationController')
const authSchema = require('./apps/schema/auth.schema.json')

const UsersControllers = require('./apps/controllers/UsersControllers')
const userSchema = require('./apps/schema/create.user.schema.json')

const FileController = require('./apps/controllers/FileController')

const PostController = require('./apps/controllers/PostController')
const postSchema = require('./apps/schema/create.post.schema.json')

const routes = new Router()


routes.post('/user', schemaValidator(userSchema), UsersControllers.create )
routes.post('/auth', schemaValidator(authSchema), AuthenticationController.Authenticate)

routes.use(AuthenticationMiddleware)

routes.put('/user', UsersControllers.update)
routes.delete('/user', UsersControllers.delete)
routes.get('/user', UsersControllers.userProfile)



routes.post('/upload', upload.single('image'), FileController.upload)



routes.post('/posts', schemaValidator(postSchema), PostController.create)
routes.post('/posts/:id' , PostController.delete)
routes.put('/posts/:id' , PostController.update)
routes.get('/posts' , PostController.listAllPosts)

routes.put('posts/add_like/:id' , PostController.add_like)
routes.get('/posts/my-post' , PostController.listMyPost)


module.exports = routes;