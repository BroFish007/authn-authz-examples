const Router = require('@koa/router');
const router = new Router();

function dait() {
    var dayt = new Date();
    return dayt.toISOString();
}

router.get('/api', (ctx) => {
    console.log('in api.js: GET');

    console.log('---\\/--- ctx.request.headers ---\\/--- ' + dait() );
    console.log(ctx.request.headers);
    console.log('---/\\--- ctx.request.headers ---/\\---');

    ctx.body = { a: 1, b: "two", c: [ "side", "sick" ] };
    // from https://akhromieiev.com/tutorials/how-to-send-json-response-using-koa/
    // if ctx.body is a string, Content-Type will automatically be set to "text/plain"
    // if ctx.body is on object or ray, Content-Type will automatically be set to "application/json"

    console.log('---\\/--- ctx ---\\/---');
    // console.log(ctx);
    console.log(ctx.request);
    console.log('---/\\--- ctx ---/\\--- ' + dait() );

});

router.options('/api', (ctx) => {
    // an OPTIONS method *must* be specified, or CORS preflight check will fail
    console.log('in api.js: OPTIONS');

    // the body can be empty or anything you want
    // only the headers and the status code are important; the response body is ignored by the client
    // ctx.body = { "datetime": dait() };	// this works
    ctx.body = '';	// good: this returns "HTTP/1.1 200 OK" and "Content-Length: 0"
    // ctx.body = null;	// bad: this returns "HTTP/1.1 204 No Content" with no Content-Length header

    console.log('---\\/--- ctx ---\\/---');
    console.log(ctx);	// shows request and response
    console.log('---/\\--- ctx ---/\\--- ' + dait() );

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
});

module.exports = router;
