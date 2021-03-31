const Router = require("koa-router");
const router  = new Router();
const {index} = require('../controllers/home');
// 常规写法
//es6写法
router.get('/',index);

module.exports = router;