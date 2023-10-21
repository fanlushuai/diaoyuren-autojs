//app应用关闭
const killApp = function (name) {
  // 所以，填写包名或app名称都可以
  var packageName = getPackageName(name) || getAppName(name);
  if (!packageName) {
    log("找不到packageName" + packageName);
    return;
  }

  // 打开系统级应用设置
  app.openAppSetting(packageName);
  sleep(random(1000, 2000));
  text(app.getAppName(packageName)).waitFor();

  // 执行盲点流程 （多点几次不过分。都是非阻塞的。）
  var times = 3; // 多点几次，应对页面上存在一些其他tips文字，干扰流程。
  do {
    stop();
    times--;
  } while (times);

  sleep(random(2000, 2300));
  back();
};

// 盲点
function stop() {
  var is_sure = textMatches(
    /(.{0,3}强.{0,3}|.{0,3}停.{0,3}|.{0,3}结.{0,3}|.{0,3}行.{0,3})/
  ).findOnce();
  if (is_sure) {
    is_sure.click();
    sleep(random(500, 600));
  }

  var b = textMatches(/(.*确.*|.*定.*)/).findOnce();
  if (b) {
    b.click();
    sleep(random(500, 600));
  }
}

// 工作流- 连续点击
const mutilClick = function (works) {
  for (var work of works) {
    if (work.key) {
      var e = text(work.key).findOne(work.timeout);
      if (e) {
        log("点击->" + e.text());
        e.click();
      } else {
        log("未找到" + work.key);
        printEles();
        break;
      }
    } else if (work.fuzzyKey) {
      var e = textContains(work.fuzzyKey).findOne(work.timeout);
      if (e) {
        log("点击->" + e.text());
        e.click();
      } else {
        log("未找到" + work.fuzzyKey);
        printEles();
        break;
      }
    } else {
      log("配置错误，key 不存在");
    }

    sleep(random(1500, 2000));
  }
};

//初始化环境  杀掉目标应用，然后重新开启
const cleanInit = function (appName) {
  stopOther();
  console.show(); //脚本结束，隐藏控制台
  keepAlive(); // 保持常亮，防止调试期间断开连接
};

const reloadApp = function (appName) {
  killApp(appName);
  auto.waitFor();
  app.launchApp(appName);
  console.log("打开-" + appName);
  keepAlive(); // 保持常亮，防止调试期间断开连接
};

const stopOther = function () {
  engines.all().map((ScriptEngine) => {
    if (engines.myEngine().toString() !== ScriptEngine.toString()) {
      ScriptEngine.forceStop();
    }
  });
};

// 比console.show(true) 好用
events.on("exit", function () {
  console.hide();
});

const printEles = function () {
  function queryList(json) {
    for (var i = 0; i < json.length; i++) {
      var sonList = json[i];
      if (sonList.childCount() == 0) {
        console.log(json[i]);
      } else {
        queryList(sonList);
      }
    }
  }

  // 第二部查找所有控件
  var root = find();

  // 第三步 调用递归方法
  queryList(root);
};

const collectionContains = function (eles, type, value) {
  for (var ele in eles) {
    if (type == "id") {
      if (ele.id() == value) {
        return ele;
      }
    }

    if (type == "text") {
      if (ele.text() == value) {
        return ele;
      }
    }
  }
  return null;
};

const netDelay = function () {
  sleep(1000);
};

const keepAlive = function () {
  device.keepScreenOn(3600 * 1000);
  device.setBrightness(2);
};

const l = function (str) {
  log("@@@@@@ -> " + str);
};

const aWhileExit = function () {
  console.warn("等待 8s 自动退出");
  sleep(8000);
  exit();
};

var pinLog = {};
pinLog.w;
pinLog.init = function () {
  if (pinLog.w) {
    return;
  }

  if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    toast(
      "本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。"
    );
    floaty.requestPermission();
    exit();
  } else {
    // toastLog("已有悬浮窗权限");
  }

  //显示一个悬浮窗。显示文本  。修改文本内容，id="text"
  var w = floaty.window(
    <frame gravity="center">
      <frame gravity="center">
        <text
          textSize="30sp"
          w="wrap_content"
          h="wrap_content"
          textColor="#C0FF3E"
          padding="6"
          id="text"
        ></text>
      </frame>
    </frame>
  );

  ui.run(function () {
    var ww = w.getWidth();
    var wh = w.getHeight();
    var dw = device.width;
    var dh = device.height;
    // 悬浮窗置于底部中央
    var x = (dw - ww) / 2;
    var y = (dh - wh)*3/4;
    // console.log("固定日志位置：" + x + "---" + y);
    w.setPosition(x, y);
  });

  pinLog.w = w;
};

pinLog.log = function (msg) {
  pinLog.init();
  var w = this.w;
  ui.run(function () {
    w.text.setText(msg);
  });
};

// 模块化 https://www.freecodecamp.org/chinese/news/module-exports-how-to-export-in-node-js-and-javascript/
module.exports = {
  printEles,
  cleanInit,
  killApp,
  mutilClick,
  netDelay,
  collectionContains,
  reloadApp,
  l,
  aWhileExit,
  pinLog,
};
