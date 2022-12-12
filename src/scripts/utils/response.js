const logger = require("../logger/info")
const InfoService = require("../../services/InfoService")
class Response {
    constructor(data = null, message = null, methodName = null) {
        this.data = data
        this.message = message
        this.methodName = methodName
    }

    success(res) {
        logger.log({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı",
                methodName: this.methodName
            },
        })
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı",
            methodName: this.methodName
        })
    }

    created(res) {
        logger.log({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: true,
                data: this.data,
                message: this.message ?? "İşlem Başarılı",
                methodName: this.methodName
            },
        })

        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı",
            methodName: this.methodName
        })
    }

    error500(err, req, res, next) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız Server Hatası !",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız Server Hatası !",
                methodName: this.methodName
            },
        })
        return res.status(500).json({
            success: false,
            responseCode: 200,
            data: this.data,
            message: this.message ?? "İşlem Başarısız Server Hatası !",
            methodName: this.methodName
        })

    }

    error400(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız !",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "İşlem Başarısız !",
                methodName: this.methodName
            },
        })
        return res.status(400).json({

            success: false,
            responseCode: 300,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !",
            methodName: this.methodName
        })
    }

    error401(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Lütfen Oturum Açın !",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Lütfen Oturum Açın !",
                methodName: this.methodName
            },
        })
        return res.status(401).json({
            success: false,
            responseCode: 400,
            data: this.data,
            message: this.message ?? "Lütfen Oturum Açın !",
            methodName: this.methodName
        })
    }

    error404(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Kullanıcı Bulunamadı !",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Kullanıcı Bulunamadı !",
                methodName: this.methodName
            },
        })
        return res.status(404).json({
            success: false,
            responseCode: 500,
            data: this.data,
            message: this.message ?? "Kullanıcı Bulunamadı !",
            methodName: this.methodName
        })
    }

    error429(res) {
        logger.log({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Çok Fazla İstek Atıldı !",
                methodName: this.methodName
            },
        });
        InfoService.insert({
            level: "info",
            message: {
                success: false,
                data: this.data,
                message: this.message ?? "Çok Fazla İstek Atıldı !",
                methodName: this.methodName
            },
        })
        return res.status(429).json({
            success: false,
            responseCode: 600,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı !",
            methodName: this.methodName
        })
    }

}

module.exports = Response