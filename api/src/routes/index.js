const { Router } = require("express");
// import all routers;
const empresaRouter = require("./empresaRouter");
const authRouter = require("./authRouter.js");
const loteRouter = require("./loteRouter");

const router = Router();

router.use("/empresa", empresaRouter);
router.use("/auth", authRouter);
router.use("/lote",loteRouter)

module.exports = router;
