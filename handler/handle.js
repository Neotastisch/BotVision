const fs = require('fs')
module.exports = (client, path) => {
    try{
    require('../util/loadCommands.js')(client, path)
    require('../util/eventsLoad.js')(client, path)
    }catch(err){
        console.log("Error in handle.js:");
        console.log(err);
    }

}