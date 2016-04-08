var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/favorites');

router.route('/') .all(Verify.verifyOrdinaryUser)

.get(function(req, res, next){
    Favorites.findById(req.decoded._doc._id)
    .populate('postedBy')
    .populate('dishes.dishContent')
    .exec(function(err, doc){
        if (err) throw err;
        res.json(dish);
    });
})
.post(function(req, res, next){
    Favorites.findOne({postedBy: req.decoded._doc._id}).exec(function(err, resp){
        if (err) throw err;
        if (!resp){
            Favorites.create(req.decoded._doc._id, function(err, fav){
                if (err) throw err;
                console.log('Fav created');
                resp = fav;
            })
        };
        resp.dishes.push(req.body);
        resp.save(function(err, resp){
            if (err) throw err;
            res.json(resp);
        });
    });
})

.delete(function (req, res, next) {
    Favorites.findByIdAndRemove(req.decoded._doc._id).exec(function (err, resp) {
        if (err) throw err;
        res.json({
            'delete all the favorites'
        });
    });
})
    
router.delete('/:dishId', Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
    }).populate('dishes.dishContent')
        .exec(function (err, resp) {
        if (err) throw err;
        resp.dishes.id(req.params.dishId).remove();
        resp.save(function(err, respEnd){
            if (err) throw err;
            res.json(respEnd);
        });
    });
})