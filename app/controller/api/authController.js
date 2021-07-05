const User = require("./../../models/user")
const { httpStatus } = require("./../../helpers/values")
const jwt = require("jsonwebtoken");
module.exports = new (class authController {
  async login(req, res, next) {
    try {
      //1-Find user
      const user = await User.findOne({ username: req.body.username })

      // 2-Check user exists
      if (!user) 
        throw '{code: httpStatus.badRequest,status: "Login error",msg: "User or password is not incorrect"}'

      // 3- check user password
      if (user.password != req.body.password)
        throw {code: httpStatus.badRequest,status: "Login error",msg: "User or password is not incorrect"}

      // 4- sing a jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{expiresIn : process.env.JWE_EXPIRE})

      // 5- send result
      res.status(httpStatus.success).json({
        status: "success",
        msg: "Login successfully",
        data: {...user._doc , token}
      })

    } catch (err) {
      //1-check error not empty
      if (typeof err != 'object') {
        err = {
          code : httpStatus.badRequest,
          status : "Login error",
          msg : "An error has been accorded while Login"
        }
      }
      // 2- send error
      res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      })
    }
  }
})();
