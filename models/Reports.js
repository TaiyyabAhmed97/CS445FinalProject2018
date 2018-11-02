var _ = require('underscore');
class Reports {
    constructor(rid, name) {
        this.rid = rid;
        this.name = name;
        this.start_date = "";
        this.end_date = "";
        this.total_admissions = any;
        this.detail_by_park = new Array();
    }
    genAdmissions(Parks, Orders) {
        let obj = {
            pid: string,
            name: string,
            admissions: 0
        };
        let total = 0
        for (x in Parks) {
            for (y in Orders) {
                if (Orders.pid == x) {
                    obj.admissions += 1;
                    total += 1;
                }
            }
            obj.pid = x;
            obj.name = Parks[x].name;
            this.detail_by_park.push(obj);
        }
        this.total_admissions = total;
    }
    genRevenue(Parks, Orders) {
        let obj = {
            pid: string,
            name: string,
            orders: 0,
            revenue: 0.00
        };
        var Objectw_out_totalAdmissions = _.omit(this, ["total_admissions"]);
        let obj2 = {
            total_orders: number,
            total_revenue: number,
        }
        var newobj = Object.assign(Objectw_out_totalAdmissions, obj2);

    }
}
module.exports = Reports;