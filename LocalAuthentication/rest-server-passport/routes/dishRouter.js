var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var Dishes = require('../models/dishes');
var Verify = require('./verify');
router.use(bodyParser.json());

router.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
        Dishes.find({}, function(err, dish){
            if (err) return next(err);
            res.json(dish);
        });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.create(req.body, function(err, dish){
        if (err) return next(err);
        console.log('Dish created');
        var id = dish._id;
        
        //what if i cut off the res.writeHead part?
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: '+ id);
    });
})

.delete(Verify.verifyOrdinaryUser)
.delete(Verify.verifyAdmin, function(req, res, next){
        Dishes.remove({}, function(err, resp){
            if (err) throw err;
           res.json(resp); 
        });
});

router.route('/:dishId')

.get(Verify.verifyOrdinaryUser,function(req,res,next){
        Dishes.findById(req.params.dishId, function(err, dish){
            if (err) throw err;
            res.json(dish);
        });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
       Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true}, function(err, dish){
           if (err) throw err;
           res.json(dish);
       });
});

router.delete('/:dishId',Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res){
        Dishes.findByIdAndRemove(req.params.id, function(err, resp){
            if (err) throw err;
            res.json(resp);
        });
});

router.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser,function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        res.json(dish.comments);
    });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function(err, dish){
            if (err) throw err;
            res.json(dish);
        });
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        for (var i = (dish.comments.length-1); i>=0; i--){
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function(err, result){
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});


router.route('/:dishId/commments/:commentId')
.get(Verify.verifyOrdinaryUser,function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function(err, dish){
            if (err) throw err;
            console.log('Updated Comments');
            res.json(dish);
        });
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp){
            if (err) throw err;
            res.json(resp);
        });
    });
});


module.exports = router





