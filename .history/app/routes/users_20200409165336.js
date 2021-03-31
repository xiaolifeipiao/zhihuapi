const Router = require("koa-router");
const router  = new Router({prefix: '/users'});
const { find, finById, create, update, delete:del}  =require('../controllers/users')
router.get('/',find);

router.post('/',create);

router.get('/:id',finById);

router.put('/:id',update);

router.delete('/:id',del);

module.exports = router;