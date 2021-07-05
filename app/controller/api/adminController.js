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
          status: "get data error",
          msg: "An error has been accorded while getting user data",
        };
      }
      // 2- Send error
      return res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      });
    }
  }

  async editUserProject(req,res,next){
    try {
        // 1-Check permission
      if (req.user.role != roles.admin)
        throw {code: httpStatus.unAuthorized,status: "UnAuthorized",msg: "You don't have permission to view this page"};
        // 2- Get user data
        const user = await User.findById(req.params.user)
        if (!user)
        throw {code: httpStatus.notFound,status: "User not found",msg: "cannot found any user by your user id"};
        // 3- get project 
        const projectsId = user.projects.map(el=>el._id)
        if(projectsId.indexOf(req.params.id) === -1 ) throw {code : httpStatus.badRequest , status : 'Not found' , msg :'cant find a project by your project id'}
        // 4- Edit project
        const project = user.projects[projectsId.indexOf(req.params.id)]
        project.status = req.body.status || project.status
        project.typeField = req.body.typeField || project.typeField
        const data = await user.save()

        return res.status(httpStatus.success).json({
          status : 'success',
          msg : 'edit successfully finished',
          data 
        })
    } catch (err) {
      //1-Check error not empty
      if (!err.code || !err.status || !err.msg) {
        err = {
          code: httpStatus.badRequest,
          status: "getting data error",
          msg: "An error has been accorded while getting data",
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
