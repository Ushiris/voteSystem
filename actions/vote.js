exports.action = function(param){
    const settings = require("../settings");
    
    var voteFile = settings.getVoteJson();
    var today = new Date();
    var answer = {
        "createday" : `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
        "order"     : param["order"],
        "answer1"   : param["answer1"],
        "answer2"   : param["answer2"],
        "id"        : param["id"]
    }

    voteFile.AnswerInfo.push(answer);
    settings.setVoteJson(voteFile);
}