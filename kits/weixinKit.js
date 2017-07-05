/**
 * 微信Kit
 */

const nwo = require('node-weixin-oauth')
const nwu = require('node-weixin-user')
const nws = require('node-weixin-settings')
const nwj = require('node-weixin-jssdk')
const nwm = require('node-weixin-media')
const path = require('path')
const weixin = require(path.resolve(__dirname, '../configs') + "/" + process.env.NODE_ENV + '/weixin.json')
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

// appid and appsecret
const app = {
    id: weixin.appid,
    secret: weixin.appsecret
}

module.exports = this

/**
 * 生成回调地址
 * @param redirectUri
 * @returns {*}
 */
this.createURL = (redirectUri) => {
    return nwo.createURL(app.id, redirectUri, '', 1)
}

/**
 * 获取openId
 * @param code
 * @returns {Promise}
 */
this.getOpenId = async(code) => {
    return await new Promise(function (resolve, reject) {
        nwo.success(app, code, (error, body) => {
            if (!error) {
                let openId = body.openid
                let accessToken = body.access_token
                resolve({
                    openId: openId,
                    accessToken: accessToken
                })
            } else {
                reject('获取openId失败 ' + code)
            }
        })
    })
}

/**
 * 获取用户信息
 * @param openId
 * @param accessToken
 * @returns {Promise}
 */
this.getUser = async(openId, accessToken) => {
    return await new Promise(function (resolve, reject) {
        nwo.profile(openId, accessToken, function (error, body) {
            if (!error) {
                resolve({
                    user: body
                })
            } else {
                reject('获取用户信息失败 ' + openId)
            }
        })
    })
}

/**
 * 判断用户是否关注
 * @param openId
 * @returns {Promise.<*>}
 */
this.isFollow = async(openId) => {
    let data = await new Promise(function (resolve, reject) {
        nwu.list(nws, app, null, function (error, data) {
            if (!error) {
                resolve({
                    followList: data.data.openid
                })
            } else {
                reject('获取关注用户列表失败')
            }
        })
    })

    let isFollow = false
    for(let i in data.followList) {
        let follow = data.followList[i]
        if(follow === openId) {
            isFollow = true
            break
        }
    }

    return isFollow
}

/**
 * 获取jssdk
 * @param url
 * @returns {Promise.<*>}
 */
this.jssdk = async(url) => {
    return await new Promise(function (resolve, reject) {
        nwj.prepare(nws, app, url, function (error, json) {
            if (!error) {
                resolve(json)
            } else {
                reject('获取jssdk失败 ' + url)
            }
        })
    })
}

/**
 * 获取临时多媒体
 * @param mediaId
 * @param opts
 * @returns {Promise.<*>}
 */
this.getTemporaryMedia = async(mediaId, opts) => {
    opts = opts || {}
    let suffix = opts.suffix || 'jpg'
    let fileName = 'weixin-' + dateTimeKit.now() + '.' + suffix
    let file = path.resolve(__dirname, "../statics/uploads/" + fileName)
    return await new Promise(function (resolve, reject) {
        nwm.temporary.get(nws, app, mediaId, file, function (error) {
            if (!error) {
                resolve(fileName)
            } else {
                reject('获取临时多媒体 ' + mediaId)
            }
        })
    })
}