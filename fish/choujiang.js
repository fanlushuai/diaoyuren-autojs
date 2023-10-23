/**
 * 钓鱼人 App 抽奖
 */

//清理初始化环境
const { cleanInit, reloadApp, mutilClick, netDelay } = require("./utils/util"); //!!!!! 特别注意，使用模块化，需要保存文件到指定设备。//这个路径，不确定原因，感觉是jvm-npm.js的事情导致的。

reloadApp("钓鱼人");
cleanInit("钓鱼人");

className("Button").clickable().text("我").findOne().click();

netDelay(); // sleep一下，不然有时候会卡住。估计是网络请求的事情，某些令牌没有加载出来
var works = [{ fuzzyKey: "签到", timeout: 2000 }];
mutilClick(works);

console.log("点击今日抽奖");
var b = textMatches(/[a-zA-Z0-9]{32}/)
  .findOne()
  .bounds();
netDelay();
click(b.centerX(), b.centerY()); //这个不行，还非得press！！！！估计还是网络问题
// press(b.centerX(),b.centerY(), 2);
// log(b)

console.log("点击抽奖");
netDelay();
var unable = textContains("剩余0次").findOne(2000);

if (unable) {
  console.log("机会不足");
} else {
  textContains("剩余").findOne().click();
  console.log("等待抽奖结果");
  sleep(2000);
  textContains("恭喜").waitFor();
}

// todo 微信提醒，中大奖
