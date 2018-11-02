let Joi = require('joi');
class Valid {
    constructor() {
    }
    parkPostLoc(park) {
        let retObj = {

            "type": "http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation",
            "title": "Your request data didn't pass validation",
            "detail": "Geo information is required but missing in your request",
            "status": 400,
            "instance": "/parks"
        }
        let schema = Joi.object().keys({
            name: Joi.string().required().error(new Error('Name information is required but missing in your request')),
            region: Joi.string().required().error(new Error('Region information is required but missing in your request')),
            address: Joi.string().required().error(new Error('Address information is required but missing in your request')),
            phone: Joi.string().required().error(new Error('Phone information is required but missing in your request')),
            web: Joi.string().required().error(new Error('Web information is required but missing in your request')),
            geo: Joi.required().error(new Error('Geo information is required but missing in your request'))
        });
        //console.log(park.location_info)
        const result = Joi.validate(park.location_info, schema);
        if (result.error == null) {
            return null;
        }
        retObj.detail = result.error.message;
        return retObj;
    }

    parkPostPay(park) {
        let schema = Joi.object().keys({
            motorcycle: Joi.array().items(Joi.number().min(0).error(new Error('1'))),
            car: Joi.array().items(Joi.number().min(0).error(new Error('2'))),
            rv: Joi.array().items(Joi.number().min(0).error(new Error('3')))
        });
        console.log(park.payment_info);
        const result = Joi.validate(park.payment_info, schema);
        if (result.error == null) {
            return null;
        }
        return "All payment data must be a number greater than or equal to zero";
    }
    parkPost(park) {
        let retObj = {

            "type": "http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation",
            "title": "Your request data didn't pass validation",
            "detail": "Geo information is required but missing in your request",
            "status": 400,
            "instance": "/parks"
        }
        let obj1 = this.parkPostLoc(park);
        if (obj1 == null) {
            let obj2 = this.parkPostPay(park);
            console.log(obj2);
            if (obj2 == null) {
                return null;
            }
            retObj.detail = obj2;
            return retObj;
        }
        return obj1;
    }

    putPark(park, pid) {
        let obj = this.parkPost(park);
        if (obj == null) {
            return null;
        }
        else {
            obj.instance += "/" + pid;
            return obj;
        }
    }

    notePost(note, pid, Orders) {
        console.log(Orders);
        let obj = {
            "type": "http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation",
            "title": "Your request data didn't pass validation",
            "detail": "You may not post a note to a park unless you paid for admission at that park",
            "status": 400,
            "instance": "/parks/"
        };
        for (var k in Orders) {
            if ((Orders[k].pid == pid) && (Orders[k].vid == note.vid)) {
                return null;

            }
        }
        obj.instance += pid;
        return obj;

    }

}
module.exports = Valid;