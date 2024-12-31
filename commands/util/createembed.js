const discord = require('discord.js');
const fs = require('fs');
module.exports = {
  name: 'embed',
  description: 'Creates an embed',
  shown: true,
  args: "[Channel]",
  permissions: ["ADMINISTRATOR"],
  async execute(client, args, msg ) {
    const channel = msg.mentions.channels.first() || msg.channel
    let embed = new discord.EmbedBuilder()
  
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
        embed.setFooter({ text: "This message is written by the administrator/s of this server. This bot has no influence on the content of this message"});
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
  },
};