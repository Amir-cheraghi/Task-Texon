const mongoose = require('mongoose')
const {hash,compare} = require('bcrypt')
const userSchema = new mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    role : {type : Number , required : true , enum : [0,1] },
    projects : [
        {
            status : {type : String , enum : ['There is a deadline' , 'Deadline has expired']  },
            spentTime : {type : String},
            estimatedTime : {type : Date},
            sprint : {type : Number},
            endingTimeBySprint : {type : Date},
            typeField : {type : String , enum : ['emergency' , 'normal' , 'not important']}
        }
    ]
    
},{timestamps : true})
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next()
    this.password = await hash(this.password,12)
    next()
})


userSchema.methods.comparePassword = async function(password,hashedPassword){
    return await compare(password,hashedPassword)
}

const User = mongoose.model('User',userSchema)

module.exports = User