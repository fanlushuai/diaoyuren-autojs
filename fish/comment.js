//清理初始化环境
const {
  cleanInit,
  reloadApp,
  l,
  netDelay,
  aWhileExit,
  pinLog,
} = require("util.js"); //!!!!! 特别注意，使用模块化，需要保存文件到指定设备。//这个路径，不确定原因，感觉是jvm-npm.js的事情导致的。
const { genComment } = require("commentGen.js");

reloadApp("钓鱼人");
cleanInit("钓鱼人");

var storage = storages.create("diaoyuren");

var config = {};
config.citys = [
  // "北京",
  "上海",
  "广州",
  "深圳",
  "苏州",
  "成都",
  "东莞",
  "无锡",
  "杭州",
  "温州",
  "南京",
  "宁波",
];
config.timeLimit = 1;
config.timeLimitUnit = "天"; //天，小时，分钟
config.comment = "鱼情太难了";
// config.commentDebugMode = true; // 别让在测试的时候真实提交
config.commentDebugMode = false; // 别让在测试的时候真实提交

var stateLog = {};
// stateLog.countAll = 0;
stateLog.countSolved = 0;
stateLog.msg = function () {
  return "已评论 ： " + this.countSolved;
};
stateLog.addCountSolved = function (count) {
  this.countSolved += count;
};

pinLog.log(stateLog.msg());

// 找到tab
className("Button").clickable().text("本地").findOne().click();

config.citys.forEach((c) => {
  changeCity(c);
  city();
});

function changeCity(city) {
  console.warn("切换城市-> " + city);

  id("mLlLocalLocation").waitFor();
  id("mLlLocalLocation").findOne().click();
  id("tb_root").waitFor();
  text(city).findOne().click();
  sleep(3000, 4000);

  if (text("提示").id("alertTitle").findOne(4000) != null) {
    text("取消").clickable().findOne().click();
    sleep(1000, 2000);
  }
}

function city() {
  // 找到 最新
  text("最新").waitFor();

  // 找翻页控件方法
  // log(scrollable().find())
  // 测试翻页控件方法
  // id('lrvhRecyclerView').findOne().scrollForward()

  // var yetSolveArry = [];

  pagesScroll();
}

function pagesScroll() {
  while (true) {
    if (page()) {
      id("lrvhRecyclerView").findOne().scrollForward();
      sleep(800, 1500); // 特别注意：翻页控件需要sleep，不然容易出现找不到组件。
      console.log("翻页===");
    } else {
      break;
    }
  }
}

function page() {
  // 确保在页面内部
  text("最新").waitFor();
  try {
    // 找到这个页面的所有 帖子
    var titleEles = id("title_view")
      .className("android.widget.TextView")
      .find();

    // 遍历所有帖子，进行判断，点击
    var yetSovleInOnePageCount = 0;
    var notUserPostCount = 0;

    // stateLog.addCountAll(titleEles.size()); 因为翻页之后，会出现重复的内容。导致计数重复。所以，不再次计数。
    pinLog.log(stateLog.msg());

    for (var titleEle of titleEles) {
      //每一个帖子处理完，等待返回
      text("最新").waitFor();

      var title = titleEle.text();
      console.info("开始处理帖子->" + title);
      //1. 判断是用户帖,且时间处于2天内，才会进行点击

      //是否为用户帖子 (用户帖子包含时间元素，广告贴没有)
      //找到标题的父控件的所有子组件是否包含 时间元素。
      var titleParent = titleEle.parent();

      // try {
      var postEleCollection = titleParent.children();

      // } catch (error) {
      //   log(titleParent)
      //   exit()
      // }

      var time = postEleCollection.findOne(id("tv_avatar_rb"));
      if (!time) {
        console.warn("不包含 time 元素，不是用户贴---" + title);
        //不是用户帖子，直接跳过
        notUserPostCount++;
        continue;
      }

      //2. 判断是否超过时间限制
      console.log(time.text().replace("< >/< ><img>< >", "  "));
      if (overLimit(config.timeLimit, config.timeLimitUnit, time.text())) {
        //超过时间限制，直接结束
        console.warn("超过时间限制，跳出循环");
        // 是不是应该，直接退出脚本？
        // aWhileExit();
        return false;
        // break;
      }

      //3. yetSolveArry。已经点击，直接跳过
      if (storage.contains(title)) {
        // if (yetSolveArry.indexOf(title) > -1) {
        console.warn("已经点击过，跳过" + title);
        if (++yetSovleInOnePageCount == titleEles.size() - notUserPostCount) {
          //本页全部都处理了。说明后面的大概率都已经处理了。直接停止
          console.warn("本业全部都是陈旧的，停止运行");
          // aWhileExit();
          return false;
        }
        continue; //todo 优化
      }

      //点击进入
      titleEle.click();
      netDelay();

      stateLog.addCountSolved(1);
      pinLog.log(stateLog.msg());

      post(title);
    }
  } catch (error) {
    log("这里出现问题");
    log(titleEles);
  }
  return true;
}

function post(title) {
  netDelay();
  //等待进入帖子页面
  // text("加关注").waitFor();
  textMatches("(加关注|已关注)").waitFor();
  sleep(random(500, 1000));
  //点击->回复组件
  id("rll_reply").click();
  sleep(random(500, 1000));

  //输入 评论
  var comment = genComment(config.comment);
  id("et_chat").setText(comment);
  sleep(random(500, 1000));

  console.log("发表评论->" + comment);

  // 提交评论
  if (!config.commentDebugMode) {
    id("btn_send").click();
  }
  // 等待评论成功
  sleep(random(2000, 2100));
  // text('评论发表成功').waitFor()

  //存储点击列表
  // yetSolveArry.push(title);
  if (!config.commentDebugMode) {
    storage.put(title, "");
  }

  back();
  sleep(random(2000, 2100));
  back();
  sleep(random(2000, 2100));

  back();
}

// 时间内，比如 1天。只会处理小时的。3天，只会处理3天以内的
function overLimit(timeLimit, unit, timeStr) {
  //时限。分钟，小时，天
  // l(typeof timeStr)

  var postTime = timeStr.split("/")[0];

  var postTimeNum = parseInt(postTime);

  if ("天" == unit) {
    if (postTime.indexOf("天") > -1 && postTimeNum >= timeLimit) {
      return true;
    }
  } else if ("小时" == unit) {
    if (
      postTime.indexOf("天") > -1 ||
      (postTime.indexOf("小时") > -1 && postTimeNum >= timeLimit)
    ) {
      return true;
    }
  } else if ("分钟" == unit) {
    if (
      timeStr.indexOf("天") > -1 ||
      timeStr.indexOf("小时") > -1 ||
      (timeStr.indexOf("分钟") && postTimeNum >= timeLimit)
    ) {
      return true;
    }
  } else {
    log("时间单位错误");
  }

  return false;
}
