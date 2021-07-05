const router = require('express').Router()
const authController = require('./../controller/api/authController')
const routeController = require('./../controller/api/routeController')
const userController = require('./../controller/api/userController')
const adminController = require('./../controller/api/adminController')
const validationController = require('./../controller/api/validationController')


router.route('/profile')
.get(routeController.showIndex)

router.route('/login')
.post(validationController.loginOrRegisterCheck(),validationController.validationResult,authController.login)

router.route('/register')
.post(validationController.loginOrRegisterCheck(),validationController.validationResult,authController.register)

router.route('/user/project')
.post(validationController.projectCheck(), validationController.validationResult , userController.createProject)

router.route('/user/project/:id')
.delete(userController.deleteProject)
.put(validationController.editProjectCheck(), validationController.editProjectResult,userController.editProject )

router.route('/admin')
.get(adminController.getAllUser)

router.route('/admin/:user/:id')
.put(validationController.editProjectCheck(), validationController.editProjectResult,adminController.editUserProject)
module.exports = router