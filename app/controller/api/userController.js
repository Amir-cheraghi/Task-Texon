const User = require("./../../models/user");
const { httpStatus , roles , projectStatus , projectTypeField } = require("./../../helpers/values");
module.exports = new (class userController {
  async createProject(req, res, next) {
    try {
        // 1-find user by req.user.id
      const user = await User.findById(req.user._id);
        // 2- destructor req.body
         const {estimatedTime , sprint , typeField} = req.body
        //  3- add project 
      user.projects.push({
        estimatedTime,
        sprint,
        typeField,
        status:projectStatus.thereIsADeadLine,
        endingTimeBySprint : Date.now() + (100 / +sprint * 24 * 60 * 60 * 1000),
        spentTime : 0,
        })
      await user.save()
      res.status(httpStatus.created).json({
        status: "success",
        msg: "Project successfully added",
        data: user.projects,
      });
    } catch (err) {
      console.log(err)
    }
  }


  async deleteProject(req,res,next){
      try{
        //   1-find user
        const user = await User.findById(req.user._id)

        // 2-find project index by id
        const projects = user.projects.map(el=>el._id)
        const projectId = projects.indexOf(req.params.id)

        //3- throw error if id not found
        if(projectId === -1) throw {code : httpStatus.badRequest , status : 'Not found' , msg :'cant find a project by your project id'}

        // 4- remove project
        user.projects.splice(projectId,projectId+1)
        await user.save()
        
        res.status(httpStatus.success).json({
            status : 'success',
            msg : 'the project successfully deleted',
        })
        
      }catch(err){
        //1-Check error not empty
      if (!err.code || !err.status || !err.msg) {
        err = {
          code : httpStatus.badRequest,
          status : "remove error",
          msg : "An error has been accorded while removing project"
        }
      }
      // 2- Send error
      return res.status(err.code).json({
        status: err.status,
        msg: err.msg,
      })
      }
  }
})();
