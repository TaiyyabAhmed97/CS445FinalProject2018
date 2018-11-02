var moment = require('moment');
var _ = require('underscore');
class Note {
    constructor(vid, pid, title, text) {
        this.nid = JSON.stringify(Note.getnid());
        this.pid = pid;
        this.vid = vid;
        this.date = Note.setdate();
        this.title = title;
        this.text = text;
    }

    static getnid() {
        if (!this.nid) { this.nid = 300; }
        else this.nid++;
        return this.nid;
    }

    static setdate() {
        if (!this.date_ordered) { this.date_ordered = moment().format("YYYY-MM-DD"); }
        return this.date_ordered;
    }

    format() {
        let retObj = _.omit(this, ["vid", "text"]);
        return retObj;
    }

    updateNote(note) {
        this.vid = note.vid;
        this.title = note.title;
        this.text = note.text;
    }

    searchKeyword(key) {
        if (this.date.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.title.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.text.toLowerCase().includes(key.toLowerCase())) { return true; }
        else {
            return false;
        }

    }


}
module.exports = Note;