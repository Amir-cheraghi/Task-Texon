const router = require('express').Router()
const authController = require('./../controller/api/authController')
const routeController = require('./../controller/api/routeController')
const userController = require('./../controller/api/userController')
const adminController = require('./../controller/api/adminController')

router.route('/index')
.get(routeController.showIndex)


module.exports = router