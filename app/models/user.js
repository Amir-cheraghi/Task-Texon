const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    role : {type : Number , required : true , enum : [0,1] },
    status : {type : String , required : true  },
    spentTime : {type : String , required : true  },
    estimatedTime : {type : String , required : true  },
    sprint : {type : String , required : true  },
    typeField : {type : String , required : true  }
},{timestamps : true})

const User = mongoose.model('User',userSchema)

module.exports = User