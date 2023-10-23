const {
  reloadApp,
  cleanInit,
  getBrother,
  getOtherBrother,
  clickUnclickble,
  mutilClick,
  aWhileExit,
  backFromWeChat,
} = require("./utils/util");

var s = storages.create("diaoyuren-share");

reloadApp("钓鱼人");
cleanInit("钓鱼人");
dddd();

function share() {
  //判断进入页面，还是不够稳定
  textMatches("(加关注|已关注)").waitFor();
  sleep(2000);
  console.info("进入页面等待结束");

  id("acpb_share_view").findOne().click();

  id("tv_share_icon").waitFor();

  var icons = id("tv_share_icon").find();
  // log(icons)

  for (var icon of icons) {
    // var iconNameCopy = getBrother(icon, "复制链接", "");
    var iconNameCopy = getBrother(icon, "微信", "");
    if (iconNameCopy) {
      sleep(1000);
      iconNameCopy.parent().click();
      console.info("点击icon");
      backFromWeChat();
      break;
    }
  }

  sleep(1000);
  back();
  sleep(500, 1000);
  back();
}

function intoSharePost() {
  id("tb_title").text("分享精选帖").waitFor();
  id("title_view").waitFor();

  var titles = id("title_view").find();

  for (var title of titles) {
    sleep(500, 1000);
    title.click();
    console.info("点击帖子-> %d", title.text());
    share();
    s.put(title.text(), ""); //??
  }
}

function intoQuWanCheng() {
  text("福利中心").waitFor();
  sleep(1000);

  var quWanChengButton = scrollUntillInScreen(function () {
    return getOtherBrother(text("分享精选帖").findOne(), [
      "分享精选帖",
      "+5",
      "+10",
      "向钓友分享精选帖子~",
    ]);
  }, scrollable().findOne());

  //text('分享精选帖').waitFor()//不行呀,屏幕上并没有出现，我艹，只能sleep了
  sleep(1500);
  clickUnclickble(quWanChengButton);

  //有时候，是未完成。但是检测不到。就通过等待元素超时的方式来检测
  if (!id("tb_title").text("分享精选帖").findOne(3000)) {
    console.warn("猜测已经完成了");
    aWhileExit();
  }

  console.info("点击->去完成");
}

function scrollUntillInScreen(eleFunc, scrollEle) {
  var i = 1;
  //最多滑动5次去寻找
  while (i++ < 5) {
    var ele = eleFunc();
    var b = ele.bounds();
    // log("设备，宽%d-高%d", device.width, device.height);
    // log("%d-%d-%d-%d", b.left, b.right, b.top, b.bottom);
    if (b.bottom >= device.height) {
      scrollEle.scrollForward();
      //   log("向下找");
      sleep(random(500, 1000));
    } else {
      return ele;
    }
  }

  return null;
}

function intoWo() {
  className("Button").clickable().text("我").findOne().click();
  console.log("执行工作流");
  var works = [{ fuzzyKey: "签到", timeout: 2000 }];

  mutilClick(works);
}

function dddd() {
  intoWo();
  intoQuWanCheng();
  intoSharePost();
}
