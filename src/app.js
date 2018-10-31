const express = require('express');
app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var Park = require('../models/Park');
var Note = require('../models/Note');
var Order = require('../models/Order');
var Visitor = require('../models/Visitor');
var Valid = require('../models/Valid');
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
            ParkSys[JSON.stringify(park.pid)] = park;
            res.send({ "pid": JSON.stringify(park.pid) }, 201);
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
                    arr.push(_.omit(ParkSys[key], ["pid"]));
                }
                res.send(arr);
            }
            var arr = [];
            for (var key in ParkSys) {
                if (ParkSys[key].searchKeyword(req.query.key)) {
                    arr.push(ParkSys[key]);
                }
            }
            console.log(ParkSys['123'].searchKeyword(req.query.key));
            res.send(arr);
        }
        else {
            let arr = []
            for (var key in ParkSys) {
                arr.push(_.omit(ParkSys[key], ["pid"]));
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
        var note = new Note(req.body.vid, req.params.parkId, req.body.title, req.body.text);
        NoteSys[JSON.stringify(note.nid)] = note;
        res.send({ "nid": JSON.stringify(note.nid) });


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

app.route('/parkpay/orders')
    .post(function (req, res) {
        var visitor = new Visitor(req.body.visitor.name, req.body.visitor.email, req.body.visitor.payment_info);
        var order = new Order(req.body.pid, req.body.vehicle, visitor.vid);
        order.processOrder(ParkSys[order.pid]);
        console.log(order);
        OrderSys[order.oid] = order;
        VisitorSys[visitor.vid] = visitor;
        visitor.processNotes()
        res.send({ "oid": JSON.stringify(order.oid) });
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
        var vid = req.params.visitorId;
        for (key in OrderSys) {
            if (vid == OrderSys[key].vid) {
                VisitorSys[vid].orders.push(_.omit(OrderSys[key].format(), ["amount", "type"]));
            }
        }
        for (key in NoteSys) {
            if (vid == NoteSys[key].vid) {
                VisitorSys[vid].notes.push(NoteSys[key].format());
            }
        }
        res.send(VisitorSys[vid]);
    });
app.route('/parkpay/reports')
    .get(function (req, res) {
        let obj = [{
            rid: "907",
            name: "Admissions report"
        }, {
            mrid: "911",
            name: "Revenue report"
        }
        ];
        res.send(obj);
    });

app.listen(8080);