var Search = require('../models/Search');
var tap = require('tap');

var Parks = {
    "123": {
        "pid": "123",
        "location_info": {
            "region": "Northwestern Illinois",
            "geo": {
                "lng": -90.043,
                "lat": 42.448
            },
            "web": "https://www.dnr.illinois.gov/Parks/Pages/AppleRiverCanyon.aspx",
            "phone": "815-745-3302",
            "name": "Apple River Canyon",
            "address": "8763 E. Canyon Rd, Apple River, IL 61001"
        },
        "payment_info": {
            "motorcycle": [
                5,
                8
            ],
            "car": [
                7,
                10
            ],
            "rv": [
                10,
                13
            ]
        }
    },
    "125": {
        "pid": "125",
        "location_info": {
            "region": "Northwestern Illinois",
            "geo": {
                "lng": -89.364,
                "lat": 41.978
            },
            "web": "https://www.dnr.illinois.gov/Parks/Pages/CastleRock.aspx",
            "phone": "815-732-7329",
            "name": "Castle Rock",
            "address": "1365 W. Castle Rd, Oregon IL 61061"
        },
        "payment_info": {
            "motorcycle": [
                2,
                3
            ],
            "car": [
                4.5,
                7
            ],
            "rv": [
                7,
                9.25
            ]
        }
    }
};
var Orders = {
    "300": {
        "oid": "300",
        "pid": "125",
        "amount": 4.5,
        "vid": "400",
        "date": "2018-11-15",
        "vehicle": {
            "type": "car",
            "state": "IL",
            "plate": "GOCUBS"
        },
        "payment_processing": {
            "card_transaction_id": "123-4567-89",
            "date_and_time": "2018-11-15"
        }
    },
    "301": {
        "oid": "301",
        "pid": "125",
        "amount": 9.25,
        "vid": "401",
        "date": "2018-11-15",
        "vehicle": {
            "type": "rv",
            "state": "CA",
            "plate": "60MPG"
        },
        "payment_processing": {
            "card_transaction_id": "123-4567-89",
            "date_and_time": "2018-11-15"
        }
    },
    "302": {
        "oid": "302",
        "pid": "123",
        "amount": 13,
        "vid": "401",
        "date": "2018-11-15",
        "vehicle": {
            "type": "rv",
            "state": "CA",
            "plate": "60MPG"
        },
        "payment_processing": {
            "card_transaction_id": "123-4567-89",
            "date_and_time": "2018-11-15"
        }
    }
};
var Visitors = {
    "400": {
        "vid": "400",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "payment_info": {
            "card": "4388567890987654",
            "zip": 60616,
            "expiration_date": "12/19",
            "name_on_card": "John Doe"
        },
        "orders": [
            {
                "oid": "300",
                "pid": "125",
                "date": "2018-11-15"
            }
        ],
        "notes": [
            {
                "nid": "300",
                "pid": "125",
                "date": "2018-11-15",
                "title": "No campground"
            }
        ]
    },
    "401": {
        "vid": "401",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "payment_info": {
            "card": "xxxxxxxxxxx5678",
            "zip": 94102,
            "expiration_date": "05/23",
            "name_on_card": "Jane Smith"
        },
        "orders": [
            {
                "oid": "301",
                "pid": "125",
                "date": "2018-11-15"
            },
            {
                "oid": "302",
                "pid": "123",
                "date": "2018-11-15"
            }
        ],
        "notes": [
            {
                "nid": "301",
                "pid": "125",
                "date": "2018-11-15",
                "title": "Great fishing"
            }
        ]
    }
};
var Notes = {
    "300": {
        "nid": "300",
        "pid": "125",
        "vid": "400",
        "date": "2018-11-15",
        "title": "No campground",
        "text": "This place is beautiful, too bad that there is no campground here."
    },
    "301": {
        "nid": "301",
        "pid": "125",
        "vid": "401",
        "date": "2018-11-15",
        "title": "Great fishing",
        "text": "Caught a walleye here, did't really expect anything other than catfish."
    }
};
// Test creation of Seach object
var search = new Search();

