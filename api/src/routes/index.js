const { Router } = require('express');
// import all routers;

const authRouter = require('./authRouter.js');


const router = Router();

// load each router on a route

router.use('/auth', authRouter);


module.exports = router;
