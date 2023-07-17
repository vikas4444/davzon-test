exports.PORT = 9008;
exports.TOKEN_TIMEOUT = '30d'; // 30 days
exports.APP_SECRETE = 'todo@app';
exports.MONGO_URI = 'mongodb://localhost:27017/todo'; // Need to give username and password
exports.baseURI = '/api/';
exports.HTML_STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INVALID_DATA: 406,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    TIME_OUT: 504,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    NOT_MODIFIED:304
};

exports.lookup = {
    GENDER_LOOKUP: ['Male', 'Female', 'Kids', 'Unisex'],
    role: ['DEFAULT','ADMIN', "MANAGER", "DEVELOPER"],
    paymentType: ['razorpay', 'cashfree'],
    testType: ['SAT', 'ACT'],
    durationType: ['Regular'],
    taskStatus:['toDo','InProgress','Done'],
    ADMIN_USER_ROLE:'ADMIN',
    MEDIA_TYPE: ['Image', 'Video'],
    inFluencerPostPath:['TEXT','IMAGE','VIDEO'],
    isUrl:"https://featureventures-storage.s3.us-east-2.amazonaws.com/images/",
    isImage:"IMAGE",
    isVideo:"VIDEO",
    isText:"TEXT"
};
exports.location = {
    Ten_km_in_miles: 6.21371 / 6378
    //0.00097424114
};

exports.KEY_SECRET = "fdbhtherwrwrhhrteweew"
