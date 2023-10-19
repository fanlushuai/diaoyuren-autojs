//清理初始化环境
const {cleanInit,mutilClick,reloadApp}= require("util.js"); //!!!!! 特别注意，使用模块化，需要保存文件到指定设备。//这个路径，不确定原因，感觉是jvm-npm.js的事情导致的。

// reloadApp('钓鱼人')

cleanInit("钓鱼人")

log(scrollable().find())
// className('androidx.viewpager.widget.ViewPage').findOne().scrollDown()
id('lrvhRecyclerView').findOne().scrollForward()