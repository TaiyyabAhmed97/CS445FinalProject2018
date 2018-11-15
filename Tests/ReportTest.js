var tap = require('tap');
var Reports = require('../models/Reports');
var moment = require('moment');

// CREATE new Report

var Parks = {
    '123':
        {
            pid: '123',
            location_info:
                {
                    address: '8763 E. Canyon Rd, Apple River, IL 61001',
                    web:
                        'https://www.dnr.illinois.gov/Parks/Pages/AppleRiverCanyon.aspx',
                    name: 'Apple River Canyon',
                    region: 'Northwestern Illinois',
                    geo: [Object],
                    phone: '815-745-3302'
                },
            payment_info: { rv: [Array], car: [Array], motorcycle: [Array] }
        }
}




var Orders = {
    '302': {
        oid: '302',
        pid: '123',
        amount: 13,
        vid: '401',
        date: '2018-11-08',
        vehicle: { type: 'rv', state: 'CA', plate: '60MPG' },
        payment_processing:
            {
                card_transaction_id: '123-4567-89',
                date_and_time: '2018-11-08'
            }
    }
}

var report = new Reports(907);
tap.equal(report.rid, 907);
tap.equal(report.name, "Admissions report");
tap.equal(report.start_date, "");
tap.equal(report.end_date, "");
var report1 = new Reports(912);
tap.equal(report1.rid, 912);
tap.equal(report1.name, "Revenue report");
tap.equal(report1.start_date, "");
tap.equal(report1.end_date, "");


// Test Generation of Admissions report: Report.genAdmissions()


report.genAdmissions(Parks, Orders);
tap.equal(report.rid, 907);
tap.equal(report.name, "Admissions report");
tap.equal(report.start_date, "");
tap.equal(report.end_date, "");
tap.equal(report.total_admissions, 1);
tap.equal(report.detail_by_park[0].pid, '123');
tap.equal(report.detail_by_park[0].name, 'Apple River Canyon');
tap.equal(report.detail_by_park[0].admissions, 1);



// Test Generation of Revenue report: Report.genRevenue()

let obj = report1.genRevenue(Parks, Orders);
tap.equal(obj.rid, 912);
tap.equal(obj.name, "Revenue report");
tap.equal(obj.start_date, "");
tap.equal(obj.end_date, "");
tap.equal(obj.detail_by_park[0].pid, '123');
tap.equal(obj.detail_by_park[0].name, 'Apple River Canyon');
tap.equal(obj.detail_by_park[0].orders, 1);
tap.equal(obj.detail_by_park[0].revenue, 13);
tap.equal(obj.total_orders, 1);
tap.equal(obj.total_revenue, 13);


// Test Generation of Admissions report with a Date: Report.genAdmissionswDate()

let report2 = new Reports(907);
dates = { "end_date": "20181229" };
report2.genAdmissionswDate(Parks, Orders, dates);
//console.log(report2);
tap.equal(report2.rid, 907);
tap.equal(report2.name, "Admissions report");
tap.equal(report2.start_date, "");
tap.equal(report2.end_date, "2018-12-29");
tap.equal(report2.total_admissions, 0);
tap.equal(report2.detail_by_park[0].pid, '123');
tap.equal(report2.detail_by_park[0].name, 'Apple River Canyon');
tap.equal(report2.detail_by_park[0].admissions, 0);

// Test Generation of Revenue report with a Date: Report.genRevenuewDate()
let report3 = new Reports(912);
let obj1 = report3.genRevenuewDate(Parks, Orders, dates);

tap.equal(obj1.rid, 912);
tap.equal(obj1.name, "Revenue report");
tap.equal(obj1.start_date, "");
tap.equal(obj1.end_date, "2018-12-29");
tap.equal(obj1.detail_by_park[0].pid, '123');
tap.equal(obj1.detail_by_park[0].name, 'Apple River Canyon');
tap.equal(obj1.detail_by_park[0].orders, 0);
tap.equal(obj1.detail_by_park[0].revenue, 0);
tap.equal(obj1.total_orders, 0);
tap.equal(obj1.total_revenue, 0);


// Test CheckDate Function()

let date = null;
tap.equal("", Reports.CheckDate(date));
let newdate = '20121212';
tap.equal(moment(newdate).format("YYYY-MM-DD"), Reports.CheckDate(newdate));

