# autojs 学习实践

## 目标

学习目标

- [x] 1. 掌握 api，开发调试，基本的小 demo
- [ ] 2. 刻意练习。熟练各种操作
- [ ] 3. 攻克难点，掌握核心竞争力

应用目标

- [ ] 接单
- [ ] 日常脚本自动化
- [ ] 快手云控脚本

## 1. 阅读资料

> 注意：阅读文档时，依靠老程序员的敏感性，利用 chrome 插件标注，重点关注：某些 api 细节; 梳理 api 主要能力结构

参考

- [文档](http://doc.autoxjs.com/#/documentation)
- https://easydoc.net/doc/39405522/qhmgVc4G/6x1zunNY
- [autoxJS 文档通览](http://doc.autoxjs.com/#/)
- [github](https://github.com/kkevsekk1/AutoX)
- [youtube 视频教程](https://www.youtube.com/watch?v=nuV-HvMLHQg&list=PL7Z_iJsi_UxpEgdeFkLT0l5b3NcFtnrBe)
- [autojs9](https://www.wuyunai.com/docs/v9/migrate-from-api-v1.html#模块与函数对照表)

//todo 汇总，api 主要结构能力，关键细节。

## 2. 搭建开发调试环境

参考

- https://www.javaedit.com/archives/217
- https://github.com/kkevsekk1/webpack-autojs

真机-简单 同一个局域网即可
真机投屏-最舒服的，不过统一操作，查看布局方便。https://github.com/Genymobile/scrcpy 手机打开开发者选项，打开 use 调试，电脑安装 scrcpy，手机插上电脑，命令行连接，手机确认信任电脑指纹。

虚拟机-群控 [bluestack 安卓模拟器](https://www.bluestacks.com/download.html?utm_campaign=download-page-en)

//todo 总结流程，简化记忆

## 3. 写 demo

> 走遍流程。找到关键的坑，以及结构化并且优化项目

活跃 AQ 社区：

- https://github.com/kkevsekk1/AutoX/issues?page=2&q=is:issue+is:open
- http://www.autoxjs.com/category/4/bug-问题-建议

问题积累：

js 相关：

- [遍历数组对象](https://www.techiedelight.com/zh/loop-through-array-of-objects-javascript/)

- [js 判断对象为 false](https://cloud.tencent.com/developer/article/1636649)

- [模块化](https://www.freecodecamp.org/chinese/news/module-exports-how-to-export-in-node-js-and-javascript/)

- [模块化](https://www.freecodecamp.org/chinese/news/modules-in-javascript/)

- [模块化的种类](https://www.cnblogs.com/libin-1/p/7127481.html)

- [commonjs 规范](https://javascript.ruanyifeng.com/nodejs/module.html)
- [闭包](https://juejin.cn/post/6964579731387711501)
- [闭包的优缺点](https://blog.csdn.net/ruotong0418/article/details/122220146)

autojs 相关：

开发问题：

- 如何更加快速的定位到元素？控件，定位，还有啥手法？寻找控件的方式，代码打印，利用 autojsx 自带的布局工具。
- 寻找控件的方式？？？？？自带的布局分析，代码打印，还有啥？
- [不可点击的图片控件的点击](https://blog.csdn.net/snailuncle2/article/details/115495493)
- [稳定的判断控件存在并点击，防止卡死？](https://github.com/SuperMonster003/Ant-Forest/issues/11)
- 模块化的分包问题？不确定原因，感觉是 jvm-npm.js 的事情导致的。
- [自定义悬浮窗](https://www.6hu.cc/archives/41311.html)
- [控制台美化](https://zhuanlan.zhihu.com/p/365424480)
- [控制台点击穿透](https://blog.csdn.net/snailuncle2/article/details/117958536)
- 翻页控件，也需要 sleep。容易被忽略，导致元素找不到！！！！
- [脚本监控超时停止](https://blog.csdn.net/m0_55125030/article/details/116990243)
- [剪切板内容获取问题](https://zhuanlan.zhihu.com/p/561299463)
- [找图找色存在的问题](https://blog.csdn.net/qq_25226575/article/details/122935531)
- 使用 redis，https://github.com/nicolasff/webdis ，基于 http 的 redis，来共享数据。
- [autojsx 内置函数模块源码参考](https://github.com/kkevsekk1/AutoX/blob/575b355e0e1f160f7deaf147abeaccb448563022/autojs/src/main/assets/modules/__util__.js)
- **控制窗口会影响截图识图，注意**
- [自动获取截图权限](https://blog.csdn.net/weixin_52605050/article/details/121875426)
- [好的入门文章&如何看布局](https://blog.csdn.net/a6892255/article/details/107302369)
- idMathches的大坑：id指的是全程，所以正则上需要，(.*id) 这样来匹配一个id
- 同一个会话两次申请截图权限，会卡死

调试问题：

- [模块化 autojs 时候需要将文件保存到设备](https://github.com/kangour/autojs_sdk/issues/2)
- autojsx 黑屏断连接
- debug 问题。自动化更新文件到设备
- [debug，单步调试](https://juejin.cn/s/vscode单步调试autojs)
- 悬浮控制台
- [停止脚本](https://blog.csdn.net/snailuncle2/article/details/115090390)
- [控制台](https://easydoc.net/doc/39405522/qhmgVc4G/1m6aJEQR)
- 控制台退出应用隐藏
- [开发技巧文件路径 require](https://blog.csdn.net/piyangbo/article/details/126223597)
- [Error: Can't resolve relative module ID "./utils/util" when require() is used outside of a module (/android_asset/modules/jvm-npm.js#87)](https://github.com/kkevsekk1/Auto.js-VSCode-Extension.git) vscode 调试目录，对应的 app 上面的，根目录。但是在保存文件夹的时候，连文件夹一起保存了。就会导致，在手机上直接运行时候，可以调用，因为是相对路径。但是在和 vscode 调试的时候。找不到路径。
- 使用软链接，改变依赖路径。adb shell ls /storage/emulated/0/鑴氭湰/kuaishou/utils 需要 root 权限。但是没有呀。烦！！！
- [编写 shell 脚本，利用 adb 来同步](https://github.com/TonyJiangWJ/AutoScriptBase/blob/master/sync_libs_to_device.sh)
- vscode 插件 Batch Runner，配合一个 batch 脚本文件，既可以实现同步！
- [adb 连接逍遥模拟器](https://www.cnblogs.com/pu369/p/13184387.html) adb connect 127.0.0.1:21503 adb devices
- [adb 保持屏幕常亮](https://juejin.cn/s/android%20%E5%B1%8F%E5%B9%95%E5%B8%B8%E4%BA%AE%20adb)

部署问题：

- [autojsx 打包和编译](https://blog.csdn.net/weixin_40629244/article/details/126067770)
- [定时任务](https://easydoc.net/doc/39405522/qhmgVc4G/RcDK0lDF) 还有 android [Tasker 应用](https://www.bilibili.com/video/BV15W411P719/?spm_id_from=333.337.search-card.all.click&vd_source=bfb2e76478fd5ddcbcb19e0d566ace5e)
- 如何加密应用防止被盗用
- 如何防止被检测-- [定制安卓系统](https://github.com/topjohnwu/Magisk) Magisk [定制分析，看不懂](https://bbs.kanxue.com/thread-274100.htm)
- [防检测框架](https://juejin.cn/s/autojs%E9%98%B2%E6%A3%80%E6%B5%8B%E6%A1%86%E6%9E%B6)
  //todo 继续发现问题，解决问题

## 4. 参考学习案例

- [Auto.js 实现自动刷视频，点赞脚本 ](https://www.cnblogs.com/phyger/p/14043773.html)
- [翻页操控列表](http://www.feiyunjs.com/755.html)
- [传入 id 直接跳转页面](http://www.feiyunjs.com/352.html)
- [微信好友](https://github.com/xiaoguyu/handsFree/blob/main/wechatFriend/main.js)
- [tasker 配合 autojs 实现早上 5 点自动解锁手机并签到打卡赚积分](https://www.bilibili.com/video/BV1zG4y197rX/?spm_id_from=333.337.search-card.all.click&vd_source=bfb2e76478fd5ddcbcb19e0d566ace5e)
- [云控](https://www.bilibili.com/video/BV1s64y1o7EQ/?spm_id_from=333.337.search-card.all.click)
- [遍历点击](https://www.bilibili.com/video/BV1pa4y177tY/?spm_id_from=333.337.search-card.all.click&vd_source=bfb2e76478fd5ddcbcb19e0d566ace5e)
- [随机滑动](https://github.com/hyue418/taobao-11-11/blob/master/淘宝+京东双十一活动脚本.js)
- [游戏脚手架](https://gitee.com/zjh336/hz_autojs_game_script)
- [微信好友僵尸粉](https://github.com/L8426936/CleanUpWeChatZombieFans)
- [常用操作，悬浮窗，等](https://zhuanlan.zhihu.com/p/643798866) 

## 5. 卷王 vs 海王

- 核心难点
- 原理本质
- 同类型产品选型
  - [冰狐智能辅助](https://www.bilibili.com/video/BV1y14y1376n/?t=468&spm_id_from=333.1007.seo_video.first&vd_source=bfb2e76478fd5ddcbcb19e0d566ace5e)
  - [hamibot](https://hamibot.com/)
- 变现思考

- [lamda](https://github.com/rev1si0n/lamda)
- [github autojs topic](https://github.com/topics/autojs)

## tips

1. 如何分析页面？

- 一般的可见组件，直接使用，布局分析就好了。（autojs 自带的）。直接分析布局，有时候显示不出来，可以多试几次，或者使用代码，log(find())来打印所有的。分析父子关系，可以通过层次分析来进行，通常用来找到可点击的父组件。等。
- 对于不可见组件，使用代码调试寻找。或者通过层次分析来找。

2. 如何编写复杂逻辑？(这是做事的方法论。很多事情都是通用的。大范围的，只需要大概规划，在实施的时候，一定要从小事做起来。同时要有目标感，保证时间，价值，边界)

多层嵌套循环这样的逻辑，是比较复杂的。基本可以说是一个共识。大概 3 层循环的逻辑，就会开始烧脑。

如果，以顺序的方式，从最外层，不断的向内编写。这种方式，会需要一直关注各层循环和小细节。脑力消耗严重。姿势不对，难度较高。

此时，需要拆解单元。反向推进任务。从最具体的最内层的处理开始，以一个页面为一个单元，逐渐向外推进。这样，在整个任务编写的过程中，就会一直保持一个最简化的思考。

3. 逻辑套路抽离？
   编写基本逻辑的时候，大多数都是相似重复的。比如：

   1. 判断是否进入当前页面 （如果需要考虑程序的健壮性，这个操作必须有。然而，不想费事的话，大多数只需要，sleep 一下即可）
   2. 寻找控件。进行日志监控，找不到告警。（这样容易发现，程序隐藏的稳定性问题，如，页面结构变化 ，网络问题，布局渲染问题）
   3. 操作控件。
   4. 返回，或者 loop 前面的。

4. 稳定性问题？
