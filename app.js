const Koa = require('koa')
const cors = require('kcors')
const session = require('koa-session');
const favicon = require('koa-favicon')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const validate = require('koa-validate')
const logMiddleware = require(__dirname + '/middlewares/logMiddleware.js')
const apiMiddleware = require(__dirname + '/middlewares/apiMiddleware.js')
const dtbMiddleware = require(__dirname + '/middlewares/dtbMiddleware.js')
const controllerMiddleware = require(__dirname + '/middlewares/controllerMiddleware.js')
const unLoginMiddleware = require(__dirname + '/middlewares/unLoginMiddleware.js')
const unTokenMiddleware = require(__dirname + '/middlewares/unTokenMiddleware.js')
const routerMiddleware = require(__dirname + '/middlewares/routerMiddleware.js')

const app = new Koa()

app.keys = ['login session key']

app.use(cors())
app.use(session(app))
app.use(favicon(__dirname + '/statics/favicon.png'))
app.use(serve(__dirname + '/statics'))
app.use(bodyParser())
validate(app)
app.use(logMiddleware.start())
app.use(apiMiddleware())
app.use(dtbMiddleware())
app.use(controllerMiddleware())
app.use(unLoginMiddleware())
app.use(unTokenMiddleware())
app.use(routerMiddleware())

// 在端口3000监听:
app.listen(3000)
logMiddleware.end()