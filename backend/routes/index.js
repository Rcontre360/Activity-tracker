
const {Router} = require("express");
const taskRouter = require("./taskInfo");
const userRouter = require("./userInfo");

const router = Router();

router.use("/task",taskRouter);
router.use("/user",userRouter);

module.exports = router;

