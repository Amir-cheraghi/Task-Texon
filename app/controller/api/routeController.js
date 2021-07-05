const {httpStatus , projectStatus} = require('./../../helpers/values')
const User = require('./../../models/user')
module.exports = new class routeController {

    async showIndex(req,res,next){
        // 1- find user by id that in req.user
        const user = await User.findById(req.user._id)
        // 2- check having project or no to decide change time or not
        if(user.projects.length){
            const projectsId = user.projects.map(el=>el._id)

            projectsId.forEach((el,i)=>{
                const project = user.projects[i]

                project.status = new Date(Date.now()).getTime() <  new Date(project.estimatedTime).getTime() ?  projectStatus.thereIsADeadLine : projectStatus.deadLineHasExpired

                const difference =  new Date(Date.now()).getTime() - new Date(project.createdAt).getTime()
                const day = difference / (24 * 3600 * 1000)
                const hour =  (difference % (24 * 3600 * 1000)) / (1000*3600)
                const min = ((difference % (24 * 3600 * 1000)) % (1000*3600)) / (1000*60)
                project.spentTime = `${Math.floor(day)} Day and ${Math.floor(hour)} Hour and ${Math.floor(min)} Min` 
            })
            await user.save()
        }

        //- show user in response
        res.status(httpStatus.success).json({
            status : 'Success',
            msg : `Dear ${user.username} , welcome to API , your data shown in below : `,
            data : user._doc
        })
    }
}