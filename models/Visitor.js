class Visitor {
    constructor(name, email, payment) {
        this.vid = Visitor.getvid()
        this.name = name;
        this.email = email;
        this.payment = payment;
        this.orders = null
        this.notes = null

    }

    static getvid() {
        if (!this.vid) { this.vid = 400; }
        else this.vid++;
        return this.vid;
    }

    processOrder(orders) {

    }

    processNotes(notes) {

    }

    calculatePayment() { }
}
module.exports = Visitor;