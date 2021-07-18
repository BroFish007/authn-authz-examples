const Router = require('@koa/router');
const router = new Router();

// yes, "errer" is mispelled, purposely
router.get('/errer', (ctx) => {
    console.log('In errer.js');
    ctx.throw(500, 'processor is on fire');
});

module.exports = router;
