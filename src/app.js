const express = require('express');
app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var Park = require('../models/Park');
var _ = require('underscore');


app.use(express.json());
app.use(express.urlencoded());

var ParkSys = {};


//PARKS



app.route('/parkpay/parks')
    .post(function (req, res) {
        var park = new Park(req.body.location_info, req.body.payment_info);
        ParkSys[JSON.stringify(park.pid)] = park;
        res.send({ "pid": JSON.stringify(park.pid) });
    })

    .get(function (req, res) {
        if (_.has(req.query, 'key')) {
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
        console.log(ParkSys);
        console.log(id);
        ParkSys[id].updatePark(req.body);
        res.send(200);
    })

    .get(function (req, res) {
        park = ParkSys[req.params.parkId];
        res.send(park);
    })

    .delete(function (req, res) {
        id = req.params.parkId;
        delete ParkSys[id]
        console.log(ParkSys);
        res.send(200);
    });

app.route('/parkpay/parks/:parkId/notes')
    .get(function (req, res) {

    })

//NOTES




app.listen(8080);