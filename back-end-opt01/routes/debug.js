const Router = require('@koa/router');
const router = new Router();

router.get('/debug', (ctx) => {
    console.log('in debug.js');
    var dait = new Date();
    ctx.body = '<H1>Debugging Info</H1>Hello world!! The current date and time is ' + dait.toISOString();

    console.log('---\\/--- ctx.request.headers ---\\/---');
    console.log(ctx.request.headers);
    console.log('---/\\--- ctx.request.headers ---/\\---');

    console.log('---\\/--- ctx.request ---\\/---');
    console.log(ctx.request);
    console.log('---/\\--- ctx.request ---/\\---');

});

module.exports = router;
