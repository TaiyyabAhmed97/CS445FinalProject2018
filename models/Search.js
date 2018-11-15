var moment = require('moment');
var Park = require('./Park');
var Order = require('./Order');
var Note = require('./Note');
var Visitor = require('./Visitor');
class Search {
    constructor() {
        Parks: new Array();
        Orders: new Array();
        Notes: new Array();
        Visitors: new Array();
    }

    query(key, dates, parks, orders, notes, visitors) {
        this.Parks = this.filterParks(parks, key);
        this.Orders = this.filterOrders(orders, visitors, key);
        this.Notes = this.filterNotes(notes, key);
        this.Visitors = this.filterVisitors(visitors, key);
    }
    filterParks(obj, searchKey) {
        let arr = [];
        for (var key in obj) {
            if (obj[key].searchKeyword(searchKey)) {
                arr.push(obj[key]);
            }
        }
        return arr;
    }
    filterOrders(obj, vobj, searchKey) {
        let arr = [];
        for (var key in obj) {
            if (obj[key].searchKeyword(searchKey, vobj[obj[key].vid])) {
                arr.push(obj[key]);
            }
        }
        return arr;
    }
    filterNotes(obj, searchKey) {
        let arr = [];
        for (var key in obj) {
            if (obj[key].searchKeyword(searchKey)) {
                arr.push(obj[key]);
            }
        }
        return arr;
    }
    filterVisitors(obj, searchKey) {
        let arr = [];
        for (var key in obj) {
            if (obj[key].searchKeyword(searchKey)) {
                arr.push(obj[key]);
            }
        }
        return arr;
    }

}
module.exports = Search;