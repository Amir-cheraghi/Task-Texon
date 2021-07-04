const dotenv = require('dotenv').config({path:process.cwd()+'/app/config/config.env'})
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const apiRoute = require('./routes/apiRoute')
const {httpStatus} = require('./helpers/values')
module.exports =  class application {
    constructor(){
        this.setDB()
        this.setConfig()
        this.setRoute()
        this.set404()
        this.setExpress()
    }

    async setDB(){
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Database Connected # # #')
    }

    setConfig(){
        app.use(express.json())
        app.use(express.urlencoded({extended : true}))
    }

    setRoute(){
        app.use('/api',apiRoute)
    }

    set404(){
        app.use((req,res,next)=>{
            res.status(httpStatus.notFound).json({
                status : 'Not found',
                msg : 'The page you were looking for could not be found ! '
            })
            next()
        })
    }

    setExpress(){
        app.listen(process.env.SERVER_PORT,process.env.SERVER_ADDRESS,()=>{
            console.log(`Server Is Running In Port : ${process.env.SERVER_PORT} # # #`)
        })
    }

}