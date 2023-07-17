const constant = require('./../utils/constant');
const jwt = require('jsonwebtoken');
// const customResponse = require('./../utils/custom-response');


module.exports = function hasRole(roles)  {
    return async function(req, res, next) {

        try {
            if (!req.headers.authorization) {
                throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Access denied!');
            }
            const token = req.headers.authorization.replace("Bearer ", "");
            // console.log(token);
            if (token == null) {
                throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Token not found in request');
            }
            // Verify token with APP_SECRET
            const userDetail = jwt.verify(token, constant.APP_SECRETE);
            if (userDetail == null) {
                throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Invalid Token');
            }


            if (userDetail.role == undefined || userDetail.role == null){
                throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'user role not found');
            }
            // let checkRole = []
            if (typeof userDetail.role == "string"){
                if (roles.includes(userDetail.role) != true ){
                    throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Invalid Token');
                }

            }else{
                if (roles.some(value => userDetail.role.includes(value)) != true){
                    throw customResponse.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Invalid Token');
                }

            }

            req.user = userDetail;
            next();

    
        } catch (error) {
            if (error.name && error.name.indexOf('TokenExpiredError') > -1) {
                res.status(constant.HTML_STATUS_CODE.UNAUTHORIZED).json(error);
            } else {
                res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
            }
        }

    }
  }



