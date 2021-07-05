const {httpStatus} = require('./../../helpers/values')
const User = require('./../../models/user')
module.exports = new class routeController {

    async showIndex(req,res,next){
        // 1- find user by id that in req.user
        const data = await User.findById(req.user._id)
        //2- show user in response
        res.status(httpStatus.success).json({
            status : 'Success',
            msg : `Dear ${data.username} , welcome to API , your data shown in below : `,
            data
        })
    }
}