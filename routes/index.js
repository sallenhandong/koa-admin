// 路由管理

const config = require('../config')
const controller = require('../controller')
const authIsVerified = require('../utils/auth')
const Router = require('koa-router')

const router = new Router({
	// prefix: config.APP.ROOT_PATH
})


// Api
router

		.all('/login', controller.login.login) // 登录
		.get('/admin',controller.login.admin)
		.all('/register',controller.login.register)
		.post('/add_news',controller.admin.add_news)
		.post('/get_news',controller.admin.get_news)
		.post('/news_content',controller.admin.news_content)
		.get('/',controller.website.index)




module.exports = router;
