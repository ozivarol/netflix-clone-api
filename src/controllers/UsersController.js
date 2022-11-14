const UserService = require("../services/UserService")
const hs = require("http-status")
const uuid = require("uuid")
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper")
const ApiError = require("../error/ApiError");
const eventEmitter = require("../scripts/events/eventEmitter")
const Response = require("../scripts/utils/response");


class UserController {
    index(req, res) {
        UserService.list().then((response) => {
            res.status(hs.OK).send(response)
            console.log(response)

        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    create(req, res, next) {
        req.body.password = passwordToHash(req.body.password)

        UserService.insert(req.body).then(create => {

            try {
                eventEmitter.emit("send_create_email", {

                    to: create.email,
                    subject: "Üye Kayıdı Başarı ile tamamlandı ✔",

                    html: `Merhaba ${create.name} Üyelik işleminiz başarı ile gerçekleştirilmiştir. <br /> Netflix'in taklidi değiliz sadece netflix daha iyiyiz 🥳🥳. <h1 class="red"> Netflix </h1>`,
                    amp: `<!doctype html>
                    <html ⚡4email>
                      <head>
                        <meta charset="utf-8">
                        <style amp4email-boilerplate>body{visibility:hidden}</style>
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                      </head>
                      <body>
                        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                        <p>GIF (requires "amp-anim" script in header):<br/>
                          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                      </body>
                    </html>`

                },
                )


            } catch (e) {
                res.status(hs.BAD_REQUEST).send({ msg: e })

            }


            return new Response(create, "Kayıt Başarıyla Eklendi").created(res)


        })
            .catch(e => {
                res.status(hs.BAD_REQUEST).send({ msg: e })
            })
    }
    login(req, res) {
        req.body.password = passwordToHash(req.body.password)
        UserService.findOne(req.body)
            .then((user) => {
                if (!user) { return res.status(hs.NOT_FOUND).send({ message: "BÖYLE BİR KULLANICI YOK" }) }

                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateAccessToken(user),
                        refresh_token: generateRefreshToken(user),
                    }
                }
                console.log(user)
                delete user.password
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Giriş işlemi başarılı",
                    user
                })
            })
            .catch((e) => next(new ApiError(e?.message)))

    }
    resetPassword(req, res) {
        const new_password = uuid.v4()?.split("-")[0] || `ntflx-${new Date().getTime()}`
        UserService.update({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updatedUser) => {
            if (!updatedUser) {
                return next(new ApiError(e?.message))

            }

            eventEmitter.emit("send_email", {

                to: updatedUser.email,
                subject: "Şifre Sıfırlama ✔",

                html: `Merhaba ${updatedUser.name} Şifre sıfırlama işleminiz başarı ile gerçekleştirilmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız. <br /> Yeni Şifreniz:<b>${new_password}</b> <h1> Netflix </h1>`, // html body
            },
            )

            res.status(hs.OK).send({
                code: 0,
                msg: "E-posta başarı ile gönderildi.",
                updatedUser
            })
        })
            .catch(() => {
                next(new ApiError(e?.message))
            })

    }
    updatedUser(req, res) {
        if (!req.params?.id) {
            return res.status(hs.BAD_REQUEST).send({ msg: "ID bilgisi eksik" })
        }
        UserService.update(req.params.id, req.body).then((updatedUser) => {
            res.status(hs.OK).send({
                code: 0,
                msg: "Güncelleme işlemi başarılı.",
                updatedUser
            })
            console.log("user güncellendi")
        })
            .catch(() => {
                next(new ApiError(e?.message))
            })
    }

    deleteUser(req, res) {
        if (!req.params?.id) {
            return res.status(hs.BAD_REQUEST).send({ message: "ID bilgisi eksik" });
        }
        UserService.remove(req.params?.id)
            .then((deletedUser) => {
                console.log(deletedUser)
                if (!deletedUser) {
                    return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." })
                }
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Silme işlemi başarılı.",
                    deletedUser
                });
            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })

    }
    changePassword(req, res) {
        req.body.password = passwordToHash(req.body.password)
        UserService.updateDoc({ _id: req.user?._doc?._id }, req.body)
            .then((update) => {
                console.log(req.user._doc._id)
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Şifre değiştirme başarılı",
                    update
                })
            })
            .catch((e) => next(new ApiError(e?.message)))
    }


}


module.exports = new UserController()