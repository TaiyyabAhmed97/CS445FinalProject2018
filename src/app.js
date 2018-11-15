const express = require('express');
app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var moment = require('moment');
var Park = require('../models/Park');
var Note = require('../models/Note');
var Order = require('../models/Order');
var Visitor = require('../models/Visitor');
var Valid = require('../models/Valid');
var Report = require('../models/Reports');
var Search = require('../models/Search');
var _ = require('underscore');


app.use(express.json());
app.use(express.urlencoded());

var ParkSys = {};
var NoteSys = {};
var OrderSys = {};
var VisitorSys = {};
let Validify = new Valid();
//PARKS



app.route('/parkpay/parks')
    .post(function (req, res) {
        let obj = Validify.parkPost(req.body);
        if (obj == null) {
            var park = new Park(req.body.location_info, req.body.payment_info);
            ParkSys[park.pid] = park;
            res.send({ "pid": park.pid }, 201);
        }
        else {
            res.send(obj, 400);
        }

    })

    .get(function (req, res) {
        if (_.has(req.query, 'key')) {
            if (req.query.key == "") {
                let arr = []
                for (var key in ParkSys) {
                    arr.push(_.omit(ParkSys[key], ["payment_info"]));
                }
                res.send(arr);
            }
            var arr = [];
            for (var key in ParkSys) {
                if (ParkSys[key].searchKeyword(req.query.key)) {
                    arr.push(_.omit(ParkSys[key], ["payment_info"]));
                }
            }
            res.send(arr);
        }
        else {
            let arr = []
            for (var key in ParkSys) {
                arr.push(_.omit(ParkSys[key], ["payment_info"]));
            }
            res.send(arr);
        }
    })

app.route('/parkpay/parks/:parkId')
    .put(function (req, res) {
        id = req.params.parkId;
        //console.log(ParkSys);
        //console.log(id);
        if (ParkSys[id] == null) {
            res.send(404);
        }
        let obj = Validify.putPark(req.body, id);
        if (obj == null) {
            ParkSys[id].updatePark(req.body);
            res.send(204);
        }
        else {
            res.send(obj, 400);
        }

    })

    .get(function (req, res) {
        id = req.params.parkId;
        if (ParkSys[id] == null) {
            res.send(404);
        }
        park = ParkSys[req.params.parkId];
        res.send(park);
    })

    .delete(function (req, res) {
        id = req.params.parkId;
        if (ParkSys[id] == null) {
            res.send(404);
        }
        delete ParkSys[id];
        res.send(204);
    });

app.route('/parkpay/parks/:parkId/notes')
    .get(function (req, res) {
        id = req.params.parkId;
        if (ParkSys[id] == null) {
            res.send(404);
        }
        let arr = [];

        for (var key in NoteSys) {
            if (NoteSys[key].pid == req.params.parkId) {
                arr.push(NoteSys[key].format());
            }
        }
        res.send(arr);
    })
    .post(function (req, res) {
        let retObj = Validify.notePost(req.body, req.params.parkId, OrderSys);
        if (retObj != null) {
            res.send(retObj, 400);
        }
        else {
            var note = new Note(req.body.vid, req.params.parkId, req.body.title, req.body.text);
            VisitorSys[req.body.vid].notes.push(note.format());
            NoteSys[note.nid] = note;
            res.send({ "nid": note.nid }, 201);
        }



    });

app.route('/parkpay/parks/:parkId/notes/:noteId')
    .get(function (req, res) {
        note = NoteSys[req.params.noteId];
        res.send(note);
    })

//NOTES

app.route('/parkpay/notes')
    .get(function (req, res) {
        if (_.has(req.query, 'key')) {
            var newarr = [];
            for (k in ParkSys) {
                var noteArr = {
                    "pid": Number,
                    "notes": new Array()
                };
                for (l in NoteSys) {
                    if (NoteSys[l].pid == k && NoteSys[l].searchKeyword(req.query.key)) {
                        noteArr.notes.push(NoteSys[l].format());
                    }
                }
                noteArr.pid = k;
                newarr.push(noteArr);
            }
            res.send(newarr);
        }
        else {
            var newarr = [];
            for (k in ParkSys) {
                var noteArr = {
                    "pid": Number,
                    "notes": new Array()
                };
                for (l in NoteSys) {
                    if (NoteSys[l].pid == k) {
                        noteArr.notes.push(NoteSys[l].format());
                    }
                }
                noteArr.pid = k;
                newarr.push(noteArr);
            }
            res.send(newarr);
        }

    });
app.route('/parkpay/notes/:noteId')
    .get(function (req, res) {
        var obj = NoteSys[req.params.noteId];
        res.send(obj);
    })
    .put(function (req, res) {
        NoteSys[req.params.noteId].updateNote(req.body);
        res.send(200);
    })
    .delete(function (req, res) {
        delete NoteSys[req.params.noteId];
        res.send(200);
    });


//ORDERS


app.route('/parkpay/orders')
    .post(function (req, res) {
        let vid = '';
        for (var x in VisitorSys) {
            if (VisitorSys[x].email == req.body.visitor.email) {
                vid = VisitorSys[x].vid;
            }

        }
        if (vid === '') {
            var visitor = new Visitor(req.body.visitor.name, req.body.visitor.email, req.body.visitor.payment_info);
            var order = new Order(req.body.pid, req.body.vehicle, visitor.vid);
            order.processOrder(ParkSys[order.pid]);
            //console.log(order);
            OrderSys[order.oid] = order;
            VisitorSys[visitor.vid] = visitor;
            VisitorSys[visitor.vid].orders.push(_.omit(OrderSys[order.oid].format(), ["amount", "type"]));
            res.send({ "oid": order.oid }, 201);
        } else {
            var order = new Order(req.body.pid, req.body.vehicle, vid);
            order.processOrder(ParkSys[order.pid]);
            //console.log(order);
            OrderSys[order.oid] = order;
            VisitorSys[vid].orders.push(_.omit(OrderSys[order.oid].format(), ["amount", "type"]));
            //visitor.processNotes()
            res.send({ "oid": order.oid }, 201);
        }



    })
    .get(function (req, res) {
        if (_.has(req.query, 'key')) {
            if (req.query.key == "") {
                let arr = []
                for (x in OrderSys) {
                    arr.push(OrderSys[x].format());
                }
                res.send(arr);
            }
            var arr = [];
            for (key in OrderSys) {
                //console.log(VisitorSys[OrderSys[key].vid])
                if (OrderSys[key].searchKeyword(req.query.key, VisitorSys[OrderSys[key].vid])) {
                    arr.push(OrderSys[key].format());
                }
            }
            res.send(arr);
        }
        else {
            let arr = []
            for (x in OrderSys) {
                arr.push(OrderSys[x].format());
            }
            res.send(arr);
        }

    })

app.route('/parkpay/orders/:orderId')
    .get(function (req, res) {
        let id = req.params.orderId;
        let obj = OrderSys[id];
        retObj = obj.getOneOrder(VisitorSys[obj.vid]);
        res.send(retObj);


    });


// VISITORS


app.route('/parkpay/visitors')
    .get(function (req, res) {
        if (_.has(req.query, 'key')) {
            var arr = [];
            for (key in VisitorSys) {
                if (VisitorSys[key].searchKeyword(req.query.key)) {
                    arr.push(VisitorSys[key].format());
                }
            }
            res.send(arr);
        }
        else {
            var arr = [];
            for (key in VisitorSys) {
                arr.push(VisitorSys[key].format());
            }
            res.send(arr);
        }

    })
app.route('/parkpay/visitors/:visitorId')
    .get(function (req, res) {
        var i;
        var j = 0;
        var vid = req.params.visitorId;
        res.send(VisitorSys[vid].getOneFormat());
    });
app.route('/parkpay/reports')
    .get(function (req, res) {
        let obj = [{
            rid: "907",
            name: "Admissions report"
        }, {
            rid: "911",
            name: "Revenue report"
        }
        ];
        res.send(obj);
    });


// REPORTS


app.route('/parkpay/reports/:rid')
    .get(function (req, res) {
        var dates = req.query;
        if (!(_.has(req.query, 'end_date'))) {
            if (req.params.rid == 907) {
                var report = new Report(req.params.rid);
                report.genAdmissions(ParkSys, OrderSys);
                res.send(report);
            }
            else {
                var report = new Report(req.params.rid);
                let obj = report.genRevenue(ParkSys, OrderSys);
                res.send(obj);
            }
        }
        else {
            if (Validify.ReportDate(dates, req.params.rid) != null) {
                res.send(Validify.ReportDate(dates, req.params.rid), 400)
            }
            if (req.params.rid == 907) {
                var report = new Report(req.params.rid);
                report.genAdmissionswDate(ParkSys, OrderSys, dates);
                res.send(report);
            }
            //console.log(dates);
            //var report = new Report(req.params.rid);
            //let obj = report.genRevenuewDate(ParkSys, OrderSys);
            //res.send(obj);


        }

    });
app.route('/parkpay/search')
    .get(function (req, res) {
        var search = new Search();
        let key = req.query['key'];
        let dates = _.omit(req.query, ["key"]);
        // console.log(req.query.key);
        // console.log(req.query.start_date);
        search.query(key, dates, ParkSys, OrderSys, NoteSys, VisitorSys);

        res.send(search);
    })

app.listen(8080);