const Router = require("express").Router;
const UserController = require("../controllers/UserController");

const router = Router();

router.post("/api/user/register", UserController.register);
router.post("/api/user/login", UserController.login);
router.post("/api/user/verify", UserController.verify);

module.exports = router;
