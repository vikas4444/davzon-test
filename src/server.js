const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const constant = require('./utils/constant');
path = require('path')
app.use(cors());
app.use(bodyParser.json({
    limit: '1000mb',
    extended: true
}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//---------------------------------------------

/////////////////////////////////////////////////////

// json object return for homepage
// app.use((req,res,next)=>{
//     res.status(200).json({
//         "message":"This is homepage"
//     })
// });

// Homepage api
app.get("/", (req, res) => {
        res.status(200).json({
        "message":"This is homepage"
    })
    // res.sendFile(constant.MAIN_DIR+"views/homepage.html");
  });

/////////////////////////////////////////////////////

// app.set('views', 'views')
// app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))


app.use('/app', require('./controller/app-controller'));
app.use('/user', require('./controller/user-controller'));
app.use('/proj', require('./controller/project-controller'));
app.use('/assignedProj', require('./controller/assignedProj-controller'));















//Razorpay
// app.get('/razorpay', function (req, res) {
//     res.render("razorpaydshbrd.ejs")
// })
// //GET ALL AGE GROUP
// app.get('/ageGroup', function (req, res) {
//     res.send(ageGroup.GET_ALL_AGE_GROUP)
// })
// //GET ALL PERSONALITY LIST
// app.get('/personality', function (req, res) {
//     res.send(personality.LIST_OF_PERSONALITY)
// })
// //GET ALL OCATIONS
// app.get('/occasions', function (req, res) {
//     res.send(occasions.LIST_OF_OCCATIONS)
// })
// //Pay u Money 
// app.get('/payumoney', function (req, res) {
//     res.render("payudshbrd.ejs")
// })
// //Working
// app.get('/testWorking', function (req, res) {
//     res.send("WOrking Server")
// })
// app.post('/order', (req, res) => {
//     let options = {
//         amount: 5000,
//         currency: "INR"
//     }
//     constant.razorpayData.orders.create(options, function (err, order) {
//         console.log(order)
//         res.json(order)
//     })
// })
module.exports = app;
