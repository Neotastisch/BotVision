const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'dog',
  description: 'Gives you a random dog photo',
  shown: true,
  permissions: [],
  interactions: true,
  execute(client, args, message ) {
    const msg = message
    fetch('https://api.thedogapi.com/v1/images/search')
      .then(res => res.json())
      .then(async json => {
        console.log(json);
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle("Dog 🐶")
        .setImage(json[0].url)
        .setTimestamp()
        .setColor('BLUE')
        .setFooter({text:`Link: ${json[0].url}`})
        msg.reply({embeds: [memeEmbed]})
      })
  },
};