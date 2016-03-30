var express = require('express');
var Router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Leadership = require('../models/leadership');


Router.use(bodyParser.json());


Router.route('/')
.get(function(req,res,next){
    Leadership.find({}, function(err, leaders){
        if err throw err;
        res.json(leaders);
    });
})

.post(function(req, res, next){
    Leadership.create(req.body, function(err,leader){
        if err throw err;
        console.log('Leadership created!');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Leader created with id: '+ leader._id);
    });
})

.delete(function(req, res, next){
        Leadership.remove({}, function(err, leader){
            if err throw err;
            res.json(leader);
        });
});


Router.route('/:LID')
.get(function(req,res,next){
        Leadership.findById(req.params.LID, function(err, leader){
            if err throw err;
            res.json(leader);
        });
})

.put(function(req, res, next){
        Leadership.findByIdAndUpdate(req.param.LID, {$set: req.body},{new:true}, function(err, leader){
            if err throw err;
            res.json(leader);
        });
})

.delete( function(req, res){
        Leadership.findByIdAndRemove(req.params.LID, function(err, leader){
            if err throw err;
            res.json(leader);
        });
});


module.exports = Router