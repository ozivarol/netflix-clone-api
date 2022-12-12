const router = require("express").Router()
const UserController = require("../controllers/UsersController")
const AuthValidation = require("../validations/Users")
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");

router.get("/list", authenticate, UserController.index)
router.post("/register", AuthValidation.register, UserController.create);
router.post("/login", AuthValidation.login, UserController.login);
router.post("/reset-password", AuthValidation.ResetPassword, UserController.resetPassword);
router.delete("/delete/:id", idChecker, UserController.deleteUser)
router.patch("/update/:id", authenticate, AuthValidation.UpdateUser, UserController.updatedUser);







module.exports = router;