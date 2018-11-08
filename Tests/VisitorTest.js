var tap = require('tap');
var Visitor = require('../models/Visitor');
var moment = require('moment');

// CREATE New Visitor

let payment = {
    "card": "373456789045678",
    "name_on_card": "Jane Smith",
    "expiration_date": "05/23",
    "zip": 94102
};
var visitor = new Visitor("Jane", "jane@gmail.com", payment);
tap.equal("Jane", visitor.name);
tap.equal("jane@gmail.com", visitor.email);
tap.equal("373456789045678", visitor.payment_info.card);
tap.equal("Jane Smith", visitor.payment_info.name_on_card);
tap.equal("05/23", visitor.payment_info.expiration_date);
tap.equal(94102, visitor.payment_info.zip);
tap.equal(0, visitor.orders.length);
tap.equal(0, visitor.notes.length);



// Check if formatting is correct: Visitor.format()

let obj = {
    name: "Jane",
    email: "jane@gmail.com",
    vid: "400"
}

tap.equal(obj.name, visitor.format().name);
tap.equal(obj.email, visitor.format().email);
tap.equal(obj.vid, visitor.format().vid);


// Check if One Visitor Detail is correct: Visitor.getOneFormat()

obj = {
    vid: "400",
    name: "Jane",
    email: "jane@gmail.com",
    orders: new Array(),
    notes: new Array()
};

let retobj = visitor.getOneFormat();

tap.equal(obj.vid, retobj.vid);
tap.equal(obj.name, retobj.visitor.name);
tap.equal(obj.email, retobj.visitor.email);
tap.equal(0, retobj.orders.length);
tap.equal(0, retobj.notes.length);


// Test Searching a Keyword: Visitor.SearchKeyword()

tap.equal(true, visitor.searchKeyword("jan"));
tap.equal(true, visitor.searchKeyword("gmail"));
tap.equal(false, visitor.searchKeyword("09"));





