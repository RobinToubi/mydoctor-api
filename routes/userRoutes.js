const Router = require("express").Router;
const UserController = require("../controllers/UserController");

const router = Router();

router.post("/api/users/register", UserController.register);
router.post("/api/users/login", UserController.login);
router.post("/api/users/verify", UserController.verify);

module.exports = router;
