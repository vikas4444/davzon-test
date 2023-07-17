const express = require('express');
const ProjService = require('../service/project-service');

const route = express.Router();
const constant = require('../utils/constant');
const utilities = require('../utils/utilities');
const hasRole = require('../utils/middleware');


route.post('/createProj',hasRole(["ADMIN"]), (req, res) => {
    ProjService.createProj(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/updateProj',hasRole(["ADMIN"]), (req, res) => {
    ProjService.updateProj(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/getMyProjs',hasRole(["ADMIN","TUTOR","DEVELOPER"]), (req, res) => {
    ProjService.getMyProjs(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/getProjDetails/:projId', (req, res) => {
    ProjService.getProjDetails(req.params).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});



module.exports = route;