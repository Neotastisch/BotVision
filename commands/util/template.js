const discord = require("discord.js")
const {MessageActionRow,MessageButton} = require("discord.js")
module.exports = {
      name: 'servertemplate',
      shown: true,
      //aliases: [],
      permissions: ["ADMINISTRATOR"],
      args: "[Template-name]",
      description: 'Sets up a whole server for you.',
      async execute(client, args, message) {
      let count = 0
      let possible = []
      for(var attributename in client.std){
            count++
            possible.push(attributename)
      }
      if(!args[0]){return message.reply("Need a name for a template, possible arguments: "+possible.toString(", "))}
      if(!client.std[args[0]])return message.reply("Template not found, possible arguments: "+possible.toString(", "))
      message.reply("I will now setup the basic channels and roles.")
      //Channels
      for(var attributename in client.std[args[0]].Categories){
            let category = await message.guild.channels.create(attributename, { type: "GUILD_CATEGORY" })
            for(var attributename2 in client.std[args[0]].Categories[attributename]){
            message.guild.channels.create(attributename2, { type: 'text'})
            .then(channel => {
             
             //NOT WORKING channel.edit({permissionOverwrites:[{id: message.guild.roles.everyone, deny: client.std[args[0]].Categories[attributename].deny}]})
             //            channel.edit({permissionOverwrites:[{id: message.guild.roles.everyone, allow: client.std[args[0]].Categories[attributename].allow}]})
             channel.send("**Remember to set-up the permissions to your liking!**")
            }).catch(console.error);
      }
        }
        //Roles
      for(var attributename in client.std[args[0]].Roles){
            message.guild.roles.create({
                    name: attributename,
                    color: client.std[args[0]].Roles[attributename].Color,
                })
      }

      message.reply("Done, now you have to set permissions for channels/roles and do "+client.data[message.guildId].prefix+"setup")
      

      },
};