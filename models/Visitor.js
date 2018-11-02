var _ = require('underscore');
class Visitor {
    constructor(name, email, payment) {
        this.vid = JSON.stringify(Visitor.getvid());
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

    getOneFormat() {
        let obj = { visitor: { name: this.name, email: this.email } }
        let obj1 = _.omit(this, ["name", "email", "payment"]);
        let retObj = Object.assign(obj, obj1);
        return retObj;
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