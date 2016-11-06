/*
	tas webservice
*/

// Imports modules
var express = require('express');					// Express.js
var mongoose = require('mongoose');					// mongoose (MongoDB driver)
var bodyparser = require('body-parser');			// body-parser (parse HTTP request body)
var measurementSchema = require('./db/schemas/measurement');
var complaintSchema = require('./db/schemas/complaint');

// Connects mongoose to mongodb service
mongoose.connect('mongodb://tas:5m4r7f4r3@ds053216.mlab.com:53216/tas');

// Creates mongoose models for each schema
// Parameters are: model name, schema, collection name
var Measurement = mongoose.model('Measurement', measurementSchema, 'measurements');
var Complaint = mongoose.model('Complaint', complaintSchema, 'complaints');

// Export API methods
module.exports = function() {
	// Creates and Express.js app
	var app = express();

	// Makes app able to use the body-parser module functionality
	app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'));

	// REQUEST HANDLER: Return measurements
	app.get('/api/measurements', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		/*var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}*/

		// Query the trip database and executes callback function passed
		// as parameter to send response after the query has been completed
		Measurement.find({}, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			res.send(docs);
		});
	});

	// REQUEST HANDLER: Return complaints
	app.get('/api/complaints', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		/*var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}*/

		// Query the trip database and executes callback function passed
		// as parameter to send response after the query has been completed
		Complaint.find({}, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			res.send(docs);
		});
	});

	// REQUEST HANDLER: Update database
	app.post('/api/update/complaints', function(req, res) {

		var complaintDoc = new Complaint({
			complaintId: req.body.complaintId,
			timestamp: req.body.timestamp,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			category: req.body.category,
			subcategory: req.body.subcategory,
			description: req.body.description,
			evidence: req.body.evidence
		});

		complaintDoc.save(function(error) {
			if (error) {
				console.log(error);
				res.send('error');
			} else {
				res.send('ok');
				console.log('Saved complaint!');
			}
		});

	});

	// REQUEST HANDLER: Update database
	app.post('/api/update/measurements', function(req, res) {

		var measurementDoc = new Measurement({
			sensorId: req.body.sensorId,
			timestamp: req.body.timestamp,
			measurement: req.body.latitude
		});

		complaintDoc.save(function(error) {
			if (error) {
				console.log(error);
				res.send('error');
			} else {
				res.send('ok');
				console.log('Saved measurement!');
				//res.send("ok");
			}
		});

	});

	/* =====================FRONT END ROUTES=====================*/

	// Index page
	app.get('/', function(req, res) {
        res.sendFile('/public/index.html'); // load our public/index.html file
    });

    app.get('/admin/measurements', function(req, res) {
        res.sendFile(__dirname + '/public/views/measurementsView.html');
    });

    app.get('/admin/complaints', function(req, res) {
        res.sendFile(__dirname + '/public/views/complaintsView.html');
    });

    app.get('/admin/vehicles', function(req, res) {
        res.sendFile(__dirname + '/public/views/vehiclesView.html');
    });

	return app;
}
