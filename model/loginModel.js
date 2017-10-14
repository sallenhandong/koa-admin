/*
*
* 权限和用户数据模型
*
*/

const crypto = require('crypto')
const config = require('../config')
const mongoose = require('../mongodb').mongoose
// const autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(mongoose.connection);

const authSchema = new mongoose.Schema({

	username: {
		type: String,
	},

	// 密码
	password: { 
		type: String
	}
})

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth