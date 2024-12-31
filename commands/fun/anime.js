const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'anime',
  description: 'Gives you a random anime picture',
  shown: true,
  interactions: true,
  permissions: [],
  execute(client, args, message ) {
    var random = Math.floor(Math.random() * 10000)
    fetch('https://kitsu.io/api/edge/anime?page[offset]='+random)
      .then(res => res.json())
      .then(async json =>{
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle(json.data[0].attributes.titles.en_jp)
        .setImage(json.data[0].attributes.posterImage.original)
        .setTimestamp()
        .setColor('BLUE')
        .setFooter({text:`Link: ${json.data[0].attributes.posterImage.original} | ${json.data[0].attributes.titles.ja_jp}`})
        message.reply({embeds: [memeEmbed]})
      })
  },
};