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
config.timeLimit = 1;
config.timeLimitUnit = "天"; //天，小时，分钟
config.comment = "鱼情太难了";
config.commentDebugMode = true; // 别让在测试的时候真实提交
// config.commentDebugMode = false; // 别让在测试的时候真实提交

var stateLog = {};
// stateLog.countAll = 0;
stateLog.countSolved = 0;
stateLog.msg = function () {
  return "已处理" + this.countSolved;
};
stateLog.addCountSolved = function (count) {
  this.countSolved += count;
};

// 找到tab
className("Button").clickable().text("本地").findOne().click();

// 找到 最新
text("最新").waitFor();

// 找翻页控件方法
// log(scrollable().find())
// 测试翻页控件方法
// id('lrvhRecyclerView').findOne().scrollForward()

// var yetSolveArry = [];

pagesScroll();

function pagesScroll() {
  while (true) {
    page();
    id("lrvhRecyclerView").findOne().scrollForward();
    console.log("翻页===");
  }
}

function page() {
  // 确保在页面内部
  text("最新").waitFor();

  // 找到这个页面的所有 帖子
  var titleEles = id("title_view").className("android.widget.TextView").find();

  // 遍历所有帖子，进行判断，点击
  var yetSovleInOnePageCount = 0;
  var notUserPostCount = 0;

  // stateLog.addCountAll(titleEles.size()); 因为翻页之后，会出现重复的内容。导致计数重复。所以，不再次计数。
  pinLog.log(stateLog.msg())

  for (var titleEle of titleEles) {
    //每一个帖子处理完，等待返回
    text("最新").waitFor();

    var title = titleEle.text();
    console.info("开始处理帖子->" + title);
    //1. 判断是用户帖,且时间处于2天内，才会进行点击

    //是否为用户帖子 (用户帖子包含时间元素，广告贴没有)
    //找到标题的父控件的所有子组件是否包含 时间元素。
    var titleParent = titleEle.parent();

    var postEleCollection = titleParent.children();

    var time = postEleCollection.findOne(id("tv_avatar_rb"));
    if (!time) {
      console.warn("不包含 time 元素，不是用户贴---" + title);
      //不是用户帖子，直接跳过
      notUserPostCount++;
      continue;
    }

    //2. 判断是否超过时间限制
    console.log(time.text());
    if (overLimit(config.timeLimit, config.timeLimitUnit, time.text())) {
      //超过时间限制，直接结束
      console.warn("超过时间限制，跳出循环");
      // 是不是应该，直接退出脚本？
      aWhileExit();
      // break;
    }

    //3. yetSolveArry。已经点击，直接跳过
    if (storage.contains(title)) {
      // if (yetSolveArry.indexOf(title) > -1) {
      console.warn("已经点击过，跳过" + title);
      if (++yetSovleInOnePageCount == titleEles.size() - notUserPostCount) {
        //本页全部都处理了。说明后面的大概率都已经处理了。直接停止
        console.warn("本业全部都是陈旧的，停止运行");
        aWhileExit();
      }
      continue; //todo 优化
    }

    //点击进入
    titleEle.click();
    netDelay();

    stateLog.addCountSolved(1);
    pinLog.log(stateLog.msg())

    post(title);
  }
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
  storage.put(title, "");

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

// 跳出列表后，翻页了，导致元素有问题了。？？？？？什么情况。--- 好像是因为翻页控件的翻页动作，需要点击到帖子尾部，要不然还是在这一页。
// 02:58:30.018/D: 15小时前
// 02:58:34.562/D: 发表评论
// 02:58:40.016/I: 开始处理帖子->周六有去小清河钓大板鲫去吗？
// 02:58:40.050/D: 23小时前
// 02:58:40.062/W: 超过时间限制，跳出循环
// 02:58:40.090/D: 翻页===
// 02:58:40.172/I: 开始处理帖子->南沙河南玉河路口背风抽鲫鱼
// 02:58:40.182/D: 10小时前< >/< ><img>< >10.3km
// 02:58:40.186/W: 已经点击过，跳过南沙河南玉河路口背风抽鲫鱼
// 02:58:40.207/I: 开始处理帖子->周末房山农家乐过把瘾有约的吗，费用我出
// 02:58:40.307/W: 不包含 time 元素，不是用户贴---周末房山农家乐过把瘾有约的吗，费用我出
// 02:58:41.848/I: 开始处理帖子->大方大浪的，忙里偷闲过把瘾……
// 02:58:41.882/E: TypeError: Cannot call method "children" of null ([remote]comment.js#54)
// TypeError: Cannot call method "children" of null
//     at page ([remote]comment.js:54:0)
//     at pagesScroll ([remote]comment.js:28:0)
//     at [remote]comment.js:24:0
