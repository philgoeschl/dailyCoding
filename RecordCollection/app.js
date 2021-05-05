var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();

// TODO: check why bodyParser is deprecated!!!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/add-record', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('records').insertOne(req.body);
    });
    res.send('Record added:\n' + JSON.stringify(req.body));
});

app.get('/view-records', function(req, res) {
    dbConn.then(function(db) {
        db.collection('records').find({}).toArray().then(function(records) {
            console.log('####', records);
            // res.status(200).json(records);
        });
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');