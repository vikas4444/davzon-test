const alphanuminc = require('alphanum-increment');
const ObjectId = require('mongoose').Types.ObjectId;
const increment = alphanuminc.increment;
const nodemailer = require('nodemailer');



exports.decode = (b64string) => {
    let buf = '';
    if (typeof Buffer.from === 'function') {
        // Node 5.10+
        buf = Buffer.from(b64string, 'base64').toString();
    } else {
        // older Node versions
        buf = Buffer.from(b64string, 'base64').toString();
    }
    return buf;
};

exports.encode = (argString) => {
    if (argString == null) {
        return undefined;
    }
    let buf = '';
    if (typeof Buffer.from === 'function') {
        // Node 5.10+
        buf = Buffer.from(argString).toString('base64');
    } else {
        // older Node versions
        buf = Buffer.from(argString).toString('base64');
    }
    return buf;
}

// ADDING 3 MINUTES TO EXPIRE OTP
exports.otpExpireTime = () => {
    var timeToExpire = new Date();
    timeToExpire.setMinutes(timeToExpire.getMinutes() + 3);
    return timeToExpire;
}
exports.getRandomNumber = (length) => {
    const number = '0123456789';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += number[Math.floor(Math.random() * number.length)];
    }
    return result;
}

// generate Otp
exports.GenerateRanNum = (digit) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < digit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

exports.getRandomString = (length) => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

const crypto = require('crypto');

const ENCRYPTION_KEY = 'featureventures.xyz@bp12p@ssw0rd' // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

exports.encrypt = (text) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + '@' + encrypted.toString('hex');
}

exports.decrypt = (text) => {
    let textParts = text.split('@');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join('@'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
exports.checkLock = (date) => {
    let lockTime = new Date(date);
    let currentTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    });
    currentTime = new Date(currentTime);
    currentTime.setHours(currentTime.getHours());
    currentTime.setMinutes(currentTime.getMinutes());
    if (currentTime > lockTime) {
        return true;
    } else {
        return false;
    }
}
exports.convert24To12Hour = (time) => {

    let h_24 = time.split(':');
    let type;
    if (parseInt(h_24[0]) < 10) {
        type = 'am';
    } else {
        type = 'pm';
    }
    var h = h_24[0] % 12;
    return ((h < 10 ? '0' : '') + h) + ':' + (h_24[1] < 10 ? '0' + h_24[1] : '' + h_24[1]) + ' ' + type;

}

function isLetter(str) {
    const result = str.length === 1 && str.match(/[a-z]/i);
    return result;
}
exports.genNewCode = code => {
    const decimal = parseInt(code, 36)
    const incrementBy1 = decimal + 1;
    const masterCode = incrementBy1.toString(36)
    return masterCode.toUpperCase();
}
exports.genMasterCode = code => {
    let divideString = code.split('')
    // For 3 digit code
    if (divideString.length === 3) {
        let decimal = parseInt(code, 36)
        let incrementBy1 = decimal + 1;
        let masterCode = incrementBy1.toString(36)
        let returncode;
        divideString = masterCode.split('')
        if (divideString.length === 1) {
            returncode = '00' + masterCode.toUpperCase()
        } else if (divideString.length === 2) {
            returncode = '0' + masterCode.toUpperCase()
        } else if (divideString.length === 3) {
            returncode = masterCode.toUpperCase()
        }
        return returncode;
    } else if (divideString.length === 2) { // For 2 digit code
        var decimal = parseInt(code, 36)
        var incrementBy1 = decimal + 1;
        var masterCode = incrementBy1.toString(36)
        var returncode;
        divideString = masterCode.split('')
        if (divideString.length === 1) {
            returncode = '0' + masterCode.toUpperCase()
        } else if (divideString.length === 2) {
            returncode = masterCode.toUpperCase()
        }
        return returncode;
    }
}
exports.getCodes = code => {
    let convertedCode;
    const divideString = code.split('')
    // For 2 digit code
    if (divideString.length === 2) {
        // check if given code is letter or not 
        if (isLetter(divideString[divideString.length - 1]) && divideString[divideString.length - 1] != 'Z') {
            convertedCode = divideString[0] + increment(divideString[divideString.length - 1]); // if its not equal to 'Z' then increment Alphabate (ex: a => b)
            convertedCode = convertedCode.toUpperCase()
        } else if (isLetter(divideString[divideString.length - 1]) &&
            divideString[divideString.length - 1] === 'Z') { // if its equal to 'Z' then increment Number (ex: 1Z => 21)
            convertedCode = increment(divideString[0]) + 1;
        } else if (parseInt(divideString[divideString.length - 1]) &&
            parseInt(divideString[divideString.length - 1]) == 9) { // if its a number and equal to 9 then Assign Alphabate to 'A' (ex: 09 => 0A)
            convertedCode = divideString[0] + 'A';
        } else if (parseInt(divideString[divideString.length - 1]) && parseInt(divideString[divideString.length - 1]) != 9) { // if its a number and not equal to 9 then increment Alphabate (ex: 0A => )
            convertedCode = divideString[0] + increment(divideString[divideString.length - 1]);
        }
    } else if (divideString.length === 3) { // For 3 digit code
        if (isLetter(divideString[divideString.length - 1]) && divideString[divideString.length - 1] != 'Z') {
            convertedCode = (divideString[divideString.length - 3]) + (divideString[divideString.length - 2]) + increment(divideString[divideString.length - 1]);
            convertedCode = convertedCode.toUpperCase()
        } else if (isLetter(divideString[divideString.length - 1]) && divideString[divideString.length - 1] === 'Z') {
            convertedCode = divideString[divideString.length - 3] + increment(divideString[divideString.length - 2]) + 1;
        } else if ((parseInt(divideString[divideString.length - 1]) && parseInt(divideString[divideString.length - 1]) == 9) &&
            (parseInt(divideString[divideString.length - 1]) && parseInt(divideString[divideString.length - 1]) == 9)) {
            convertedCode = divideString[divideString.length - 3] + divideString[divideString.length - 2] + 'A';
        } else if ((parseInt(divideString[divideString.length - 1]) && parseInt(divideString[divideString.length - 1]) != 9) &&
            (parseInt(divideString[divideString.length - 1]) && parseInt(divideString[divideString.length - 1]) != 9)) {
            convertedCode = divideString[divideString.length - 3] + divideString[divideString.length - 2] + increment(divideString[divideString.length - 1]);
        }
    }
    return convertedCode;
}


exports.getActulaPriceCode = price => {
    let actualPrice = Math.round((price) / 1000).toString();
    if (actualPrice.length) {
        switch (actualPrice.length) {
            case 1:
                actualPrice = '000' + actualPrice;
                break;
            case 2:
                actualPrice = '00' + actualPrice;
                break;
            case 3:
                actualPrice = '0' + actualPrice;
                break;
            case 4:
                actualPrice = actualPrice;
                break;
            case 5:
                actualPrice = 'CROR';
                break;
        }
    }
    return actualPrice;
}

exports.addMonths = (months) => {
    let date = new Date();
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

// generate Otp
exports.GenerateOtp = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

exports.haveSameData = (obj1, obj2) => {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if(obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => obj2.hasOwnProperty(key)
               && obj2[key] === obj1[key]);
    }
    return false;
}


exports.getSpecficObjFarray = (arr,inpkey,inpval = undefined) => {
    if (!arr && !inpkey){
        return "array or inpkey not found"
    }
    if (arr.length >= 1){
        for(let i = 0;i < arr.length;i++){
            let arr_obj = arr[i].toJSON();
            for (var key of Object.keys(arr_obj)) {
                if ((inpkey !=undefined)&& (inpval != undefined)){
                    if (typeof inpkey == 'string'&& typeof inpval == 'string'){
                        if (key === inpkey && arr_obj[key] === inpval){
                            return arr_obj
                        }
                    }
                    if (typeof inpkey == 'string'&& typeof inpval == 'object'){
                        if (key === inpkey && haveSameData(arr_obj[key] ,inpval)){
                            return arr_obj
                        }
                    }
                }
                if (inpkey   && inpval == undefined){
                    if (key == inpkey){
                        return arr_obj
                    }
                }
            }
        }
        return null;
    }
    else{
        return {}

    }
}

function isValidObjectId(id){
      
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}

// generate Otp
exports.isValidObjId = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
};

// generate Otp
exports.getAndRemoveDupObjIdsFArr = (arr,id) => {
    let uniqueIds = [];
    let matchedObj = [];


    const unique = arr.filter(element => {
    const isDuplicate = uniqueIds.includes(element[id]);
    if (isDuplicate){
        matchedObj.push(element[id])
    }

    if (!isDuplicate) {
        uniqueIds.push(element[id]);

        return true;
    }
    });

    return [unique, matchedObj]

// console.log(unique, uniqueIds);

};




function function_DateEqual(instancedate1, instancedate2) {
    return instancedate1.getFullYear() === instancedate2.getFullYear() &&
    instancedate1.getMonth() === instancedate2.getMonth() &&
    instancedate1.getDate() === instancedate2.getDate()
}


exports.cmpDate = (date1,date2) => {

    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date11.getDate() === date2.getDate()


};


exports.sendMail = async (userDetail) => {

    var transporter = nodemailer.createTransport(
        {
            service:'gmail',
            auth: {
              user: 'featureventures@gmail.com',
              pass: 'Feature_ventures123'
            }
        }
    );

    var mailOptions = {
        from: "featureventures@gmail.com", 
        to: "0.0.v.vikas@gmail.com", 
        subject: userDetail.sub,
        text:JSON.stringify(userDetail.text)
        // template: 'email', // the name of the template file i.e email.handlebars
        // context:{
        //     name: "vikas", // replace {{name}} with Adebola
        //     company: 'FeatureV' // replace {{company}} with My Company
        // }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            // console.log(error)
        }
        else{
            // console.log(info)
        }
    });


};


exports.getToken = async () => {


};


