var tap = require('tap');
var Order = require('../models/Order');
var moment = require('moment');

// CREATE New Order
var vehicle = {

    "state": "IL",
    "plate": "GOCUBS",
    "type": "car"

};
var payment = {
    "card_transaction_id": "123-4567-89",
    "date_and_time": moment().format("YYYY-MM-DD")
};
var park = {
    "pid": 124,
    "location_info": {
        "name": "Castle Rock",
        "region": "Northwestern Illinois",
        "address": "1365 W. Castle Rd, Oregon IL 61061",
        "phone": "815-732-7329",
        "web": "https://www.dnr.illinois.gov/Parks/Pages/CastleRock.aspx",
        "geo": { "lat": 41.978, "lng": -89.364 }
    },
    "payment_info": {
        "motorcycle": [2, 3],
        "car": [4.50, 7],
        "rv": [7, 9.25]
    }
};
var visitor = {
    "vid": 800,
    "orders": 90,
    "notes": "none",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "payment_info": {
        "card": "xxxxxxxxxxx5678",
        "name_on_card": "Jane Smith",
        "expiration_date": "05/23",
        "zip": 94102
    }

};
var order = new Order(123, vehicle, 400);
tap.equal("300", order.oid);
tap.equal(123, order.pid);
tap.equal(null, order.amount);
tap.equal(400, order.vid);
//console.log(order.date);
tap.equal(moment().format("YYYY-MM-DD"), order.date);



// Check Payment Processing : order.processOrder()

tap.equal(payment.card_transaction_id, order.payment_processing.card_transaction_id);
tap.equal(payment.date_and_time, order.payment_processing.date_and_time);

// Check if Order Processed amount correctly

order.processOrder(park);
console.log("here");
tap.equal(4.50, order.amount);


// Check  if formatting is correct: order.format() 

let retObj = {
    "oid": order.oid,
    "pid": order.pid,
    "date": order.date,
    "type": order.vehicle.type,
    "amount": order.amount
};

tap.equal(retObj.oid, order.format().oid);
tap.equal(retObj.pid, order.format().pid);
tap.equal(retObj.date, order.format().date);
tap.equal(retObj.type, order.format().type);
tap.equal(retObj.amount, order.format().amount);


// Check if returing One Order Detail is correct: order.getOneOrder(visitor)

retObj = {
    "oid": order.oid,
    "pid": order.pid,
    "amount": order.amount,
    "vid": order.vid,
    "date": order.date,
    "vehicle": order.vehicle,
    "visitor": visitor,
    "payment_processing": order.payment_processing
};
tap.equal(retObj.oid, order.getOneOrder(visitor).oid);
tap.equal(retObj.pid, order.getOneOrder(visitor).pid);
tap.equal(retObj.amount, order.getOneOrder(visitor).amount);
tap.equal(retObj.vid, order.getOneOrder(visitor).vid);
tap.equal(retObj.date, order.getOneOrder(visitor).date);
tap.equal(retObj.visitor.name, order.getOneOrder(visitor).visitor.name);
tap.equal(retObj.visitor.email, order.getOneOrder(visitor).visitor.email);
tap.equal(retObj.visitor.payment_info.card, order.getOneOrder(visitor).visitor.payment_info.card);
tap.equal(retObj.visitor.payment_info.name_on_card, order.getOneOrder(visitor).visitor.payment_info.name_on_card);
tap.equal(retObj.visitor.payment_info.expiration_date, order.getOneOrder(visitor).visitor.payment_info.expiration_date);
tap.equal(retObj.visitor.payment_info.zip, order.getOneOrder(visitor).visitor.payment_info.zip);
tap.equal(retObj.vehicle.state, order.getOneOrder(visitor).vehicle.state);
tap.equal(retObj.vehicle.plate, order.getOneOrder(visitor).vehicle.plate);
tap.equal(retObj.vehicle.type, order.getOneOrder(visitor).vehicle.type);
tap.equal(retObj.payment_processing.card_transaction_id, order.getOneOrder(visitor).payment_processing.card_transaction_id);
tap.equal(retObj.payment_processing.date_and_time, order.getOneOrder(visitor).payment_processing.date_and_time);




// Check if Search keyword through the object is correct: order.SearchKeyword()

tap.equal(true, order.searchKeyword("4.50", visitor));
tap.equal(true, order.searchKeyword(moment().format("YYYY-MM-DD"), visitor));
tap.equal(true, order.searchKeyword("IL", visitor));
tap.equal(true, order.searchKeyword("GO", visitor));
tap.equal(true, order.searchKeyword("ca", visitor));
tap.equal(false, order.searchKeyword("4.50", visitor));
tap.equal(false, order.searchKeyword("jane", visitor));
tap.equal(false, order.searchKeyword("smith", visitor));
tap.equal(false, order.searchKeyword("999", visitor));
