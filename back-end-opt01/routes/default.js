const Router = require('@koa/router');
const router = new Router();

router.get('/', (ctx) => {
    console.log('in default.js');
    let dait = new Date();
    ctx.body = 'Hello world!! The current date and time is ' + dait.toISOString();
    
});

module.exports = router;
