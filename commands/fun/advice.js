const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'advice',
  interactions: true,
  description: 'Gives you an random advice',
  shown: true,
  permissions: [],
  execute(client, args, message ) {
    const msg = message
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(async json =>{
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle("🤔 Advice "+json.slip.id+" 🤔")
        .setDescription(json.slip.advice)
        .setTimestamp()
        .setColor('BLUE')
        .setFooter({text:`Advice ID: ${json.slip.id}`})
        msg.reply({embeds: [memeEmbed]})
      })
  },
};