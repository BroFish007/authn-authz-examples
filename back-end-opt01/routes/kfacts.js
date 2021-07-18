const Router = require('@koa/router');
const router = new Router();

router.get('/kfacts', (ctx) => {
    console.log('In kfacts.js');
    let koalaFacts = [];

    koalaFacts.push({ meta_name: 'Color', meta_value: 'Brown, maybe with black or white' });
    koalaFacts.push({ meta_name: 'Native Country', meta_value: 'Australia' });
    koalaFacts.push({ meta_name: 'Animal Classification', meta_value: 'Mammal' });
    koalaFacts.push({ meta_name: 'Life Span', meta_value: '13 - 18 years' });
    koalaFacts.push({ meta_name: 'Are they bears?', meta_value: 'No' });

    return ctx.render('kfacts2', {
	attributes: koalaFacts
    });
})

module.exports = router;

// inspired by:
//	https://github.com/mjhea0/node-koa-api
//	https://github.com/mjhea0/node-koa-api/blob/master/src/server/routes/movies.js
//	https://www.digitalocean.com/community/tutorials/how-to-build-a-hello-world-application-with-koa
// EOF
