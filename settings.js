const fs = require('fs');
const DEBUG_FLAG = false;

exports.params = {
    "isDebug"  : DEBUG_FLAG,
    "voteFile" : DEBUG_FLAG ? "./test/test_result.json" : "./voteData/voteList.json",
    "archive"  : DEBUG_FLAG ? "./test/testLog.json" : "./voteData/archives.json",
    "port"     : 3000,
    "home"     : DEBUG_FLAG ? "\\test\\index.html" : "\\index.html",
    "MIME"     : {
        ".html" : "text/html",
        ".css"  : "text/css",
        ".js"   : "text/javascript",
        ".ico"  : "image/vnd.microsoft.icon"
        // 読み取りたいMIMEタイプはここに追記
    },
    "actions"  : {
        "vote"       : require('./actions/vote').action,
        "checkClose" : require('./actions/checkClose').action,
        "question"   : require('./actions/question').action,
        //ここで機能の追加を行う
        "load"       : (()=>{})
    }
}

exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}