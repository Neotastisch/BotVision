const path = require('path');

const { MessageAttachment, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async run(client, interaction) {
    try {
      if (!interaction.isButton()) return;
      if (!interaction.guild) return;

      const prefix = await client.getGuildSetting(interaction.guild.id, 'prefix') || '?';
      const [command, ...args] = interaction.customId.split('_');

      const cmd = client.commands.get(command);
      if (!cmd) return;

      try {
        await cmd.buttonHandler(client, interaction, args, prefix);
      } catch (err) {
        console.error('Error handling button interaction:', err);
        await interaction.reply({
          content: 'There was an error handling this button interaction.',
          ephemeral: true
        }).catch(console.error);
      }
    } catch (err) {
      console.error('Error in button handler event:', err);
    }
  }
};