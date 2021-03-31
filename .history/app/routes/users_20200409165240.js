const Router = require("koa-router");
const router  = new Router({prefix: '/users'});
const { find, finById, create, update, delete:del}  =require('../controllers/users')
router.get('/',find);

router.post('/',(ctx)=>{
   
});

router.get('/:id',(ctx)=>{
   
});

router.put('/:id',(ctx)=>{
   
});

router.delete('/:id',(ctx)=>{
  
});
module.exports = router;