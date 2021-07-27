const Router = require('@koa/router');
const router = new Router();
const fetch = require('node-fetch');

function getAccessToken(ctx) {
    try {
	let token_val = ctx.get('Authorization').replace(/^\s*Bearer\s+/, '');
	console.log('good...got token_val (msg#2021-0727-084839)');
	//console.log('token_val =', token_val);
	return token_val;
    } catch {
	console.log('no hdrval');
	return null;
    }
}

function timestamp() {
    var now = new Date();
    return now.toISOString();
}

async function getUserInfo(token) {
    let auth0url = process.env.AUTH0_IDP + '/v2/userinfo';
    const options = {
	method: 'GET',
	headers: {
	    Authorization: `Bearer ${token}`
	}}
    console.log('good to here 1');
    (async () => {
	try {
	    console.log('good to here 2');
	    console.log('options = ', options);
	    const resp = await fetch(auth0url, options);
	    console.log('good to here 3');
	    // console.log('resp = ', resp);
	    let userinfo = await resp.json();
	    console.log('userinfo =', userinfo);
	    return userinfo;
	} catch(e) {
	    console.error('Something went wrong:', e);
	}
    })();
};

// ignore getUserInfo02: it is not used
async function getUserInfo02(token) {
    let auth0url = process.env.AUTH0_IDP + '/v2/userinfo';
    const options = {
	method: 'GET',
	headers: {
	    Authorization: `Bearer ${token}`
	}}
    console.log('good to here 21');
    (async () => {
	try {
	    console.log('good to here 22');
	    console.log('options = ', options);
	    return await fetch(auth0url, options)
		.then(res => {
		    console.log('good to here 23');
		    console.log('res23 = ', res);
		    return res.json();
		})
	} catch(e) {
	    console.error('Something went wrong:', e);
	}
    })();
};

router.get('/api', (ctx) => {
    console.log('in api.js: GET');
    let token = getAccessToken(ctx);
    let resp42 = null;

/*
    (async() => {
	resp42 = await getUserInfo(token);
	console.log('resp42a = ', resp42);
    })();
    console.log('resp42b = ', resp42);
*/

    if (!resp42) {
	resp42 = getUserInfo(token);
    }
    console.log('resp42c = ', resp42);

    // ctx.body = { a: 1, b: "two", c: [ "side", "sick" ] };
    ctx.body = {
	meta: {
	    req: "GET /api",
	    status: 200,
	    token: `${token}`
	},
	data: [
	    { some_key: "some value" },
	    { another_key: "another value" },
	    { stuff: `${resp42}` }
	]
    };
    // from https://akhromieiev.com/tutorials/how-to-send-json-response-using-koa/
    // if ctx.body is a string, Content-Type will automatically be set to "text/plain"
    // if ctx.body is on object or ray, Content-Type will automatically be set to "application/json"
});

router.options('/api', (ctx) => {
    // an OPTIONS method *must* be specified, or CORS preflight check will fail
    console.log('in api.js: OPTIONS');

    // the body can be empty or anything you want
    // only the headers and the status code are important; the response body is ignored by the client
    // ctx.body = { "datetime": timestamp() };	// this works
    ctx.body = '';	// good: this returns "HTTP/1.1 200 OK" and "Content-Length: 0"
    // ctx.body = null;	// bad: this returns "HTTP/1.1 204 No Content" with no Content-Length header

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
});

module.exports = router;
