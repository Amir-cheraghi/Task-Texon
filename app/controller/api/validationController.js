const {check,validationResult} = require('express-validator')
const {httpStatus} = require('./../../helpers/values')
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

    loginOrRegisterValidation(req,res,next){
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


}