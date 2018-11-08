var moment = require('moment');
var _ = require('underscore');
class Order {
    constructor(pid, vehicle, vid) {
        this.oid = JSON.stringify(Order.getoid());
        this.pid = pid;
        this.amount = null;
        this.vid = vid;
        this.date = Order.setdate()
        this.vehicle = vehicle;
        this.payment_processing = Order.payment_process();

    }
    static getoid() {
        if (!this.oid) { this.oid = 300; }
        else this.oid++;
        return this.oid;
    }

    static setdate() {
        if (!this.date) { this.date = moment().format("YYYY-MM-DD"); }
        return this.date;
    }
    static setcardid() {

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 9; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;


    }
    static payment_process() {
        if (!this.payment_processing) {
            this.payment_processing = {
                "card_transaction_id": "123-4567-89",
                "date_and_time": moment().format("YYYY-MM-DD")
            };
        }
        else { }
        return this.payment_processing;
    }
    processOrder(park) {
        var str = park.location_info.address;
        var state = str.substring(str.length - 8, str.length - 6);
        if (this.vehicle.state == state) {
            this.amount = park.payment_info[this.vehicle.type][0];
        }
        else {
            this.amount = park.payment_info[this.vehicle.type][1];
        }
    }

    format() {
        let retObj = {
            "oid": this.oid,
            "pid": this.pid,
            "date": this.date,
            "type": this.vehicle.type,
            "amount": this.amount
        };
        return retObj;
    }
    getOneOrder(visitor) {
        let newvisitor = _.omit(visitor, ["vid", "orders", "notes"]);
        let card = newvisitor.payment_info.card;
        let xx = 'xxxxxxxxxxx' + card.substring(card.length - 4, card.length);
        newvisitor.payment_info.card = xx;
        let retObj = {
            "oid": this.oid,
            "pid": this.pid,
            "amount": this.amount,
            "vid": this.vid,
            "date": this.date,
            "vehicle": this.vehicle,
            "visitor": newvisitor,
            "payment_processing": this.payment_processing
        };
        return retObj;
    }

    searchKeyword(key, visitor) {
        if (JSON.stringify(this.amount).toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.date.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.vehicle.state.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.vehicle.plate.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.vehicle.type.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (visitor.name.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (visitor.email.toLowerCase().includes(key.toLowerCase())) { return true; }
        else {
            return false;
        }

    }
}
module.exports = Order;