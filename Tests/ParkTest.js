var tap = require('tap');
var Park = require('../models/Park');

var testobj = {
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

// CREATE NEW PARK
var park = new Park(testobj.location_info, testobj.payment_info);
tap.equal(park.pid, "123");
tap.equal(park.location_info, testobj.location_info);
tap.equal(park.payment_info, testobj.payment_info);

// UPDATE EXISTING PARK
var newpark = new Park("there", "90");
park.updatePark(newpark);
tap.equal(park.location_info, "there");
tap.equal(park.payment_info, "90");

// CHECK by key
var park = new Park(testobj.location_info, testobj.payment_info);
var key = "north";
var bool = park.searchKeyword(key);
tap.equal(bool, true);
key = "south";
bool = park.searchKeyword(key);
tap.equal(bool, false);
key = "apple"
bool = park.searchKeyword(key);
key = "774"
bool = park.searchKeyword(key);
key = "8763"
bool = park.searchKeyword(key);
key = "www.d"
bool = park.searchKeyword(key);
key = "zzz"
bool = park.searchKeyword(key);