const discord = require('discord.js')
const { ActionRowBuilder,ButtonBuilder,ButtonStyle } = require('discord.js');
module.exports = {
  name: 'invite',
  description: 'Lets you invite the bot',
  shown: true,
  interactions: true,
  neoonly: false,
  permissions: [],
  async execute(client, args, msg ) {
const message = msg

// 
const row = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder()
					.setURL("https://discord.com/api/oauth2/authorize?client_id=825657062041583628&permissions=8&scope=bot%20applications.commands")
					.setLabel('Invite')
					.setStyle(ButtonStyle.Link),
			)
      .addComponents(
        new ButtonBuilder()
					.setURL("http://botvision.gq/")
					.setLabel('Website')
					.setStyle(ButtonStyle.Link),
			)
      .addComponents(
        new ButtonBuilder()
					.setURL("https://discord.gg/E7wKzpCuM4")
					.setLabel('Support Server')
					.setStyle(ButtonStyle.Link),
			);
const m = await message.reply({content: "**Invite BotVision now!**", components: [row]})
  },
};