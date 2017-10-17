
const fs = require('fs-extra')
const {
  handleRequest,
  handleError,
  handleSuccess,
  handleThrottle
} = require("../utils/handle")

const authControll = { index: {}}

//首页
authControll.index.GET = async ctx => {

	const contentText = await fs.readFile('./index.html', 'utf-8')
		.catch(err => ctx.throw(500, '服务器内部错误'))
	ctx.body = contentText

}

exports.index = ctx => handleRequest({ ctx,controller: authControll.index})