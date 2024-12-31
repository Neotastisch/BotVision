const discord = require('discord.js')
const ms = require('ms');
module.exports = {
  name: 'gstop',
  description: 'Stops the giveaway 🎉',
  shown: true,
  permissions: [],
  args: "[Channel ID]",
  execute(client, args, message ) {
    const msg = message
    const serverstats = client.data
    var cmd = message.content
    let prefix = serverstats[message.guild.id].prefix
		if(prefix == undefined)prefix = "?"
        if (!args[0]) return message.reply({embeds: [client.usage(message.guild.id,module.exports.name,module.exports.args)]})

        client.giveaway
        .end(args[0])
        .then(() => {
            message.channel.send({content:"Giveaway ended"});
          })
          .catch(err => {
            console.log(err)
            message.channel.send({content:"Error"});
          })
        
  },
};