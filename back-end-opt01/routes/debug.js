const Router = require('@koa/router');
const router = new Router();

router.get('/debug', (ctx) => {
    console.log('in debug.js');
    var dait = new Date();
    ctx.body = '<H1>Debugging Info</H1>Hello world!! The current date and time is ' + dait.toISOString();
});

module.exports = router;
