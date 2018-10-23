class Note {
    constructor(vid, pid, date, title, text) {
        this.nid = Note.getnid();
        this.vid = vid;
        this.pid = pid;
        this.date = date;
        this.title = title;
        this.text = text;
    }

    static getnid() {
        if (!this.nid) { this.nid = 300; }
        else this.nid++;
        return this.nid;
    }
    static getvid() { }
}
module.exports = Note;