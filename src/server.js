const Hapi = require("@hapi/hapi");
const routes = require('./routes');

/*	server.route(routes);
	
	await server.start();
	console.log(`server berjalan pada ${server.info.uri}`);
};*/
const server = Hapi.server({
	port: 5000,
	host: proccess.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
	routes: {
		cors: {
			origin: ['*'],
		},
	},
});

init();
