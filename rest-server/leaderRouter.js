var express = require('express');
var Router = express.Router();
var bodyParser = require('body-parser');
Router.use(bodyParser.json());
Router.use(function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})

Router.route('/')
.get(function(req,res,next){
        res.end('Will send all the leadership to you');
})

.post(function(req, res, next){
    res.end('Will add leader: ' + req.body.name);    
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});


Router.route('/:LID')
.get(function(req,res,next){
        res.end('Will send ' + req.params.LID + 'leader\'s info to you');
})

.put(function(req, res, next){
        res.write('Updating leader: ' + req.params.LID + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete( function(req, res){
        res.end('Deleting leader: ' + req.params.LID);
});


module.exports = Router