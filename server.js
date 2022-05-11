'use strict';
//必要なモジュールのインポート
var fs = require('fs');
var os = require('os');
var path = require('path');
var express = require('express');
var app = express();
  
//ファイルのパスなど、環境に関わる設定
const settings = require('./settings');

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.set('port', settings.params.port);

var server = app.listen(app.get('port'), function() {
    console.log('listening');
}); 

//サーバーへ何かが届いた時の処理
server.on('request', function(req, res) {
    req.setEncoding("utf-8");
    var raw_data = "";

    //データの読み込み中の処理
    req.on("data", chunk => {
        if(chunk.trim() != "") raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        //パラメータの整形
        var paramList = raw_data.split("&");
        var param = new Object();
        paramList.forEach(item => {
            var pair = item.split("=");
            param[pair[0]] = pair[1] ?? "";
        });

        //投票等、ページ返却以外の処理
        if(param.submit != undefined){
            settings.params.actions[param.submit](param);
        }

        //ページ名の解釈
        var filePath = req.url == '/' ? settings.params.home : req.url;
        var fullPath = __dirname + filePath.replace("/","\\");
        console.log("request-file:" + fullPath);

        fs.readFile(fullPath, 'utf-8', function (err, data) {
            if(err) {
                console.log("error!:" + fullPath);
            } else {
                data = replacer(data);
                res.write(data ?? "");
            }
        });
    });
});

//HTMLページ内の特定の文字を変換する
function replacer(htmlDocument){
    var voteFile = settings.getVoteJson();
    var jsonStr = JSON.stringify(voteFile, null, 2);
    const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;

    return htmlDocument.replace("origin", `http://${ip}:${settings.params.port}`)
                       .replace("<!-- result -->", jsonStr);
}

//定期的に締め切りが過ぎた質問がないかチェックしたい
setTimeout(()=>{}, 300000);

//URLをサーバーのコンソールに表示する
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);