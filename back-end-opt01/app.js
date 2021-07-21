'use strict';

require('dotenv').config();
var ms = require('millisecond');	// https://www.npmjs.com/package/millisecond

// const Router = require('@koa/router');
const render = require('koa-ejs');
const fs = require('fs');
const path = require('path');

// from https://koajs.com/
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

// inspired by:
//	https://www.npmjs.com/package/koa-jwt
//	https://community.auth0.com/t/how-do-i-get-jwt-to-work-with-koa/26979
var jwt = require('koa-jwt');
// var jwtrsa = require('jwks-rsa');
const { koaJwtSecret } = require('jwks-rsa');

function timestamp() {
    var now = new Date();
    return now.toISOString();
}

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

// basic logger, for debugging
app.use(async (ctx, next) => {
    console.log('---\\/--- ctx.request ---\\/--- ' + timestamp() );
    console.log(ctx.request);
    console.log('---/\\--- ctx.request ---/\\---');
    await next();
    console.log('---\\/--- ctx.response ---\\/---');
    if (ctx) {
	console.log(ctx.response);
    } else {
	console.log('(ctx was null)');
    }
    console.log('---/\\--- ctx.response ---/\\--- ' + timestamp() );
});


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
    ctx.set('Access-Control-Allow-Origin', process.env.CLIENT_UI_URL);
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');	// required when "credentials" mode is "include"
    await next();
});
// TODO: is their an easier way using 'koa-cors'?
//	see: https://stackoverflow.com/questions/53871292/how-to-allow-access-control-allow-origin-with-koa


// set up templating for UI response

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

var jwtCheck = jwt({
    secret: koaJwtSecret({
	jwksUri: process.env.AUTH0_IDP + '/.well-known/jwks.json',
	cache: true,
	// rateLimit: true,
	// jwksRequestsPerMinute: 5,
	cacheMaxEntries: 5,
	cacheMaxAge: ms('1h') 
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_IDP + '/'
}).unless({ method: 'OPTIONS' });
console.log('jwtCheck=' + jwtCheck);

// Custom 401 handling (first middleware)
// from: https://www.npmjs.com/package/koa-jwt
app.use(function (ctx, next) {
  return next().catch((err) => {
      console.log('Oh no...found an error');
      console.log('err=' + err);
      if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
	  let errmsg2 = err.originalError ? err.originalError.message : err.message;
	  console.log('Error: ' + errmsg2);
    } else {
      throw err;
    }
  });
});

app.use(debugRoutes.routes());
app.use(defaultRoutes.routes());
app.use(errerRoutes.routes());
app.use(loginRoutes.routes());
app.use(kfactsRoutes.routes());
// Middleware below this line is only reached if the JWT token is valid
//app.use(jwtCheck);
app.use(
    jwt({
	secret: koaJwtSecret({
	    jwksUri: process.env.AUTH0_IDP + '/.well-known/jwks.json',
	    cache: true,
	    // rateLimit: true,
	    // jwksRequestsPerMinute: 5,
	    cacheMaxEntries: 5,
	    cacheMaxAge: ms('1h') 
	}),
	audience: process.env.AUTH0_AUDIENCE,
	issuer: process.env.AUTH0_IDP + '/'
    }).unless({ method: 'OPTIONS' })
);
// must include ".unless({method:'OPTIONS'})" above, else CORS preflight fails and get '401 Unauthorized' response
// https://github.com/Foxandxss/koa-unless
app.use(apiRoutes.routes());

// app.use(router.routes()).use(router.allowedMethods());
// app.use(handle404Errors);

// start the server

// app.listen(3000);	// could use this if HTTP only, but we also need HTTPS for Auth0 federated login
// http.createServer(app.callback()).listen(3000);
https.createServer(config.https.options, app.callback()).listen(config.https.port);

console.log('Restarted at ' + timestamp() );

// run as: nodemon app.js

// EOF
