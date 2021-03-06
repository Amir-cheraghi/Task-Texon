const {check,validationResult} = require('express-validator')
const {httpStatus,projectStatus, projectTypeField} = require('./../../helpers/values')
module.exports = new class validator{
    loginOrRegisterCheck(req,res,next){
        return [
            check('username')
            .notEmpty()
            .withMessage('Please enter username')
            .isLength({min : 6 , max : 32})
            .withMessage('Username must be between 6 and 32 character'),
            check('password')
            .notEmpty()
            .withMessage('Please enter password')
            .isLength({min : 8 , max : 32})
            .withMessage('password must be between 8 and 32 character'),            
        ]
    }

    projectCheck(req,res,next){
        return[
            check('estimatedTime')
            .isDate()
            .withMessage('Estimated time must be in Date format like YYYY-MM-DD')
            .notEmpty()
            .withMessage('Estimated time must provided')
            .custom(input=>{
                return new Date(input).getTime() > new Date(Date.now()).getTime()
            })
            .withMessage('Estimated time must higher than now date'),
            check('sprint')
            .notEmpty()
            .withMessage('sprint must provided')
            .isFloat({min:0 , max : 100})
            .withMessage('sprint must be between 0 and 100 like a percent'),
            check('typeField')
            .notEmpty()
            .withMessage('priority must provided')
            .custom((input)=>{
                return [projectTypeField.emergency , projectTypeField.normal , projectTypeField.notImportant].indexOf(input) !== -1
            })
            .withMessage(`The priority must be one of : [${projectTypeField.emergency} , ${projectTypeField.normal} , ${projectTypeField.notImportant}]`)
        ]
    }


    editProjectCheck(req,res,next){
        return[
            check('status')
            .custom((input)=>{
                return [projectStatus.deadLineHasExpired , projectStatus.thereIsADeadLine].indexOf(input) !== -1
            })
            .withMessage(`The Status must be one of : [${projectStatus.deadLineHasExpired} , ${projectStatus.thereIsADeadLine}]`),
            check('estimatedTime')
            .isDate()
            .withMessage('Estimated time must be in Date format like YYYY-MM-DD')
            .custom(input=>{
                return new Date(input).getTime() > new Date(Date.now()).getTime()
            })
            .withMessage('Estimated time must higher than now date'),
            check('sprint')
            .isFloat({min:0 , max : 100})
            .withMessage('sprint must be between 0 and 100 like a percent'),
            check('typeField')
            .custom((input)=>{
                return [projectTypeField.emergency , projectTypeField.normal , projectTypeField.notImportant].indexOf(input) !== -1
            })
            .withMessage(`The priority must be one of : [${projectTypeField.emergency} , ${projectTypeField.normal} , ${projectTypeField.notImportant}]`)
        ]
    }
    
    
    validationResult(req,res,next){
        const error = validationResult(req).array()
        if(error.length){
            const errorMessage = error.map(el=>{return el.msg})
            return res.status(httpStatus.badRequest).json({
                status : 'Validation error',
                msg : 'The entered data is not valid , please fix errors',
                error : errorMessage
            })
            
        }
        return next()
    }

    editProjectResult(req,res,next){
        const error = validationResult(req).array()
            const msg = []
            for(let i = 0 ; i<error.length ; i++){
                if(typeof error[i].value == "undefined") continue
                msg.push(error[i].msg)
            }
            if(msg.length)
            return res.status(httpStatus.badRequest).json({
                status : 'Validation error',
                msg : 'The entered data is not valid , please fix errors',
                error : msg
            })
        return next()
    }


}