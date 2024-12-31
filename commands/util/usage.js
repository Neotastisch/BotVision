const discord = require("discord.js")
const {MessageActionRow,MessageButton} = require("discord.js")
module.exports = {
      name: 'usage',
      shown: true,
      //aliases: [],
      permissions: [],
      args: "[Command-Name]",
      description: 'Shows you the usage of a specific command',
      async execute(client, args, message) {
      if(!args[0]) return message.reply({embeds: [client.usage(message.guild.id,module.exports.name,module.exports.args)]})



            const { commands } = client;
            let success = false
            commands.forEach(async (element) => {
            if(args[0] == element.name){
                  success = true
                  return message.reply(await client.data.get(message.guild.id+"-PREFIX") + element.name+" "+ element.args, true) 
            }
            })
            if(success == false){
                  return message.reply({content: "Command not found."})
            }
      
      },
};