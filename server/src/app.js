import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from '../src/router';
import cors from 'koa-cors';
import staticFile from 'koa-static';
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert');
//var Router = require('koa-router');
//const route = new Router();
const log = require('log4js').getLogger('app');


const app = new Koa();
//export default app;//src/index.js 要用import app from './app';引入进来
module.exports = app; //src/index.js 要用var app = require('./app.js');引入进来

app.use(staticFile('./Public'));
app.use(staticFile(path.join(process.cwd(), './dist')));
console.log(path.join(process.cwd(), './view'))
app.use(views(path.join(process.cwd(), './view'), {
	/*extension: 'ejs',*/
	map: {
		html: 'ejs'
	}
}))

app.use(bodyParser());
app.use(cors());

// 加载路由中间件,处理路由匹配,无法匹配的,回到静态文件处理,静态文件找不到的,返回不存在错误!
app.use(router.routes());

app.use(async ctx => {
	let title = "Koa2";
	console.log(121);
	// 渲染模板及返回参数
	await ctx.render("index", {
		title
	});
});