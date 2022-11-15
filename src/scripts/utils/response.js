const logger = require("../logger/info")
const InfoService = require("../../services/InfoService")
class Response {
    constructor(data = null, message = null) {
        this.data = data
        this.message = message
    }

    success(res) {
        logger.log({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı"
            },
        })
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        })
    }

    created(res) {
        logger.log({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı"
            },
        })

        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        })
    }

    error500(err, req, res, next) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız Server Hatası !"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız Server Hatası !"
            },
        })
        return res.status(500).json({
            success: false,
            errorCode: 200,
            data: this.data,
            message: this.message ?? "İşlem Başarısız Server Hatası !"
        })

    }

    error400(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız !"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız !"
            },
        })
        return res.status(400).json({

            success: false,
            errorCode: 300,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !"
        })
    }

    error401(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Lütfen Oturum Açın !"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Lütfen Oturum Açın !"
            },
        })
        return res.status(401).json({
            success: false,
            errorCode: 400,
            data: this.data,
            message: this.message ?? "Lütfen Oturum Açın !"
        })
    }

    error404(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Kullanıcı Bulunamadı !"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Kullanıcı Bulunamadı !"
            },
        })
        return res.status(404).json({
            success: false,
            errorCode: 500,
            data: this.data,
            message: this.message ?? "Kullanıcı Bulunamadı !"
        })
    }

    error429(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Çok Fazla İstek Atıldı !"
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Çok Fazla İstek Atıldı !"
            },
        })
        return res.status(429).json({
            success: false,
            errorCode: 600,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı !"
        })
    }

}

module.exports = Response