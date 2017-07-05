/**
 * 最新信息Service
 */

const path = require('path')
const news = require(path.resolve(__dirname, '../models/news.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class newsService extends ServiceBase {
    /**
     * 创建
     * @param total
     * @param content
     * @param mobile
     * @param name
     * @param sender
     * @param fileName
     * @returns {Promise.<void>}
     */
    async create(total, content, mobile, name, sender, fileName) {

        // 根据手机号查询用户
        let user = await super.getAllModel().user.findOne({
            where: {
                mobile: mobile
            }
        })

        if(!user){
            super.throwMessage('用户不存在')
        }

            await news.create({
                total: total,
                content: content,
                sender: sender,
                receiver: user.id,
                status: false,
                enclosure: {
                    name: name,
                    downLoadAddress: fileName
                }

            }, {
                include: {
                    model: super.getAllModel().enclosure
                }
            })
    }

    /**
     * 根据userId查询
     * @param userId
     * @returns {Promise.<Promise.<*>|*>}
     */
    async findByUserId(userId) {
        return await news.findAll({
            order: 'createdAt desc',
            where: {
                receiver: userId
            }
        })
    }

}

module.exports = new newsService(news)