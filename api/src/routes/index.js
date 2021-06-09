const { Router } = require('express');
// import all routers;
const createUser = require('./createUser')
const createEmpresa = require('./createEmpresa')

const router = Router();

router.use('/createUser', createUser)
router.use('/createEmpresa', createEmpresa)
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

// router.use('/users', userRouter);


module.exports = router;
