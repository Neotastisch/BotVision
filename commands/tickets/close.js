const discord = require("discord.js")
const { MessageAttachment, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const fs = require("fs")
module.exports = {
  name: 'close',
  description: 'closes a ticket 🎟️',
  shown: false,
  permissions: [],
  interactions: true,
  async execute(client, args, msg, slashcommand) {
    const { member } = msg
    const bot = msg.client
    let tchannel = msg.channel
    let guild = msg.guild
    if (member.permissions.has("MANAGE_MESSAGES")) {
      if (msg.channel.name.includes("ticket-")) {
        {
          if (msg.channel.topic === "❌CLOSED❌") {
            if(slashcommand == true) msg.deferReply();
            msg.channel.send({content:"❌ Deleting channel in 5 seconds... ❌"})
            setTimeout(function () {
              msg.channel.delete()
            }, 5000);

          } else {
            let user = bot.users.fetch(msg.channel.topic);
            tchannel.permissionOverwrites.set([
            {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel], 
            },
          ]);
            msg.channel.send({content:"❌ The channel was closed by " + msg.author.tag + ", type ?close again to delete this channel ❌"})
            if(slashcommand == true) msg.deferReply();
            msg.channel.setTopic("❌CLOSED❌")
            return
          }
        }
      }
    }
    if (msg.channel.topic == "" + msg.author.id + "") {
      tchannel.permissionOverwrites.set([
        {
        id: interaction.user.id,
        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], 
      },
      {
      id: guild.id,
      deny: [PermissionsBitField.Flags.ViewChannel], 
      },
      {
        id: client.data[interaction.guild.id].staffrole.id,
        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], 
        },
    ]);
      msg.channel.send({content:"❌ The channel was closed by " + msg.author.tag + ", type ?close again to delete this channel ❌"})

      msg.channel.setTopic("❌CLOSED❌")
    }
  },
};