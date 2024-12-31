const discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
  name: 'spacex',
  description: 'Shows information about spacex`s launches',
  shown: true,
  permissions: [],
  args: "[value]",
  execute(client, args, message ) {
    const msg = message
    if(args[0] == "next"){
    fetch('https://api.spacexdata.com/v5/launches/next')
      .then(res => res.json())
      .then(async json => {
        let time = json.date_utc.replace("T"," ")
        let split = time.split(":")
        let final = split[0]+":"+split[1]
        const memeEmbed = new discord.EmbedBuilder()
          .setTitle(json.name+ " Mission")
          .setURL(json.youtube_id || "https://www.youtube.com/c/SpaceX")
          .setThumbnail(json.links.patch.small || "https://www.schulz-grafik.de/wp-content/uploads/2018/03/placeholder-300x300.png")
          .setDescription(json.details || "No details.")
          .setFooter({text: "UTC: "+final})
          .setColor('BLUE')

        msg.reply({embeds: [memeEmbed]})
      })
    }else if(args[0] == "past"){
      fetch('https://api.spacexdata.com/v5/launches/latest')
      .then(res => res.json())
      .then(async json => {
        let time = json.date_utc.replace("T"," ")
        let split = time.split(":")
        let final = split[0]+":"+split[1]
        const memeEmbed = new discord.EmbedBuilder()
          .setTitle(json.name+ " Mission"+ " ("+json.flight_number+")")
          .setURL(json.youtube_id || "https://www.youtube.com/c/SpaceX")
          .setThumbnail(json.links.patch.small || "https://www.schulz-grafik.de/wp-content/uploads/2018/03/placeholder-300x300.png")
          .setDescription(json.details || "No details.")
          .addField("Reused",json.cores[0].reused.toString() || "Unknown")
          .setFooter({text:"UTC: "+final})
          .setColor('BLUE')
          
          if(json.cores[0].landing_attempt == true){
            memeEmbed.addField("Successfull Landing",json.cores[0].landing_success.toString() || "Unknown")
          }

        msg.reply({embeds: [memeEmbed]})
      })
        }else{
          message.reply({embeds: [client.usage(message.guild.id,module.exports.name,module.exports.args)]})
        }
  },
};