const {verify} = require('jsonwebtoken')
const {httpStatus} = require('./../helpers/values')
const User = require('./../models/user')
module.exports = async (req, res, next) => {
  try {
    // 1-Except login or register route
    if(req.path == '/api/login' || req.path == '/api/register') return next()

    // 2-Check have token 
    const token = req.headers.authorization
    if (!token || token.indexOf('Bearer ') != 0 || token.indexOf('Bearer ') == -1) throw new Error

    // 3- Verify token
    const tokenVerify = await verify(token.replace('Bearer ' , ''),process.env.JWT_SECRET)
    if(!tokenVerify) throw new Error

    // 4-Set req.user
    const user = await User.findById(tokenVerify.id)
    req.user = user._doc
    next()
  } catch (err) {
    return res.status(httpStatus.unAuthorized).json({
        status : 'Token invalid',
        msg : 'Token is not valid or expired'
    })
  }
};
