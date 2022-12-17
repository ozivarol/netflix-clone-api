const UserService = require("../services/UserService")
const hs = require("http-status")
const uuid = require("uuid")
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper")
const ApiError = require("../scripts/utils/error");
const eventEmitter = require("../scripts/events/eventEmitter")
const Response = require("../scripts/utils/response");
const { connect_rabbitmq, add_queue } = require("../scripts/utils/rabbimqConnection")
const fs = require("fs")

class UserController {
    index(req, res) {
        setTimeout(() => {
            UserService.list().then((response) => {
                console.log(req.timedout, "Api nedir")


                res.status(hs.OK).send(response)
                console.log(response)




            })
                .catch(e => {
                    if (req.timedout === true) {
                        console.log(e)
                        throw new ApiError("Timeout", 408, 999, "index")
                    }
                    throw new ApiError("İşlem başarısız!", 401, 99, "index")
                })

        }, 2000);

    }
    async create(req, res, next) {
        console.log(req.body)

        const { email } = req.body
        const userCheck = await UserService.findOne({ email })
        if (userCheck) {
            throw new ApiError("Girmiş Olduğunuz Email Kullanımda !", 401, 100, "create")
        }

        req.body.password = passwordToHash(req.body.password)

        UserService.insert(req.body).then(create => {
            let template = fs.readFileSync(require.resolve("./email.html"), 'utf8').toString()


            try {
                connect_rabbitmq(create.email)
                add_queue(create.email)
                eventEmitter.emit("send_create_email", {

                    to: create.email,
                    subject: "Üye Kayıdı Başarı ile tamamlandı ✔",

                    html: template


                },
                )


            } catch (e) {

                return new Response(e, "Üyelik işlemi sırasında bir hata oluştu !", "create").error500(res)

            }


            return new Response(create, "Kayıt Başarıyla Eklendi", "create").created(res)


        })
            .catch(e => {
                console.log(e)
                throw new ApiError("Bir hata oluştu !", 401, 103, "create")
            })
    }
    async login(req, res) {
        const { email } = req.body
        const userControl = await UserService.findOne({ email })
        console.log(req.body.email)
        req.body.password = passwordToHash(req.body.password)
        if (userControl === null) {
            throw new ApiError(`${req.body.email}'e ait bir kullanıcı bulunamadı`, 401, 103, "login")

        }
        UserService.findOne(req.body.email)
            .then((user) => {


                if (!user) {
                    throw new ApiError(`Bir hata oluştu ${user}`, 401, 103, "login")
                }

                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateAccessToken(user),
                        refresh_token: generateRefreshToken(user),
                    }
                }
                console.log(user)
                delete user.password
                return new Response(user, "Giriş işlemi Başarılı.", "login").success(res)
            })
            .catch((e) => {
                console.log(userControl)
                return new Response(e, "Giriş işlemi başarısız", "login").error401(res)
            })

    }
    resetPassword(req, res) {
        const new_password = uuid.v4()?.split("-")[0] || `ntflx-${new Date().getTime()}`
        UserService.update({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updatedUser) => {
            if (!updatedUser) {
                return new Response(req.body.email, "Böyle bir kullanıcı bulunamadı", "resetpassword").error404(res)

            }

            eventEmitter.emit("send_email", {

                to: updatedUser.email,
                subject: "Şifre Sıfırlama ✔",

                html: `Merhaba ${updatedUser.name} Şifre sıfırlama işleminiz başarı ile gerçekleştirilmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız. <br /> Yeni Şifreniz:<b>${new_password}</b> <h1> Netflix </h1>`, // html body
            },
            )

            return new Response(updatedUser, "Şifre sıfırlama işlemi başarılı.", "resetpassword").success(res)
        })
            .catch(() => {
                throw new ApiError("Şifre sıfırlama işlemi başarısız !", 400, 104, "resetpassword")
            })

    }
    updatedUser(req, res) {
        if (!req.params?.id) {
            return res.status(hs.BAD_REQUEST).send({ msg: "ID bilgisi eksik" })
        }
        UserService.update(req.params.id, req.body).then((updatedUser) => {
            return new Response(updatedUser, "Güncelleme işlemi başarılı.", "updateUser").success(res)

        })
            .catch(() => {
                throw new ApiError("Güncelleme işlemi başarısız !", 400, 105, "updateUser")
            })
    }

    deleteUser(req, res) {
        if (!req.params?.id) {
            throw new ApiError("Girmiş Olduğunuz id parametresi bulunamadı !", 401, 108, "deleteUser")
        }
        UserService.remove(req.params?.id)
            .then((deletedUser) => {
                console.log(deletedUser)
                if (!deletedUser) {
                    return new Response("Böyle bir kullanıcı bulunamadı", "deleteUser").error404(res)
                }
                return new Response(deletedUser, "Kullanıcı silme işlemi başarılı.", "deleteUser").success(res)
            })
            .catch((e) => {
                throw new ApiError("Kullanıcı silme işlemi başarısız !", 401, 106, "deleteUser")
            })

    }

}


module.exports = new UserController()