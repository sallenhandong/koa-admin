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

		.get('/login', controller.login.login) // 登录
		.get('/admin',controller.login.admin)

// // music
// app.get('/music/pic/:pic_id', controller.music.pic);
// app.get('/music/lrc/:song_id', controller.music.lrc);
// app.get('/music/url/:song_id', controller.music.url);
// app.get('/music/song/:song_id', controller.music.song);
// app.get('/music/list/:play_list_id', controller.music.list);


// // 评论
// app.all('/comment', controller.comment.list);
// app.all('/comment/:comment_id', controller.comment.item);


module.exports = router;
