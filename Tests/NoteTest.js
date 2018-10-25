var tap = require('tap');
var Note = require('../models/Note');
var moment = require('moment');

var testobj = {

    "vid": 411,
    "title": "No campground",
    "text": "This place is beautiful, too bad that there is no campground here."

};

// CREATE NEW Note
var note = new Note(testobj.vid, 123, testobj.title, testobj.text);
tap.equal(note.pid, 123);
tap.equal(note.vid, testobj.vid);
tap.equal(note.date, moment().format("YYYY-MM-DD"));
tap.equal(note.nid, 300);
tap.equal(note.title, testobj.title);
tap.equal(note.text, testobj.text);

// Note.format() 

var formattedobj = {
    "nid": 300,
    "date": moment().format("YYYY-MM-DD"),
    "title": "No campground"
};

tap.equal(note.format().nid, formattedobj.nid);
tap.equal(note.format().date, formattedobj.date);
tap.equal(note.format().title, formattedobj.title);


//Note.updateNote()

changedobj = {
    "vid": 511,
    "title": "very nicecampground",
    "text": "This place is horrible."
};

note.updateNote(changedobj);
tap.equal(note.vid, changedobj.vid);
tap.equal(note.title, changedobj.title);
tap.equal(note.text, changedobj.text);

//Note.searchKeyword()

let bool = note.searchKeyword(moment().format("YYYY-MM-DD"))
tap.equal(true, bool);
bool = note.searchKeyword("very");
tap.equal(true, bool);
bool = note.searchKeyword("this");
tap.equal(true, bool);
bool = note.searchKeyword("fire");
tap.equal(false, bool);