const { Router } = require("express");
const router = Router();
// import all routers;
const empresaRouter = require("./empresaRouter");
const authRouter = require("./authRouter.js");
const userRouter = require("./userRouter");
const loteRouter = require("./loteRouter");

const stockRouter = require('./stockRouter')
const tareaRouter = require('./tareaRouter')
const transporteRouter = require("./transporteRouter");


const premiumRouter = require("./premiumRouter");

router.use("/empresa", empresaRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/transporte", transporteRouter)
router.use("/tareas", tareaRouter);
router.use("/lote", loteRouter);
router.use("/stock", stockRouter);
router.use("/tareas", tareaRouter);
router.use("/premium", premiumRouter); // Mercado pago

module.exports = router;
