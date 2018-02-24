var express = require('express');
var router = express.Router();
var fs = require('fs');
var https = require('https');
var http = require('http');
var mongoose = require('mongoose');
var User = require('./modules/User');
var io = require('socket.io')(http);

router.get('/',function(req,res){
    var html = fs.readFileSync(__dirname+'/public/index.html', 'utf8')
    res.send(html);
});
router.get('/functions.js',function(req,res){
    var js = fs.readFileSync(__dirname+'/public/functions.js', 'utf8')
    res.send(js);
});
router.get('/controller.js',function(req,res){
    var js = fs.readFileSync(__dirname+'/public/controller.js', 'utf8')
    res.send(js);
});
router.get('/target.png',function(req,res){
    res.sendFile(__dirname+'/public/assets/target.png');
});
//app.use(bodyParser.json);
//app.use(express.static(path.join(__dirname, './server/api')));
router.get('/ClientLocation/:string', function(req,response,next){
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ req.params.string +"&key=AIzaSyB7GJ_pg9dYmsdAvEekIJWjsLdJW-r-hHY";
    
    console.log(req.params.string);

    https.get(url, res => {
        res.setEncoding("utf8");
        body = "";

        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            body = JSON.parse(body);
            console.log(
                `City: ${body.results[0].formatted_address} -`,
                `Latitude: ${body.results[0].geometry.location.lat} -`,
                `Longitude: ${body.results[0].geometry.location.lng}`
            );
            //socket.on('location', body.results[0].geometry.location);
            var socket = io;
            socket.emit('location', body.results[0].geometry.location);
            console.log(body.results[0].geometry.location);
        });
    });        
});

router.post('/AddUser',function(req,res,next){
    console.log("adding user");
    console.log(req.body.name);
    User.create(req.body).then(function(user){
        res.send(user);
        console.log("user successfuly added");
    }).catch(next);
});

module.exports = router;