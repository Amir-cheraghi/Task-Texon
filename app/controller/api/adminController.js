const User = require("../../models/user");
const { httpStatus, roles } = require("./../../helpers/values");
module.exports = new (class adminController {
  async getAllUser(req, res, next) {
    try {
        // 1-Check permission
      if (req.user.role != roles.admin)
        throw {code: httpStatus.unAuthorized,status: "UnAuthorized",msg: "You don't have permission to view this page"};
        // 2- Get all user
        const users = await User.find()
        // 3-send response
        res.status(httpStatus.success).json({
            code : 'success',
            msg : 'All users data successfully received',
            data  : users
        })


    } catch (err) {
      //1-Check error not empty
      if (!err.code || !err.status || !err.msg) {
        err = {
          code: httpStatus.badRequest,
          status: "remove error",
          msg: "An error has been accorded while removing project",
        };
      }
      // 2- Send error
      return res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      });
    }
  }
})();
