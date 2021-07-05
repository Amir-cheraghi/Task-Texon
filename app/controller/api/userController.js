const User = require("./../../models/user");
const { httpStatus , roles , projectStatus , projectTypeField } = require("./../../helpers/values");
module.exports = new (class userController {
  async createProject(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
         const {estimatedTime , sprint , typeField} = req.body
      user.projects.push({
        estimatedTime,
        sprint,
        typeField,
        status:projectStatus.thereIsADeadLine,
        endingTimeBySprint : Date.now() + (100 / +sprint * 24 * 60 * 60 * 1000),
        spentTime : 0,
        })
      user.save()
      res.status(httpStatus.created).json({
        status: "success",
        msg: "Project successfully added",
        data: user.projects,
      });
    } catch (err) {
      console.log(err)
    }
  }
})();
