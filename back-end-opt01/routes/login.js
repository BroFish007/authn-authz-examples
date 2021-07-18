const Router = require('@koa/router');
const router = new Router();

router.get('/login', (ctx) => {
    let dait = new Date();
    ctx.body = 'This is the login page. ' + dait.toISOString();
    ctx.redirect('https://dev-g52l-mo4.us.auth0.com/authorize');
});

module.exports = router;
