const router = require("express").Router()
const UserController = require("../controllers/UsersController")
const AuthValidation = require("../validations/Users")
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const timeout = require('connect-timeout')

router.get("/list", timeout('3.5s'), UserController.index)
router.post("/register", timeout('4s'), AuthValidation.register, UserController.create)
router.post("/login", AuthValidation.login, UserController.login);
router.post("/reset-password", timeout('4s'), AuthValidation.ResetPassword, UserController.resetPassword);
router.delete("/delete/:email", timeout('4s'), UserController.deleteUser)
router.patch("/update/:id", timeout('4s'), authenticate, AuthValidation.UpdateUser, UserController.updatedUser);
router.get("/profile/:email", UserController.profile)






module.exports = router;