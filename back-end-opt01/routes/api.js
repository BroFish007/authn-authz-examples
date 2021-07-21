const Router = require('@koa/router');
const router = new Router();

function timestamp() {
    var now = new Date();
    return now.toISOString();
}

router.get('/api', (ctx) => {
    console.log('in api.js: GET');

    ctx.body = { a: 1, b: "two", c: [ "side", "sick" ] };
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
