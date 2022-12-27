const joi = require("joi")
const ApiError = require("../scripts/utils/error")

class AuthValidation {
    constructor() { /* TODO document why this constructor is empty */ }
    static register = async (req, res, next) => {


        try {

            await joi.object({
                first_name: joi.string().trim().regex(/^[A-Za-zğüşöçĞÜŞÖÇ]+$/).min(3).max(100).required().messages({
                    "string.base": "Lütfen geçerli bir isim giriniz",
                    "string.empty": "İsim Alanı Boş Olamaz !",
                    "string.pattern.base": "Lütfen sadece harflerden oluşan bir isim giriniz",
                    "string.min": "İsim Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.max": "İsim Alanı En Fazla 100 Karakterden Oluşabilir",
                    "any.required": "İsim Alanı Zorunludur",


                }),
                last_name: joi.string().trim().regex(/^[A-Za-zğüşöçĞÜŞÖÇ]+$/).min(3).max(100).required().messages({
                    "string.base": "Soyad Alanı Normal Metin Olmalıdır",
                    "string.empty": "Soyad Alanı Boş Olamaz !",
                    "string.pattern.base": "Lütfen sadece harflerden oluşan bir soyisim giriniz",
                    "string.min": "Soyad Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.max": "Soyad Alanı En Fazla 100 Karakterden Oluşabilir",
                    "any.required": "Soyad Alanı Zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empty": "Email Alanı Boş Olamaz !",
                    "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "Email Alanı Zorunludur"
                }),
                password: joi.string().trim().regex(/^(?=.*[A-Z])(?=.*[^a-zA-Z\s])/).min(8).max(36).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz !",
                    "string.pattern.base": "Lütfen ilk harf büyük harf olacak şekilde ve en az bir tane noktalama işareti içeren bir şifre giriniz",
                    "string.min": "Şifre Alanı Ez Az 8 Karakter Olmalıdır",
                    "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
                    "string.required": "Şifre Alanı Zorunludur"
                }),
                verify: joi.boolean().default(false)
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new ApiError(error.details[0].message, 400)
            else throw new ApiError("Lütfen Validasyon Kullarına Uyun", 400)
        }
        next()
    }

    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email Alanı Boş Olamaz !",
                    "string.empty": "Email Alanı Boş Olamaz !",
                    "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "Email Alanı Zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre alanı boş bırakılamaz",
                    "string.empty": "Şifre Alanı Boş Olamaz !",
                    "string.min": "Şifre Alanı Ez Az 6 Karakter Olmalıdır",
                    "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
                    "string.required": "Şifre Alanı Zorunludur"
                })
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new ApiError(error.details[0].message, 400)
            else throw new ApiError("Lütfen Validasyon Kullarına Uyun", 400)
        }
        next();
    }
    static ResetPassword = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empty": "Email Alanı Boş Olamaz !",
                    "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "Email Alanı Zorunludur"
                })

            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new ApiError(error.details[0].message, 400)
            else throw new ApiError("Lütfen Validasyon Kullarına Uyun", 400)
        }
        next();
    }
    static UpdateUser = async (req, res, next) => {
        try {

            await joi.object({
                first_name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "İsim Alanı Normal Metin Olmalıdır",
                    "string.empty": "İsim Alanı Boş Olamaz !",
                    "string.min": "İsim Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.max": "İsim Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "İsim Alanı Zorunludur"
                }),
                last_name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "Soyad Alanı Normal Metin Olmalıdır",
                    "string.empty": "Soyad Alanı Boş Olamaz !",
                    "string.min": "Soyad Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.max": "Soyad Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "Soyad Alanı Zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empty": "Email Alanı Boş Olamaz !",
                    "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
                    "string.required": "Email Alanı Zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz !",
                    "string.min": "Şifre Alanı Ez Az 6 Karakter Olmalıdır",
                    "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
                    "string.required": "Şifre Alanı Zorunludur"
                }),
                verify: joi.boolean().default(false)
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new ApiError(error.details[0].message, 400)
            else throw new ApiError("Lütfen Validasyon Kullarına Uyun", 400)
        }
        next()
    }

}

module.exports = AuthValidation