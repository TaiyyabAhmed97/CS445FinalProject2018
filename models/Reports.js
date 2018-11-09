var _ = require('underscore');
var moment = require('moment');
var Valid = require('../models/Valid')
class Reports {
    constructor(rid) {
        this.rid = rid;
        this.name = this.getname();
        this.start_date = "";
        this.end_date = "";
        this.total_admissions = 0;
        this.detail_by_park = new Array();
    }
    getname() {
        if (this.rid == 907) { this.name = "Admissions report" }
        else { this.name = "Revenue report" }
        return this.name
    }
    genAdmissions(Parks, Orders) {

        let total = 0
        for (var x in Parks) {
            let obj = {
                pid: 'test',
                name: 'test',
                admissions: 0
            };
            for (var y in Orders) {

                if (Orders[y].pid == x) {
                    obj.admissions += 1;
                    total += 1;
                }
            }
            obj.pid = x;
            obj.name = Parks[x].location_info.name;
            this.detail_by_park.push(obj);
        }
        this.total_admissions = total;
    }
    genRevenue(Parks, Orders) {
        var Objectw_out_totalAdmissions = _.omit(this, ["total_admissions"]);
        let obj2 = {
            total_orders: 0,
            total_revenue: 0,
        }
        var newobj = Object.assign(Objectw_out_totalAdmissions, obj2);
        for (var x in Parks) {
            let obj = {
                pid: 'test',
                name: 'test',
                orders: 0,
                revenue: 0.00
            };
            for (var y in Orders) {
                if (Orders[y].pid == x) {
                    obj.revenue += Orders[y].amount;
                    obj.orders += 1;
                    newobj.total_orders += 1;


                }

            }
            newobj.total_revenue += obj.revenue;
            obj.pid = x;
            obj.name = Parks[x].location_info.name;
            Objectw_out_totalAdmissions.detail_by_park.push(obj);

        }
        return Objectw_out_totalAdmissions;
    }
    genAdmissionswDate(Parks, Orders, date) {
        this.end_date = moment(date['end_date']).format("YYYY-MM-DD");
        let total = 0
        for (var x in Parks) {
            let obj = {
                pid: 'test',
                name: 'test',
                admissions: 0
            };
            for (var y in Orders) {

                if (Orders[y].pid == x && (moment(Orders[y].date).isSameOrBefore(this.end_date))) {
                    obj.admissions += 1;
                    total += 1;
                }
            }
            obj.pid = x;
            obj.name = Parks[x].location_info.name;
            this.detail_by_park.push(obj);
        }
        this.total_admissions = total;
    }

    genRevenuewDate(Parks, Orders, date) {
        this.end_date = moment(date['end_date']).format("YYYY-MM-DD");
        // console.log(moment(date['end_date']).format("YYYY-MM-DD"));
        //console.log(date);
        var Objectw_out_totalAdmissions = _.omit(this, ["total_admissions"]);
        let obj2 = {
            total_orders: 0,
            total_revenue: 0,
        }
        var newobj = Object.assign(Objectw_out_totalAdmissions, obj2);
        for (var x in Parks) {
            let obj = {
                pid: 'test',
                name: 'test',
                orders: 0,
                revenue: 0.00
            };
            for (var y in Orders) {
                if (Orders[y].pid == x && (moment(Orders[y].date).isSameOrBefore(this.end_date))) {
                    obj.revenue += Orders[y].amount;
                    obj.orders += 1;
                    newobj.total_orders += 1;


                }

            }
            newobj.total_revenue += obj.revenue;
            obj.pid = x;
            obj.name = Parks[x].location_info.name;
            Objectw_out_totalAdmissions.detail_by_park.push(obj);

        }
        return Objectw_out_totalAdmissions;
    }

}


module.exports = Reports;