const mongoose = require('mongoose')

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

const User = mongoose.model('User',userSchema)

module.exports = User