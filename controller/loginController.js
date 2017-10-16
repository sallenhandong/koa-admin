/*
*
* 登录控制器
*
*/

const Login = require("../model/loginModel")
const config = require("../config")
const fs = require('fs-extra')
const {
  handleRequest,
  handleError,
  handleSuccess,
  handleThrottle
} = require("../utils/handle")

const jwt = require("jsonwebtoken")
const authControll = { login: {} ,admin: {}, captcha: {},register: {}}
//图片验证码
const svgCaptcha = require('svg-captcha');
//进入登录页面
authControll.login.GET = async ctx => {

	const contentText = await fs.readFile('./views/admin/login.html', 'utf-8')
		.catch(err => ctx.throw(500, '服务器内部错误'))
	ctx.body = contentText
}

//判断登录
authControll.login.POST = async ctx => {
const {
      username,
      password
    } = ctx.request.body

  const auth = await Login
    .findOne({
      username
    })
    .catch(err => ctx.throw(500, '服务器内部错误'))
  if (auth) {

    if (auth.password == password) {

      handleSuccess({
        ctx,
        message: "登录成功"
      });

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


authControll.admin.GET = async ctx => {

 // const contentText = await fs.readFile('./views/admin/index.html', 'utf-8')
 //    .catch(err => ctx.throw(500, '服务器内部错误'))
 //  ctx.body = contentText
     await ctx.render('admin/index',{username:"15591805655"})
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
//注册页面
authControll.register.GET = async ctx => {

  const contentText = await fs.readFile('./views/admin/register.html', 'utf-8')
    .catch(err => ctx.throw(500, '服务器内部错误'))
  ctx.body = contentText
}
//注册接口
authControll.register.POST = async ctx => {
    const {
      username,
      password
    } = ctx.request.body

 let newUser= new Login(
                    {
                        username:username,
                        password:password
                    }
                );
    const auth = await newUser.save()
      .catch(err => ctx.throw(500, '服务器内部错误'))
    if (auth) {

      handleSuccess({
        ctx,
        message: "注册成功"
      });
    } else {

      handleError({
        ctx,
        message: "注册失败"
      })
    }

}

exports.login = ctx => handleRequest({ ctx,controller: authControll.login})
exports.admin = ctx => handleRequest({ ctx,controller: authControll.admin})
exports.captcha = ctx => handleRequest({ ctx,controller: authControll.captcha})
exports.register = ctx => handleRequest({ ctx,controller: authControll.register})
