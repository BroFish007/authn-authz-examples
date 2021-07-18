'use strict';

// const Router = require('@koa/router');
const render = require('koa-ejs');
const fs = require('fs');
const path = require('path');


// from https://koajs.com/
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

// const router = new Router();

// set up config params
const config = {
    domain: 'localhost',	// your domain
    https:{
	port: 3001,
	options: {
	    key:  fs.readFileSync(path.resolve(process.cwd(), 'api_server_privkey.pem'), 'utf8').toString(),
	    cert: fs.readFileSync(path.resolve(process.cwd(), 'api_server_cert.pem'),    'utf8').toString()
	}
    }
};

// set up the error middleware
// must be defined early because only no errors above/earlier than the error middleware will be caught

app.use(async (ctx, next) => {
    try {
	await next()
    } catch(err) {
	console.log(err.status)
	ctx.status = err.status || 500;
	ctx.body = err.message;
    }
});

// address CORS issues (head-on)

// inspired by:
//	https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api
//	https://stackoverflow.com/questions/49633157/how-do-i-set-headers-to-all-responses-in-koa-js
//	https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-myCustomHeader, Authorization');
    ctx.set('Access-Control-Allow-Origin', 'https://ui.localtest.me:3000');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');	// required when "credentials" mode is "include"
    await next();
});
// TODO: is their an easier way using 'koa-cors'?
//	see: https://stackoverflow.com/questions/53871292/how-to-allow-access-control-allow-origin-with-koa


// set up templating

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'kfacts2',
    viewExt: 'html',
    cache: false,
    debug: true
});

// routes
const apiRoutes = require('./routes/api');
const debugRoutes = require('./routes/debug');
const defaultRoutes = require('./routes/default');
const errerRoutes = require('./routes/errer')
const loginRoutes = require('./routes/login')
const kfactsRoutes = require('./routes/kfacts');

app.use(apiRoutes.routes());
app.use(debugRoutes.routes());
app.use(defaultRoutes.routes());
app.use(errerRoutes.routes());
app.use(loginRoutes.routes());
app.use(kfactsRoutes.routes());

// app.use(router.routes()).use(router.allowedMethods());
// app.use(handle404Errors);

// start the server

// app.listen(3000);	// could use this if HTTP only, but we also need HTTPS for Auth0 federated login
// http.createServer(app.callback()).listen(3000);
https.createServer(config.https.options, app.callback()).listen(config.https.port);

let dait = new Date();
console.log('Restarted at ' + dait.toISOString() );

// run as: nodemon app.js

// EOF
