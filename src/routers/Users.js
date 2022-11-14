const router = require("express").Router()
const UserController = require("../controllers/UsersController")
const authValidation = require("../validations/Users")
const validate = require("../middlewares/validate")
const authenticate = require("../middlewares/authenticate");


router.post("/register", authValidation.register, UserController.create);
//router.route("/login").post(validate(schemas.loginValidation, "body"), UserController.login);
//router.route("/reset-password").post(validate(schemas.resetPasswordValidation), UserController.resetPassword);
//router.route("/:id").delete(UserController.deleteUser)
//router.route("/:id").patch(authenticate, validate(schemas.updateUser, "body"), UserController.updatedUser);
//router.route("/change-password").post(authenticate, validate(schemas.changePassword), UserController.changePassword)






module.exports = router;