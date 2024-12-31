const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'iss',
  description: 'Shows you the location of the iss',
  shown: true,
  permissions: [],
  interactions: true,
  execute(client, args, message ) {
    fetch('http://api.open-notify.org/iss-now.json')
      .then(res => res.json())
      .then(async json =>{
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle("Click here")
        .setURL("https://www.google.de/maps/dir/"+json.iss_position.latitude+","+json.iss_position.longitude)
        .setColor('BLUE')
        message.reply({embeds: [memeEmbed]})
      })
  },
};