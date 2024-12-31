const discord = require('discord.js');
const fs = require('fs');
module.exports = {
  name: 'embed',
  description: 'Creates an embed',
  shown: true,
  neoonly: false,
  args: "[Channel]",
  permissions: ["ADMINISTRATOR"],
  async execute(client, args, msg ) {
    const channel = msg.mentions.channels.first() || msg.channel
    let embed = new discord.EmbedBuilder()
    if(args[0] == "maintanance"){
      if(!msg.author.id == client.neoid)return msg.reply("Invalid command")

      client.maintanance = true
      let maintanancef = client.maintanancefile
      maintanancef.active = true
      let datan = JSON.stringify(maintanancef);
      fs.writeFileSync(client.maintanancefilelocation, datan);

      embed.setTitle("**Maintanance** now")
      embed.setDescription("BotVision is now undergoing maintance, usage in this time is not recommended.")
      embed.setThumbnail('https://www.instandhaltung.de/assets/images/a/predictive_maintenance_fabrik-84b1b82a.webp')
      embed.setColor(0xFF0000)
      embed.setFooter({ text: 'BotVision'});
      channel.send({embeds: [embed]})
      return
    }else if(args[0] == "maintanancecomplete"){
      if(!msg.author.id == client.neoid)return msg.reply("Invalid command")

      client.maintanance = false
      let maintanancef = client.maintanancefile
      maintanancef.active = false
      let datan = JSON.stringify(maintanancef);
      fs.writeFileSync(client.maintanancefilelocation, datan);

      embed.setTitle("**Maintanance** complete!")
      embed.setDescription("BotVision is now fully operational.")
      embed.setColor(0x00FF00)
      embed.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/149px-Lime_checkbox-checked.svg.png')
      embed.setFooter({ text: 'BotVision'});
      channel.send({embeds: [embed]})
      return
    }else{
    const filter = (m) => m.author.id === msg.author.id;

    const titlem = await msg.channel.send("What should the title be?")

    msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(async collections => {
      let title = collections.first()
      const desm = await msg.channel.send("What should the description be?")
      msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(async collections => {
        let description = collections.first()
        embed.setTitle(title.content)
        embed.setDescription(description.content)
        if(!msg.author.id == client.neoid){
        embed.setFooter({ text: "This message is written by the administrator/s of this server. BotVision has no influence on the content of this message"});
        }else{
          embed.setColor(0xFF0000)
          embed.setThumbnail("https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6d7eabc1ba2d913aad0ee9afca62868c~c5_100x100.jpeg?x-expires=1665774000&x-signature=69vDjjtvhpWcmgyR75vk6SNN7GQ%3D")
          embed.setFooter({ text: 'BotVision'});
        }
        titlem.delete();
        desm.delete();
        title.delete();
        description.delete();
        msg.delete();
        channel.send({embeds: [embed]})
      })
    })
  }
  },
};