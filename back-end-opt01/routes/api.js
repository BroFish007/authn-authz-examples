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

// using async/await syntax (which is really just Promises with a different name)
// many thanks to David P for helping fix this
async function getUserInfo(token) {
  const response = await fetch(
    `${process.env.AUTH0_IDP}/v2/userinfo`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  )
  return await response.json()
}

router.get('/api', async (ctx) => {
    console.log('in api.js: GET');
    let token = getAccessToken(ctx);

    let resp42 = await getUserInfo(token);
    console.log('resp42c = ', resp42);

    ctx.body = {
	meta: {
	    req: "GET /api",
	    status: 200,
	    // token: `${token}`
	},
	data: [
	    { some_key: "some value" },
	    { another_key: "another value" },
	    { user_name: `${resp42.name}` },
	    { user_email: `${resp42.email}` }
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
