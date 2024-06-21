const { MongoClient } = require('mongodb');
let client;

const connectDB = async () => {
	try {
		if (!client) {
			client = new MongoClient(process.env.MONGO_URI);
			await client.connect();
		}
		console.log('MongoDB Connected...');
		return client;
	} catch (error) {
		console.log(error.message);
	}
};

const getDB = async () => {
	if (!client) {
		await connectDB();
	}
	return client.db('bankApp');
};

module.exports = { connectDB, getDB };
