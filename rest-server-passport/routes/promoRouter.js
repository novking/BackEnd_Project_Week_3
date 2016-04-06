var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promo = require('../models/promotions');

var Router = express.Router();
Router.use(bodyParser.json());

Router.route('/').get (Verify.verifyOrdinaryUser, function(req, res, next){
    Promo.find({}, function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
})
.post (Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Promo.create(req.body, function(err, promo){
        if (err) throw err;
        var id = promo._id;
        console.log('Promotion created!');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Promo ID is:' + id);
    });
})
.delete (Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res){
    Promo.remove({},function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
})
;

Router
.get('/:promoId', Verify.verifyOrdinaryUser, function(req, res){
    Promo.findById(req.params.promoId, function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
})

.put('/:promoId',Verify.verifyOrdinaryUser, Verify.verifyAdmin,  function(req, res){
    Promo.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true}, function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
})

.delete('/:promoId',Verify.verifyOrdinaryUser, Verify.verifyAdmin,  function(req, res){
    Promo.findByIdAndRemove(req.params.promoId, function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
});

module.exports = Router