/**
 * 云之讯Kit
 */

const request = require('request')
const path = require('path')
const yzx = require(path.resolve(__dirname, '../configs/yzx.json'))
const logKit = require(__dirname + '/logKit.js')
const dateTimeKit = require(__dirname + '/dateTimeKit.js')
const digestKit = require(__dirname + '/digestKit.js')

module.exports = this

/**
 * 发送短信
 * @param captcha
 * @param mobile
 */
this.send = (captcha, mobile) => {
    let now = dateTimeKit.now()
    let timestamp = dateTimeKit.format(now, 'YYYYMMDDHHmmss')
    let sig = yzx.accountSid + yzx.authToken + timestamp
    let signature = digestKit.md5(sig)
    let url = yzx.url
    url = url.replace('{SoftVersion}', yzx.SoftVersion)
    url = url.replace('{accountSid}', yzx.accountSid)
    url += '?sig=' + signature.toUpperCase()

    let body = {
        'templateSMS': {
            'appId': yzx.appId,
            'param': captcha,
            'templateId': yzx.templateId,
            'to': mobile
        }
    }

    let src = yzx.accountSid + ':' + timestamp
    let auth = new Buffer(src).toString('base64')

    request({
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': auth,
            'Content-Length': body.length
        },
        json: true,
        body: body
    }, function (error, response, body) {
        if (body.resp.respCode == '000000') {
            logKit.info('短信发送成功')
        } else {
            logKit.error('短信发送失败 ' + body.resp.respCode)
        }
    })
}