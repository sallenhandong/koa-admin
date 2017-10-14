/*
*
* 登录控制器
*
*/

const Login = require("../model/loginModel")
const config = require("../config")
const {
  handleRequest,
  handleError,
  handleSuccess,
  handleThrottle
} = require("../utils/handle")

const jwt = require("jsonwebtoken")
const authControll = { login: {} }

//登录
authControll.login.POST = async ctx => {
	const {
		username,
		password
	} = ctx.request.body

	console.log(username + "username");

	const auth = await Login
				.findOne({username})
				.catch(err=> ctx.throw(500,'服务器内部错误'))

	if (auth) {

		if (auth.password == password) {

			handleSuccess({
				ctx,
				result: {
					token: "123123"
				},
				message: "登录成功"
			})


		} else {
			handleError({
				ctx,
				message: "密码错误"
			})

		}

	} else {

		handleError({
			ctx,
			message: "账号不存在"
		})
	}

}


exports.login = ctx => handleRequest({ ctx,controller: authControll.login})

