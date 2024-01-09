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

routes.put('/update', UsersControllers.update)
routes.delete('/delete', UsersControllers.delete)
routes.get('/user', UsersControllers.userProfile)

routes.post('/upload', upload.single('image'), FileController.upload)
routes.post('/post', schemaValidator(postSchema), PostController.create)
routes.post('/post/:id' , PostController.delete)
routes.put('/post/:id' , PostController.update)
routes.put('/add_post/:id' , PostController.add_like)


module.exports = routes;