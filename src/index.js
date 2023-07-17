// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const http = require('http');
const https = require('https');
const fs = require("fs");
const mongoose = require('mongoose');
const app = require('./server');
const constant = require('./utils/constant');
var path = require("path")



//for http
const server1 = http.createServer(app);
server1.listen(constant.PORT, (err) => {
    if(err) throw err;
    console.log('HTTP Server running');
});


////////////////////

//for https
// var options = { 
//     key: fs.readFileSync(path.resolve(__dirname,"./etc/private.key")), 
//     cert: fs.readFileSync(path.resolve(__dirname,"./etc/certificate.crt")),
//     ca: fs.readFileSync(path.resolve(__dirname,"./etc/ca_bundle.crt")),
//     requestCert: true, 
//     rejectUnauthorized: true
// };


// const server2 = https
//   .createServer(
//     options,
//     app
//   )
// server2.listen(9005, (err) => {
//     if(err) throw err;
//     console.log('HTTPS Server running');
// });

/////////////////////////////////////////
// server.on('listening', () => {
//     server.timeout = 90000;
//     logs.log(`info`,
//         `server is running at ${constant.PORT}`);
// });

// server.on('error', (e) => {
//     console.error('Something went wrong!', e);
// });

///////////////////////////////////////////////////
// Connect mongo db 
mongoose.connect(constant.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.log('MongoDB connection error', error);
    } else {
        console.log(`MongoDB connected successfully.`);
    }
});



// process.on('uncaughtException', function (err) {
//     console.log('Fatal Error', err);
//     console.log('Caught exception:', err.stack);
// });
//////////////////////////////////////////////////////////////////////
 


