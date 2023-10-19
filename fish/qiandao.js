/**
 * 钓鱼人app签到
 */
//清理初始化环境
const {cleanInit,mutilClick,reloadApp}= require("util.js"); //!!!!! 特别注意，使用模块化，需要保存文件到指定设备。//这个路径，不确定原因，感觉是jvm-npm.js的事情导致的。

reloadApp('钓鱼人')

cleanInit("钓鱼人")

console.log('点击按钮我')
className("Button").clickable().text("我").findOne().click();

console.log('执行签到工作流')
var works = [
  { fuzzyKey: "签到", timeout: 1000 },
  { key: "签到", timeout: 2000 },
  { fuzzyKey: "签到成功", timeout: 10000 },
];

mutilClick(works);