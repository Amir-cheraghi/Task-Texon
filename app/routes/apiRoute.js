const router = require('express').Router()
const authController = require('./../controller/api/authController')
const routeController = require('./../controller/api/routeController')
const userController = require('./../controller/api/userController')
const adminController = require('./../controller/api/adminController')
const validationController = require('./../controller/api/validationController')


router.route('/index')
.get(routeController.showIndex)

router.route('/login')
.post(validationController.loginOrRegisterCheck(),validationController.loginOrRegisterValidation,authController.login)

router.route('/register')
.post(validationController.loginOrRegisterCheck(),validationController.loginOrRegisterValidation,authController.register)

router.route('/user/project')
.post(validationController.projectCheck(), validationController.projectValidation , userController.createProject)
module.exports = router