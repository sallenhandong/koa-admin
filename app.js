const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const http = require('http')
const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./config')
const mongodb = require('./mongodb')
// error handler
onerror(app)


mongodb.connect()



// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
 await next()
  if (ctx.status === 404) ctx.body = { code: 0, message: '无效的api请求'}  
})

// routes
app.use(index.routes(), index.allowedMethods())

// start server
http.createServer(app.callback()).listen(config.APP.PORT, () => {
	console.log(`node-Koa Run！port at ${config.APP.PORT}`)
})
