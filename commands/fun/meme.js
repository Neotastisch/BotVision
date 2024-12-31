const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'meme',
  description: 'Gives you a random meme 🤣',
  shown: true,
  permissions: [],
  interactions: true,
  execute(client, args, message ) {
    const msg = message
    fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(async json => {
        const memeEmbed = new discord.EmbedBuilder()
          .setTitle(json.title + " 🤣")
          .setImage(json.url)
          .setTimestamp()
          .setColor('BLUE')
          .setFooter({text:`Link: ${json.postLink} | Subreddit: ${json.subreddit}`})
        msg.reply({embeds: [memeEmbed]})
      })
  },
};