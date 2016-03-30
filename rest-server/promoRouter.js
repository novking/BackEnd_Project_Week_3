var express = require('express');
var Router = express.Router();
var bodyParser = require('body-parser');
Router.use(bodyParser.json());

Router.route('/')
.all (function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})
.get (function(req, res, next){
    res.end("Will get all the info about promo")
})
.post (function(req, res, next){
    res.end("Will create a promo of " + req.body.name)
})
.delete (function (req, res){
    res.end("Will delete all the prome. Sad face :( ")
})
;

Router.all('/:promoId', function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})
.get('/:promoId', function(req, res){
    res.end('will give your a secret promo: ' + req.params.promoId +'. and you are welcome')
})
.put('/:promoId', function(req, res){
    res.write('Updating promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete('/:promoId', function(req, res){
    res.end('Deleting promo: ' + req.params.promoId);
});

module.exports = Router