var _ = require('underscore');
class Visitor {
    constructor(name, email, payment) {
        this.vid = Visitor.getvid()
        this.name = name;
        this.email = email;
        this.payment = payment;
        this.orders = new Array();
        this.notes = new Array();

    }

    static getvid() {
        if (!this.vid) { this.vid = 400; }
        else this.vid++;
        return this.vid;
    }

    format() {
        return _.omit(this, ["payment", "orders", "notes"]);
    }

    searchKeyword(key) {
        if (this.name.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.email.toLowerCase().includes(key.toLowerCase())) { return true; }
        else {
            return false;
        }

    }
}
module.exports = Visitor;