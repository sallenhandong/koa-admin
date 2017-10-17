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
const ueditor = require('ueditor')
const staticServer = require('koa-static');
const path = require('path');
// error handler
onerror(app)


mongodb.connect()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
app.use(staticServer(path.join(__dirname,'/dist')));

app.use(views(__dirname + '/views', {
    map: { html: 'ejs' },//html后缀使用引擎
    default: "pug"//render不提供后缀名时
}))

// logger
app.use(async (ctx, next) => {
 await next()
 console.log(ctx.status)
  if (ctx.status === 404) ctx.body = { code: 0, message: '无效的api请求'}  
})



//ueditor上传图片
// app.use("/ueditor/ue", ueditor(__dirname + 'public'), function (req, res, next) {
//   // ueditor 客户发起上传图片请求
//   if (req.query.action === 'uploadimage') {
//     var foo = req.ueditor;
//     var imgname = req.ueditor.filename;
//     var img_url = '/images/ueditor/';
//     res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//     res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
//   }
//   //  客户端发起图片列表请求
//   else if (req.query.action === 'listimage') {
//     var dir_url = '/images/ueditor/';
//     res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
//   }
//   // 客户端发起其它请求
//   else {
//     // console.log('config.json')
//     res.setHeader('Content-Type', 'application/json');
//     res.redirect('/ueditor/jsp/config.json');
//   }
// });

// routes
app.use(index.routes(), index.allowedMethods())

// start server
http.createServer(app.callback()).listen(config.APP.PORT, () => {
	console.log(`node-Koa Run！port at ${config.APP.PORT}`)
})
