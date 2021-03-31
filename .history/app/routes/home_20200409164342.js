const Router = require("koa-router");
const router  = new Router();
//es6写法
const {index} = require('../controllers/home');
router.get('/',index);
// 常规写法
// const homeCtl = require('../controllers/home');
// router.get('/',homeCtl.index);


module.exports = router;