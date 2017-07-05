/**
 * 预约赴港Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))
const insuranceOrderService = require(path.resolve(__dirname, '../../services/insuranceOrderService.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const appointmentService = require(path.resolve(__dirname, '../../services/appointmentService.js'))

class AppointmentApi extends ControllerBase {
    router() {
        router.post('/appointment', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('flightNumber').notBlank()
                ctx.checkBody('peoples').notBlank()
                ctx.checkBody('flightDate').notBlank()
                ctx.checkBody('whetherOpenAccount').notBlank()
                ctx.checkBody('flightImg').notBlank()
                ctx.checkBody('orderId').notBlank()
            })

            let flightNumber = ctx.request.body.flightNumber
            let peoples = ctx.request.body.peoples
            let flightDate = ctx.request.body.flightDate
            let whetherOpenAccount = ctx.request.body.whetherOpenAccount
            let openAccountType = ctx.request.body.openAccountType || ''
            let openAccountBank = ctx.request.body.openAccountBank || ''
            let flightImg = ctx.request.body.flightImg
            let flightImgTwo = ctx.request.body.flightImgTwo || ''
            let userId = ctx.token.userId
            let orderId = ctx.request.body.orderId

            let date = {}

            if (whetherOpenAccount == false) {
                date = {
                    flightNumber: flightNumber,
                    peoples: peoples,
                    flightDate: flightDate,
                    whetherOpenAccount: whetherOpenAccount,
                    openAccountType: null,
                    openAccountBank: '',
                    flightImg: flightImg,
                    flightImgTwo: '',
                    status: constantKit.getStatusType()[0],
                    userId: userId,
                    orderId: orderId
                }
            } else {
                date = {
                    flightNumber: flightNumber,
                    peoples: peoples,
                    flightDate: flightDate,
                    whetherOpenAccount: whetherOpenAccount,
                    openAccountType: openAccountType,
                    openAccountBank: openAccountBank,
                    flightImg: flightImg,
                    flightImgTwo: flightImgTwo,
                    status: constantKit.getStatusType()[0],
                    userId: userId,
                    orderId: orderId
                }
            }


            await appointmentService.create(date)

            ctx.api.success()
        })

        router.get('/appointment/find', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('orderId').notBlank()
            })

            let orderId = ctx.request.query.orderId
            let appointment= await appointmentService.findByOrderId(orderId)

            ctx.api.success({
                appointment: appointment
            })
        })

        router.get('/appointment/findAll', async(ctx) => {

            let userId = ctx.token.userId
            let appointmentList= await appointmentService.findByUserId(userId)

            ctx.api.success({
                appointmentList: appointmentList
            })
        })

        router.get('/appointment/findAllStatus', async(ctx) => {

            let userId = ctx.token.userId
            let status = constantKit.getOrderStatusType()[4]
            let orderList= await orderService.findByUserIdOrder(userId, status)

            let list = []
            for(let i in orderList){
                let aa = orderList[i]
                let insuranceOrder = await insuranceOrderService.findByOrderId(aa.id)
                if(insuranceOrder.status === constantKit.getStatusType()[1]){
                    if(!aa.appointment){
                        list.push(aa)
                    }
                }

            }

            ctx.api.success({
                orderList: list
            })
        })

        return router
    }
}

module.exports = new AppointmentApi().router()