/**
 * 订单Controller
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const orderService = require(path.resolve(__dirname, '../services/orderService.js'))
const programmeService = require(path.resolve(__dirname, '../services/programmeService.js'))
const insuranceOrderService = require(path.resolve(__dirname, '../services/insuranceOrderService.js'))
const beneficiaryService = require(path.resolve(__dirname, '../services/beneficiaryService.js'))
const uploadPolicyService = require(path.resolve(__dirname, '../services/uploadPolicyService.js'))
const appointmentService = require(path.resolve(__dirname, '../services/appointmentService.js'))
const supplementService = require(path.resolve(__dirname, '../services/supplementService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/order/page', async(ctx) => {
            ctx.controller.success('order/page')
        })

        router.get('/order/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let beneficiaryList = []
            let order = await orderService.findById(id)
            let programme = await programmeService.findByOrderId(id)
            let insuranceOrder = await insuranceOrderService.findByOrderId(id)
            let supplementList = await supplementService.findByOrderId(id)

            if(insuranceOrder){
                beneficiaryList = await beneficiaryService.findByInsuranceOrderId(insuranceOrder.id)
            }

            let uploadPolicyList = await uploadPolicyService.findByOrderId(id)
            let appointment = await appointmentService.findByOrderId(id)

            ctx.controller.success('order/detail', {
                order: order,
                programme: programme,
                appointment: appointment,
                insuranceOrder: insuranceOrder,
                beneficiaryList: beneficiaryList,
                uploadPolicyList: uploadPolicyList,
                supplementList: supplementList
            })
        })

        router.get('/order/update/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await orderService.findById(id)

            let list = await constantKit.getOrderStatusType()

            ctx.controller.success('order/update', {
                bean: bean,
                list: list
            })
        })

        return router
    }
}

module.exports = new Controller().router()