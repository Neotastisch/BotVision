const discord = require('discord.js')
module.exports = {
	name: 'coin',
	description: 'Flipps a coin 🤝',
      shown: true,
      interactions: true,
      permissions: [],
	execute(client, args, message) {
		var coin = Math.floor(Math.random() * 2)
      if (coin == 0){
                                const embed = new discord.EmbedBuilder()
                          .setTitle("⤵️ Head ⤵️")
                          message.reply({embeds: [embed]})
      }else{
                                        const embed = new discord.EmbedBuilder()
                          .setTitle("⤴️ Tails ⤴️")
                          message.reply({embeds: [embed]})
      }	},
};