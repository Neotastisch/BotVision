const path = require('path');

const { MessageAttachment, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  once: false,
  run: async(client, interaction) => {
    if (!interaction.isButton()) return;
    let split = interaction.customId.split("-")
    if(split[0] == "ticket"){
      interaction.reply({ content: 'Ticket has been opened.', ephemeral: true });
    let guild = interaction.guild
    var tchannel = await guild.channels.create({name: "🎟️ticket-" + interaction.user.tag + "🎟️", type: ChannelType.GuildText})
    if(client.data[interaction.guild.id].staffrole == "None"){
    tchannel.edit({
      permissionOverwrites:[{
        id: interaction.user,
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      },
      {
      id: guild.roles.everyone,
      deny: ['VIEW_CHANNEL'],
      },
    ],
  })
}else{
  tchannel.edit({
    permissionOverwrites:[{
      id: interaction.user,
      allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    },
    {
    id: guild.roles.everyone,
    deny: ['VIEW_CHANNEL'],
    },
    {
    id: client.data[interaction.guild.id].staffrole,
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    }
  ],
})
}
    tchannel.setTopic("" + interaction.user.id + "")
    let tag = interaction.user.toString()
    if(client.data[interaction.guild.id].staffrole !== "None"){
     tag = interaction.user.toString()+", <@&"+client.data[interaction.guild.id].staffrole+">"
    }
    const Embed = new EmbedBuilder()
      .setTitle("🎟️Ticket🎟️")
      .setDescription("Thank you for contacting support, please write your problem here. If your problem is solved, write \"?close\"")
      .setTimestamp()
      .setColor('BLUE')
    tchannel.send({content: tag, embeds: [Embed]})
    }
   
  },
};