const express = require('express');
const UserService = require('../service/user-service');

const route = express.Router();
const constant = require('../utils/constant');
const utilities = require('../utils/utilities');
const hasRole = require('../utils/middleware');


route.post('/getPass', (req, res) => {
    UserService.getPass(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/addNewUser',hasRole(["ADMIN"]), (req, res) => {
    UserService.addNewUser(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});


route.post('/getAllUsers',hasRole(["ADMIN"]), (req, res) => {
    UserService.getAllUsers(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/getUserDetail',hasRole(["ADMIN","MANAGER","DEVELOPER"]), (req, res) => {
    UserService.getUserDetail(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/updateUserDetail',hasRole(["ADMIN","MANAGER","DEVELOPER"]), (req, res) => {
    UserService.getUserDetail(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});









module.exports = route;