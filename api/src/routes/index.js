const { Router } = require("express");
// import all routers;
const empresaRouter = require("./empresaRouter");
const authRouter = require("./authRouter.js");
const userRouter = require('./userRouter')
const router = Router();

router.use("/empresa", empresaRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);


module.exports = router;
