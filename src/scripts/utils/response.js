class Response {
    constructor(data = null, message = null) {
        this.data = data
        this.message = message
    }

    success(res) {
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        })
    }

    created(res) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        })
    }

    error500(err, req, res, next) {
        return res.status(500).json({
            success: false,
            errorCode: 200,
            data: this.data,
            message: this.message ?? "İşlem Başarısız Server Hatası !"
        })

    }

    error400(res) {
        return res.status(400).json({
            success: false,
            errorCode: 300,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !"
        })
    }

    error401(res) {
        return res.status(401).json({
            success: false,
            errorCode: 400,
            data: this.data,
            message: this.message ?? "Lütfen Oturum Açın !"
        })
    }

    error404(res) {
        return res.status(404).json({
            success: false,
            errorCode: 500,
            data: this.data,
            message: this.message ?? "Kullanıcı Bulunamadı !"
        })
    }

    error429(res) {
        return res.status(429).json({
            success: false,
            errorCode: 600,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı !"
        })
    }

}

module.exports = Response