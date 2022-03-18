const fs = require('fs');
const DEBUG_FLAG = true;

exports.params = {
    "voteFile" : DEBUG_FLAG ? "./debug_result.json" : "./activeVote.json",
    "archive"  : DEBUG_FLAG ? "./archives/testLog.json" : "./archives/Log.json",
    "port"     : 3000
}

exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}