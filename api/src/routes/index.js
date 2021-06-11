const { Router } = require('express');
// import all routers;
const createEmpresa = require('./createEmpresa')
const deleteEmpresa = require('./deleteEmpresa')
const getEmpresa = require('./getEmpresa')
const authRouter = require('./authRouter.js');


const router = Router();

router.use('/createEmpresa', createEmpresa)
router.use('/deleteEmpresa', deleteEmpresa)
router.use('/getEmpresa', getEmpresa)


// load each router on a route

router.use('/auth', authRouter);


module.exports = router;
