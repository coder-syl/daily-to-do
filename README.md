##### [项目地址](https://github.com/coder-syl/daily-to-do)，欢迎批评指正，随手Star哟
1. [Electron实战-每日清单---01Electron-vue的使用](https://blog.csdn.net/shangyanaf/article/details/102894038)
2. [Electron实战-每日清单---02Electron-vue的目录详解](https://blog.csdn.net/shangyanaf/article/details/102968526)
3. [Electron实战-每日清单---03功能介绍与环境搭建](https://blog.csdn.net/shangyanaf/article/details/103029614)
### 是什么
> 每日清单其实就是一个to-do-list

### 功能（包括已完成）

 - [x] 登录

 - [x] 我的清单
	 - 添加待作
	 - 删除待作
	 - 修改待作
 - [x]  已完成
 - [x] 垃圾箱
 - [ ] 数据统计
 - [ ] 系统设置
	 - 开机自启动
	 - 系统通知
	 - 修改用户名密码


### 技术支持
- 前端
	>element-ui

- 本地数据持久化存储
    > lowdb 数据库
	> node 数据读写

### 环境搭建
1. [Electron-vue安装使用](https://blog.csdn.net/shangyanaf/article/details/102894038)
2. Element-ui 详见官方网站
3. [lowdb](https://github.com/typicode/lowdb) 
	> npm install lowdb
	
	官方文档中推荐 [lodash-id](https://github.com/typicode/lodash-id) ，这个东西其实就是为每一个新增 的数   据自动加上一个唯一表示的id字段，和mysql等数据库的自增主键类似。
	> npm install  lodash-id 

4. fs-extra
lowdb本质上就是通过fs来读写JSON文件实现的,node也内置了fs模块进行文件读写，但是为了读写更方便，使用fs-extra
	>npm install fs-extra
