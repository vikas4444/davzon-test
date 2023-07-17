const express = require('express');
const AppService = require('../service/app-service');

const route = express.Router();
const constant = require('../utils/constant');
const utilities = require('../utils/utilities');
const hasRole = require('../utils/middleware');


route.post('/signUp', (req, res) => {
    AppService.signUp(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/signIn', (req, res) => {
    AppService.signIn(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});




module.exports = route;