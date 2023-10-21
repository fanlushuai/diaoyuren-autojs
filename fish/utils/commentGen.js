function UniGen() {
  this.uniArr = [];
  this.isUni = function (num, newGen) {
    if (this.uniArr.indexOf(newGen) > -1) {
    //   log("出现重复生成");
      return false;
    }

    if (this.uniArr.length > num) {
      this.uniArr.shift();
    }
    this.uniArr.push(newGen);
    return true;
  };
}

var uniGenEmo = new UniGen();
var uniGenWord = new UniGen();

const genComment = function (base) {
  var comment = "";
  comment += base;
  comment += gen语气词();
  comment += genEmo();

  return comment;
};

function genEmo() {
  // 图标获取 https://bj.96weixin.com/tools/emoji
  var emos = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😆",
    "😉",
    "😊",
    "😋",
    "😘",
    "🙂",
    "😶",
    "😏",
    "😬",
    "👀",
    "👣",
    "👽",
    "🤥",
  ];

  var emo = emos[random(0, emos.length - 1)];
  if (!uniGenEmo.isUni(6, emo)) {
    genEmo();
  }

  return emo;
}

function gen语气词() {
  var words = [
    "吧",
    "罢",
    "呗",
    "啵",
    "啦",
    "嘞",
    "咯",
    "啰",
    "喽",
    "呢",
    "呐",
    "哈",
    "呦",
    "嘢",
    "哇",
  ];
  var word = words[random(0, words.length - 1)];
  if (!uniGenWord.isUni(6, word)) {
    gen语气词();
  }

  return word;
}

module.exports = { genComment };
