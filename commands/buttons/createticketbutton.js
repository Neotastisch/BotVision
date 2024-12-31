const discord = require("discord.js")
const fs = require("fs")
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageButton} = require("discord.js")
module.exports = {
  name: 'ticketbutton',
  description: "Creates a ticket button",
  shown: true,
  permissions: ["ADMINISTRATOR"],
  async execute(client, args, msg) {
    const buttonRow = new ActionRowBuilder()
    buttonRow.addComponents(new ButtonBuilder().setCustomId("ticket-"+msg.guild.id).setLabel("Open").setEmoji("📰").setStyle(ButtonStyle.Primary));
    msg.delete()
    msg.channel.send({ephemeral: true, components: [buttonRow] })
  },
};