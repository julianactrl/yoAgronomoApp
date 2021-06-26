const { Router } = require("express");
// import all routers;
const empresaRouter = require("./empresaRouter");
const authRouter = require("./authRouter.js");
const userRouter = require('./userRouter')
const loteRouter = require("./loteRouter");
<<<<<<< HEAD
const mercadoPagoRouter = require('./mercadoPagoRouter');
const transporteRouter = require("./transporteRouter");
=======
const mercadoPagoRouter = require('./mercadoPagoRouter')
const stockRouter = require('./stockRouter')
const tareaRouter = require('./tareaRouter')
>>>>>>> dev

const router = Router();

router.use("/empresa", empresaRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/lote",loteRouter);
router.use("/premium/checkout",mercadoPagoRouter)
<<<<<<< HEAD
router.use("/transporte", transporteRouter)
=======
router.use("/stock",stockRouter)
router.use("/tareas", tareaRouter);
>>>>>>> dev

module.exports = router;
