const User = require("./../../models/user")
const { httpStatus , roles } = require("./../../helpers/values")
const jwt = require("jsonwebtoken");
module.exports = new (class authController {
  async login(req, res, next) {
    try {
      //1-Find user
      const user = await User.findOne({ username: req.body.username })

      // 2-Check user exists
      if (!user) 
        throw {code: httpStatus.badRequest,status: "Login error",msg: "User or password is not incorrect"}

      // 3- Check user password
      if (user.password != req.body.password)
        throw {code: httpStatus.badRequest,status: "Login error",msg: "User or password is not incorrect"}

      // 4- Sing a jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{expiresIn : process.env.JWT_EXPIRE})

      // 5- Send result
      res.status(httpStatus.success).json({
        status: "success",
        msg: "Login successfully",
        data: {...user._doc , token}
      })

    } catch (err) {
      //1-Check error not empty
      if (!err.code || !err.status || !err.msg) {
        err = {
          code : httpStatus.badRequest,
          status : "Login error",
          msg : "An error has been accorded while Login"
        }
      }
      // 2- Send error
      res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      })
    }
  }

  async register(req,res,next){
    try {
      const {username,password} = req.body

      // 1- Find username
      const user = await User.findOne({username})

      // 2- Check username be unique
      if(user) 
        throw {code : httpStatus.badRequest , status : 'Register error' , msg : 'Username already have account please try to login or use another username'}

      // 3- Create user
      const data = await User.create({
        username ,
        password ,
        role : roles.user
      })

      // 4- Send response 
      res.status(httpStatus.success).json({
        status : 'success',
        msg : 'User successfully created',
        data
      })
    } catch(err) {
      //1-Check error not empty
      if (!err.code || !err.status || !err.msg) {
        err = {
          code : httpStatus.badRequest,
          status : "Register error",
          msg : "An error has been accorded while register"
        }
      }
      // 2- Send error
      res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      })
    }

  }
})();
