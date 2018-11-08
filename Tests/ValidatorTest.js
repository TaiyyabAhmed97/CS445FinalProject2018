var Valid = require('../models/Valid');
var tap = require('tap');
var moment = require('moment');


//Validate POST a park location
let retObj = {

    "type": "http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation",
    "title": "Your request data didn't pass validation",
    "detail": "Phone information is required but missing in your request",
    "status": 400,
    "instance": "/parks"
};
var park = {
    "location_info": {
        "name": "Apple River Canyon",
        "region": "Northwestern Illinois",
        "address": "8763 E. Canyon Rd, Apple River, IL 61001",
        "phone": "774-768-9090",
        "web": "https://www.dnr.illinois.gov/Parks/Pages/AppleRiverCanyon.aspx",
        "geo": { "lat": 42.448, "lng": -90.043 }
    },
    "payment_info": {
        "motorcycle": [5, 8],
        "car": [7, 9],
        "rv": [10, 13]
    }
};
var valid = new Valid();
let obj = valid.parkPostLoc(park);
tap.equal(null, obj);
park1 = {
    "location_info": {
        "name": "Apple River Canyon",
        "region": "Northwestern Illinois",
        "address": "8763 E. Canyon Rd, Apple River, IL 61001",
        "phone": "",
        "web": "https://www.dnr.illinois.gov/Parks/Pages/AppleRiverCanyon.aspx",
        "geo": { "lat": 42.448, "lng": -90.043 }
    },
    "payment_info": {
        "motorcycle": [5, 8],
        "car": [7, 9],
        "rv": [10, 13]
    }
};
obj = valid.parkPostLoc(park1);
tap.equal(obj.detail, retObj.detail);

// Validate POST a park payment information

obj = valid.parkPostPay(park1);
tap.equal(null, null);
park2 = {
    "location_info": {
        "name": "Apple River Canyon",
        "region": "Northwestern Illinois",
        "address": "8763 E. Canyon Rd, Apple River, IL 61001",
        "phone": "",
        "web": "https://www.dnr.illinois.gov/Parks/Pages/AppleRiverCanyon.aspx",
        "geo": { "lat": 42.448, "lng": -90.043 }
    },
    "payment_info": {
        "motorcycle": [-5, -8],
        "car": [7, 9],
        "rv": [10, 13]
    }
};

obj = valid.parkPostPay(park2);
tap.equal("All payment data must be a number greater than or equal to zero", obj);

// Validate POSTING a park

obj = valid.parkPost(park);
tap.equal(null, obj);
obj = valid.parkPost(park2);
tap.equal("Your request data didn't pass validation", obj.title);
obj = valid.parkPost(park1)
tap.equal(obj.detail, retObj.detail);


// Validate PUT a park

obj = valid.putPark(park);
tap.equal(null, null);
obj = valid.putPark(park1);
tap.equal(obj.detail, retObj.detail);

// Validate a visitor cannot post a note for a park he didnt pay for

var note = {
    "vid": 411,
    "title": "No campground",
    "text": "This place is beautiful, too bad that there is no campground here."
};
var Orders = {
    "300": {
        "oid": 751,
        "pid": 123,
        "vid": 411,
        "date": "2018-07-03",
        "type": "car",
        "amount": 4.50
    },
    "301": {
        "oid": 761,
        "pid": 124,
        "vid": 412,
        "date": "2018-08-02",
        "type": "rv",
        "amount": 9.25
    }
};

obj = valid.notePost(note, 123, Orders)
tap.equal(null, obj);
note.vid = 415;
obj = valid.notePost(note, 123, Orders);
tap.equal("You may not post a note to a park unless you paid for admission at that park", obj.detail);

// Validate Correct Date

let date = { "end_date": "20181232" };
obj = valid.ReportDate(date, 900);
tap.equal(obj.detail, "Wrong date format");
date.end_date = "20181229";
obj = valid.ReportDate(date, 900);
tap.equal(null, obj);
