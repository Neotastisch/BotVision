const fs = require("fs")
module.exports = {
  name: 'messageCreate',
  run: (client, message) => {
    
    let msg = message
    if (message.channel.type === 'dm'){
      return
    }
    if(message.author.bot)return
    var serverstats = client.data
    if(!serverstats) serverstats = {}
    if(!serverstats[message.guildId]) serverstats[message.guildId] = {}

    if(serverstats[message.guildId]?.hasOwnProperty("welcomechannel") == false){
      serverstats[message.guildId].welcomechannel = "None"
    }
    if(serverstats[message.guildId]?.hasOwnProperty("leavechannel") == false){
      serverstats[message.guildId].leavechannel = "None"
    }
    if(serverstats[message.guildId]?.hasOwnProperty("prefix") == false){
      serverstats[message.guildId].prefix = "?"
    }
    if(serverstats[message.guildId]?.hasOwnProperty("admin") == false){
      serverstats[message.guildId].admin = message.guild.ownerId
    }
    if(serverstats[message.guildId]?.hasOwnProperty("staffrole") == false){
      serverstats[message.guildId].staffrole = "None"
    }
    if(serverstats[message.guildId]?.hasOwnProperty("joinrole") == false){
      serverstats[message.guildId].joinrole = "None"
    }
    if(serverstats[message.guildId]?.hasOwnProperty("logchannel") == false){
      serverstats[message.guildId].logchannel = "None"
    }
    
    if(serverstats[message.guildId]?.hasOwnProperty("joinmessage") == false){
      serverstats[message.guildId].joinmessage = "Welcome to "+message.guild.name
    }

    client.data = serverstats
}
}
