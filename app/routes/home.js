const Router = require("koa-router");
const router  = new Router();
//es6写法
const {index,upload} = require('../controllers/home');
router.get('/',index);
// 常规写法
// const homeCtl = require('../controllers/home');
// router.get('/',homeCtl.index);

// 上传图片
router.post('/upload',upload);

module.exports = router;