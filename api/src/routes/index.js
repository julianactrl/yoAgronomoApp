const { Router } = require('express');
// import all routers;

const userRouter = require('./userRouter.js');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

// router.use('/users', userRouter);


module.exports = router;
