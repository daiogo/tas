var mongoose = require('mongoose');

var measurementSchema = {
	sensorId: {
		type: String
	},
	timestamp: {
		type: Date
	},
	measurement: {
		type: Number
	}
};

module.exports = new mongoose.Schema(measurementSchema);
module.exports.measurementSchema = measurementSchema;
