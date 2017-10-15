/*
*
* 登录控制器
*
*/

const Login = require("../model/loginModel")
const config = require("../config")
const fs = require('fs.promised')
const {
  handleRequest,
  handleError,
  handleSuccess,
  handleThrottle
} = require("../utils/handle")

const jwt = require("jsonwebtoken")
const authControll = { login: {} ,admin: {}, captcha: {}}
//图片验证码
const svgCaptcha = require('svg-captcha');
//登录
// authControll.login.POST = async ctx => {
// 	const {
// 		username,
// 		password
// 	} = ctx.request.body

// 	console.log(username + "username");

// 	const auth = await Login
// 				.findOne({username})
// 				.catch(err=> ctx.throw(500,'服务器内部错误'))

// 	if (auth) {

// 		if (auth.password == password) {

// 			handleSuccess({
// 				ctx,
// 				result: {
// 					token: "123123"
// 				},
// 				message: "登录成功"
// 			})


// 		} else {
// 			handleError({
// 				ctx,
// 				message: "密码错误"
// 			})

// 		}

// 	} else {

// 		handleError({
// 			ctx,
// 			message: "账号不存在"
// 		})
// 	}

// }
//进入登录页面
authControll.login.GET = async ctx => {

	const contentText = await fs.readFile('./views/admin/login.html', 'utf-8')
		.catch(err => ctx.throw(500, '服务器内部错误'))
	ctx.body = contentText
}


authControll.admin.GET = async ctx => {

	// let isSuper = '普通管理员'
	// if (ctx.session.user.status === '2') {
	// 	isSuper = '超级管理员'
	// }
	// ctx.body('admin/index', {
	// 	username: ctx.session.user.username,
	// 	isSuper: isSuper
	// });
	const contentText = await fs.readFile('./views/admin/index.html', 'utf-8')
		.catch(err => ctx.throw(500, '服务器内部错误'))
	ctx.body = contentText
};

authControll.captcha.GET = async ctx =>{

  const captcha = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#c4c4c5' // background color of the svg image
  });
  //将生成的验证码放在session中
  ctx.session.captcha = captcha.text;
  console.log( ctx.session.captcha);
  ctx.set('Content-Type', 'image/svg+xml');
  ctx.status(200).send(captcha.data);

}
exports.login = ctx => handleRequest({ ctx,controller: authControll.login})
exports.admin = ctx => handleRequest({ ctx,controller: authControll.admin})
exports.captcha = ctx => handleRequest({ ctx,controller: authControll.captcha})