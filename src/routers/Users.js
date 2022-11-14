const router = require("express").Router()
const UserController = require("../controllers/UsersController")
const authValidation = require("../validations/Users")
const validate = require("../middlewares/validate")
const authenticate = require("../middlewares/authenticate");


router.post("/register", authValidation.register, UserController.create);
router.post("/login", authValidation.login, UserController.login);
router.post("/reset-password", authValidation.ResetPassword, UserController.resetPassword);
router.delete("/delete/:id", UserController.deleteUser)
router.patch("/update/:id", authenticate, authValidation.UpdateUser, UserController.updatedUser);







module.exports = router;