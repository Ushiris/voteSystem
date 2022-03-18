const fs = require('fs');
const DEBUG_FLAG = true;

exports.params = {
    "voteFile" : DEBUG_FLAG ? "./test/test_result.json" : "./activeVote.json",
    "archive"  : DEBUG_FLAG ? "./test/testLog.json" : "./archives/Log.json",
    "port"     : 3000,
    "home"     : DEBUG_FLAG ? "\\test/index.html" : "\\index.html"
}

exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}