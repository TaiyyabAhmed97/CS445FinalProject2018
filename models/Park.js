var moment = require('moment');
var _ = require('underscore');


class Park {
    constructor(location_info, payment_info) {
        this.pid = JSON.stringify(Park.getpid());
        this.location_info = location_info;
        this.payment_info = payment_info
    }

    static getpid() {
        if (!this.pid) { this.pid = 123; }
        else this.pid++;
        return this.pid;
    }

    updatePark(park) {
        this.location_info = park.location_info;
        this.payment_info = park.payment_info;
        console.log(this);
    }

    searchKeyword(key) {
        if (this.location_info.name.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.location_info.region.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.location_info.phone.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.location_info.address.toLowerCase().includes(key.toLowerCase())) { return true; }
        else if (this.location_info.web.toLowerCase().includes(key.toLowerCase())) { return true; }
        else {
            return false;
        }

    }

}
module.exports = Park;
