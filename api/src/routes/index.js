const { Router } = require('express');
// import all routers;
const empresaRouter = require('./empresaRouter')
const authRouter = require('./authRouter.js');


const router = Router();

router.use('/empresa', empresaRouter)
router.use('/auth', authRouter);


// load each router on a route



module.exports = router;
