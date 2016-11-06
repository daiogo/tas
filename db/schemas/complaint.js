var mongoose = require('mongoose');

var complaintSchema = {
	complaintId: {
		type: String
	},
	timestamp: {
		type: Date
	},
	latitude: {
		type: String
	},
	longitude: {
		type: String
	},
	category: {
		type: String
	},
	subcategory: {
		type: String
	},
	description: {
		type: String
	},
	evidence: {
		type: String
	}
};

module.exports = new mongoose.Schema(complaintSchema);
module.exports.complaintSchema = complaintSchema;
