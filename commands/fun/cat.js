const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'cat',
  description: 'Gives you a random cat photo',
  shown: true,
  permissions: [],
  interactions: true,
  execute(client, args, message ) {
    const msg = message
    fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json())
      .then(async json => {
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle("Cat 🐱")
        .setImage(json[0].url)
        .setTimestamp()
        .setColor('BLUE')
        .setFooter({text:`Link: ${json[0].url}`})
        msg.reply({embeds: [memeEmbed]})
      })
  },
};