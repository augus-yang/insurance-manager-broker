/**
 * 上传保单Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const uploadPolicyService = require(path.resolve(__dirname, '../../services/uploadPolicyService.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))
const appointmentService = require(path.resolve(__dirname, '../../services/appointmentService.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))

class uploadPolicyApi extends ControllerBase {
    router() {
        router.post('/uploadPolicy', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('policyPictureOne').notBlank()
                ctx.checkBody('policyPictureTwo').notBlank()
                ctx.checkBody('policyNumber').notBlank()
                ctx.checkBody('orderId').notBlank()
            })

            let policyPictureOne = ctx.request.body.policyPictureOne
            let policyPictureTwo = ctx.request.body.policyPictureTwo
            let policyNumber = ctx.request.body.policyNumber
            let userId = ctx.token.userId
            let orderId = ctx.request.body.orderId

            await uploadPolicyService.create(policyPictureOne, policyPictureTwo, userId, orderId, policyNumber)


            ctx.api.success()
        })

        router.get('/uploadPolicy/findAllStatus', async(ctx) => {

            let userId = ctx.token.userId
            let status = constantKit.getOrderStatusType()[9]
            let orderList = await orderService.findByUserIdStatus(userId, status)
            if(orderList){
                let uploadList = []
                for(let i in orderList){
                    let aa = orderList[i]
                    let appointment = await appointmentService.findByOrderId(aa.id)
                    let upload = await uploadPolicyService.findByOrderId(aa.id)
                    if(appointment && appointment.status === constantKit.getStatusType()[1]){
                        if(upload.length == 0){
                            uploadList.push(aa)
                        }
                    }

                }
                ctx.api.success({
                    orderList: uploadList
                })
            }else {
                uploadPolicyService.throwMessage('没有可上传保单')
            }

        })

        return router
    }
}

module.exports = new uploadPolicyApi().router()