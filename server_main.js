//必要なモジュールのインポート
var fs = require('fs');
var path = require('path');
var os = require('os');

var actions = {
    "vote"       : require('./actions/vote').action,
    "checkClose" : require('./actions/checkClose').action,
    "question"   : require('./actions/question').action
}

//定数の設定
const mime = {
    ".html": "text/html",
    ".css":  "text/css",
    ".js": "text/javascript",
    ".ico": "image/vnd.microsoft.icon"
    // 読み取りたいMIMEタイプはここに追記
};
  
//ファイルのパスなど、環境に関わる設定
const settings = require('./settings');

//サーバー作成
var http = require('http');
var server = http.createServer();

//サーバーへ何かが届いた時の処理
server.on('request', function(req, res) {
    req.setEncoding("utf-8");
    var raw_data = "";

    //データの読み込み中の処理
    req.on("data", chunk => {
        if(chunk.trim() != "")raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        //パラメータの整形
        var params_str = raw_data.split("&");
        var param = new Object();
        params_str.forEach(item => {
            var pair = item.split("=");
            param[pair[0]] = pair[1] == "undefined" ? "" : pair[1];
        });

        //メイン処理
        resData(param, req, res);
    });
}).listen(settings.params.port);

/**
 * @description GETやPOSTで送信されたデータから、正しい反応を行います
 * @param {Object} params params[submit]はモード指定文字列にしてください
 */
function resData(params, req, res){
    switch (params.submit) {
        case "vote": //投票を行う
            actions.vote(params);
            break;

        case "question":
            actions.question(params);
            break;

        case "close":
            actions.closeQuestion(params);
            break;

        default: //通常のページ遷移
            break;
    }

    responcePage(req, res);
}

//HTMLページ内の特定の文字を変換する
function replacer(htmlDocument){
    var voteFile = settings.getVoteJson();
    var jsonStr = JSON.stringify(voteFile, null, 2);
    const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
    return htmlDocument.replace("origin", `http://${ip}:${settings.params.port}`)
                       .replace("<!-- result -->", jsonStr);
}

//ページを探してクライアントに返す
function responcePage(req, res){
    //ページ名の解釈
    if (req.url == '/') {
        filePath = '\\index.html';
    } else {
        filePath = req.url;
    }
    var fullPath = __dirname + filePath.replace("/","\\");

    //Webページのメタ情報を付与する
    res.writeHead(200, {'Content-Type' : mime[path.extname(fullPath)] || "text/plain"});

    //Webページをクライアントへ送信する
    fs.readFile(fullPath, 'utf-8', function (err, data) {
        if(err){
            console.log("error!:" + fullPath);
        }else{
            data = replacer(data);
            res.write(data ?? "");
            res.end();
        }
    });
}

//締切日のチェック
function checkCloseDay(){
    var voteFile = settings.getVoteJson();
    for(var i = 0;i < voteFile.QuestionInfo.length; i++){
        if(Date.parse(voteFile.QuestionInfo[voteFile.QuestionInfo.length - i].CloseDay) < new Date()){
            closeQuestion(voteFile.QuestionInfo[voteFile.QuestionInfo.length - i].order);
        }
    }
}

//定期的に締め切りが過ぎた質問がないかチェックしたい
setTimeout(()=>{}, 300000);

//サイトのアドレスをサーバーのコンソールに表示します。
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);