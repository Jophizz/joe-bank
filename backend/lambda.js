const serverlessExpress = require('@codegenie/serverless-express');

const app = require('./app');

let serverInstance;

async function bootstrapLambdaApi() {
	if (!serverInstance) {
		console.log('LOG => Initializing new Lambda API instance');
		serverInstance = serverlessExpress({ app });
	}
	return serverInstance;
}

export async function handler(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	const server = await bootstrapLambdaApi();
	return await server(event, context, callback);
}