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




module.exports = router;
