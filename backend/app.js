require('dotenv').config();

const { getCurrentInvoke } = require('@codegenie/serverless-express');
const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/balance', require('./routes/balance'));
app.use('/api/transactions', require('./routes/transactions')); // Ensure this is included
app.use('/api/check-deposit', require('./routes/checkdeposit'));

// Health Check Route
app.get('/health', (req, res) => {
	res.send('Backend is running');
});

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('frontend/build'));

// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// 	});
// }

morgan.token('id', request => {
	return  getCurrentInvoke().event?.requestContext?.requestId || Date.now().toString();
});
morgan.token('invocationId', request => {
	return getCurrentInvoke().context?.awsRequestId;
});
app.use(morgan('LOG => :id | :invocationId | :date[iso] | :method | :status | :url - :total-time ms'));

module.exports = app;