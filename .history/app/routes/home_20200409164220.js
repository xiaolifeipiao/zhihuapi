const Router = require("koa-router");
const router  = new Router();
const {index} = require('../controllers/home');
/es6写法
router.get('/',index);
// 常规写法

/

module.exports = router;