const discord = require("discord.js")
const fs = require("fs")
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageButton} = require("discord.js")
module.exports = {
  name: 'rolebutton',
  description: "Creates a role button",
  shown: true,
  args: "[@Rank]",
  permissions: ["ADMINISTRATOR"],
  async execute(client, args, msg) {
    let role = msg.mentions.roles.first()
    if(!role)return msg.reply("Please mention a role")
    let name = args[1] || "Claim"
    let rolereplace = role+"".replace("<@","").replace(">","").replace("<#","").replace("&","")
    const buttonRow = new ActionRowBuilder()
    buttonRow.addComponents(new ButtonBuilder().setCustomId("verify-"+rolereplace).setLabel(name).setEmoji("🛄").setStyle(ButtonStyle.Primary));
    msg.channel.send({ephemeral: true, components: [buttonRow] })
  },
};