

const genComment= function(base){
    var comment='';
    comment+=base;
    comment+=gen语气词();
    comment+=genEmo();
    return comment;
}

function genEmo(){
    // 图标获取 https://bj.96weixin.com/tools/emoji
    var emos=['😀','😁','😂','🤣','😃','😄','😆','😉','😊','😋','😘','🙂','😶','😏','😬','👀','👣','👽','🤥'];

    return emos[random(0,emos.length-1)]
}

function gen语气词(){
    var words=['吧',
    '罢',
    '呗',
    '啵',
    '啦',
    '嘞',
    '咯',
    '啰',
    '喽',
    '呢',
    '呐',
    '哈',
    '呦',
    '嘢',
    '哇',]

    return words[random(0,words.length-1)]
}

module.exports = {genComment}