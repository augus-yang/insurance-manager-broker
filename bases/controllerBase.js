/**
 * 基础Controller
 */

const send = require('koa-send')
const multer = require('koa-multer')
const path = require('path')
const CustomError = require(path.resolve(__dirname, '../errors/customError.js'))
const logKit = require(path.resolve(__dirname, '../kits/logKit.js'))
const fileKit = require(path.resolve(__dirname, '../kits/fileKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))
const redisKit = require(path.resolve(__dirname, '../kits/redisKit.js'))
const tokenKit = require(path.resolve(__dirname, '../kits/tokenKit.js'))
const yzxKit = require(path.resolve(__dirname, '../kits/yzxKit.js'))

const captchaPrefix = 'captcha_'
const validErrorMessage = '验证失败'
const captchaErrorMessage = '验证码不正确'

/**
 * 设置上传地址以及上传文件名
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../statics/uploads'))
    },
    filename: (req, file, cb) => {
        let fileSuffix = fileKit.suffix(file.originalname)
        let name = file.fieldname + '-' + dateTimeKit.now() + '.' + fileSuffix
        cb(null, name)
    }
})

/**
 * 设置文件过滤
 * @param req
 * @param file
 * @param cb
 */
const fileFilter = (req, file, cb) => {
    let fileSuffix = fileKit.suffix(file.originalname)
    fileSuffix = fileSuffix.toLowerCase()

    if (fileSuffix !== 'jpg' && fileSuffix !== 'png'
        && fileSuffix !== 'xls' && fileSuffix !== 'xlsx'
        && fileSuffix !== 'doc' && fileSuffix !== 'docx'
        && fileSuffix !== 'ppt' && fileSuffix !== 'pptx'
        && fileSuffix !== 'txt' && fileSuffix !== 'pdf') {
        cb(new Error(fileSuffix + ' file do not allow'))
    } else {
        cb(null, true)
    }
}

/**
 * 设置上传对象
 */
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

class ControllerBase {
    /**
     * 设置路由
     */
    router() {
    }

    /**
     * 参数验证
     * @param ctx
     * @param check
     */
    valid(ctx, check) {
        check()

        if (ctx.errors) {
            logKit.error(JSON.stringify(ctx.errors) + ' ' + ctx.request.url)
            throw new CustomError(validErrorMessage)
        }
    }

    /**
     * 获取上传文件对象
     * @returns {*}
     */
    getUpload() {
        return upload
    }

    /**
     * 下载文件
     * @param ctx
     * @param fileName
     * @returns {Promise.<void>}
     */
    async download(ctx, fileName) {
        ctx.set('Content-Type', 'application/octet-stream')
        ctx.set('Content-Disposition', 'attachment;filename=' + fileName)
        await send(ctx, 'statics/uploads', {
            index: fileName
        })
    }

    /**
     * 生成验证码
     * @param mobile
     * @returns {Promise.<void>}
     */
    async generateCaptcha(mobile) {
        // 从redis中查询验证码是否存在
        let value = await redisKit.get(captchaPrefix + mobile)
        if (!value) {
            // 重新生成
            let captcha = ""
            for (let i = 0; i < 4; i++) {
                let num = Math.floor(Math.random() * 10)
                captcha += num + ''
            }

            // 验证码十分钟有效期
            redisKit.setEx(captchaPrefix + mobile, captcha, 10 * 60)
            value = captcha
        }

        // 发送验证码
        if(process.env.NODE_ENV === 'prod'){
            yzxKit.send(value, mobile)
        } else {
            console.log('captcha ' + mobile + ' ' + value)
        }
    }

    /**
     * 检验验证码
     * @param captcha
     * @param mobile
     * @returns {Promise.<void>}
     */
    async checkCaptcha(captcha, mobile) {
        let value = await redisKit.get(captchaPrefix + mobile)
        if (!value || value !== captcha) {
            throw new CustomError(captchaErrorMessage)
        }
    }

    /**
     * 设置token
     * @param openId
     * @param model
     * @returns {Promise.<void>}
     */
    async setToken(openId, model) {
        let weixin = await model.weixin.findOne({
            where: {
                openId: openId
            }
        })

        // 自动设置token
        let token = tokenKit.set({
            userId: weixin.userId
        })

        return token
    }
}

module.exports = ControllerBase
