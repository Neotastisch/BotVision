const path = require('path');

const { MessageAttachment, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  once: false,
  run: async(client, interaction) => {
    if (!interaction.isButton()) return;
    let split = interaction.customId.split("-")
    if(split[0] == "verify"){
      interaction.reply({ content: 'Success!', ephemeral: true });
      const member = interaction.member;
    member.roles.add(split[1])
    }
  },
};