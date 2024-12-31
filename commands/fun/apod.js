const discord = require('discord.js')
const fetch = require("node-fetch")
const { nasa_api_key } = require('../../botconfig.json');

module.exports = {
  name: 'apod',
  description: 'Gives you the Astronomy Picture of the Day',
  shown: true,
  interactions: true,
  permissions: [],
  execute(client, args, message ) {
    const msg = message
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasa_api_key}`)
      .then(res => res.json())
      .then(async json => {
        const memeEmbed = new discord.EmbedBuilder()
          .setTitle(json.title)
          .setImage(json.hdurl)
          .setDescription(json.explanation)
          .setColor('BLUE')
          .setFooter({text:`Copyright: ${json.copyright || "Nasa"} | Date of image: ${json.date}`})
        msg.reply({embeds: [memeEmbed]})
      })
  },
};