var mongoose=require('mongoose');

var News = require("../model/news")
const {
  handleRequest,
  handleError,
  handleSuccess,
  handleThrottle
} = require("../utils/handle")

const authControll = { add_news: {},get_news: {},news_content: {}}

//添加新闻
authControll.add_news.POST = async ctx => {

	const {
		title,
		time,
		from,
		category,
		content
	} = ctx.request.body

	const news = new News({
		title: title,
		time: time,
		from: from,
		category: category,
		content: content
	});
	const result = await news.save()
		.catch(err => ctx.throw(500, '服务器内部错误'))
	if (result) {

		handleSuccess({
			ctx,
			message: "添加成功"
		});
	} else {

		handleError({
			ctx,
			message: "添加失败"
		})
	}


}

// 分页获取新闻
authControll.get_news.POST = async ctx => {

	let curr = ctx.request.body.curr
	const query = News.find({})
		//每页大小为10
	query.skip((curr - 1) * 10);
	query.limit(10);
	//按照id添加的顺序倒序排列
	query.sort({
		'_id': -1
	});

	//计算分页数据
	const result = await query.exec()

	console.log(result + '文章数据')
	if (result) {

		const pageArr = News.find
		if (pageArr.length % 10 > 0) {
			pages = pageArr.length / 10 + 1;
		} else {
			pages = pageArr.length / 10;
		}
		handleSuccess({
			ctx,
			result: {
				data: result,
				pages: pages
			},
			message: '列表数据获取成功!'
		})

	} else {
		handleError({
			ctx,
			message: "获取失败"
		})
	}

}
//新闻详情
authControll.news_content.POST = async ctx => {

	let id = ctx.request.body.id
	const result = await News.findOne({
			_id: id
		})
		 .catch(err => ctx.throw(500, '服务器内部错误'))
	if (result) {
		handleSuccess({
			ctx,
			result: {
				data: result.content
			},
			message: '获取成功!'
		})
		console.log(' chenggong' + result.content)

	} else {
		handleError({
			ctx,
			message: "获取失败"
		})
	console.log(' shibai')
	}


}
exports.add_news = ctx => handleRequest({ ctx,controller: authControll.add_news})
exports.get_news = ctx => handleRequest({ ctx,controller: authControll.get_news})
exports.news_content = ctx => handleRequest({ ctx,controller: authControll.news_content})



