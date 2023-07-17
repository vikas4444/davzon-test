const express = require('express');
const AssProjService = require('../service/assignedProj-service');

const route = express.Router();
const constant = require('../utils/constant');
const utilities = require('../utils/utilities');
const hasRole = require('../utils/middleware');


route.post('/assignProj',hasRole(["ADMIN"]), (req, res) => {
    AssProjService.assignProj(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/unassignProj',hasRole(["ADMIN"]), (req, res) => {
    AssProjService.unassignProj(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});


route.post('/getAllAssignedProjs',hasRole(["ADMIN","TUTOR","STUDENT"]), (req, res) => {
    AssProjService.getAllAssignedProjs(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/viewAssignedProjs/', (req, res) => {
    AssProjService.viewAssignedProjs(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/updateAssignedProjs',hasRole(["ADMIN","MANAGER","DEVELOPER"]), (req, res) => {
    AssProjService.updateAssignedProjs(req.body,req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/viewProj/:testId', (req, res) => {
    AssProjService.viewProj(req.params).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});





module.exports = route;