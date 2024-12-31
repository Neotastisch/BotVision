const path = require('path');

const { MessageAttachment, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async run(client, member) {
    try {
      // Get guild settings
      const joinRole = await client.getGuildSetting(member.guild.id, 'join_role');
      const welcomeChannel = await client.getGuildSetting(member.guild.id, 'welcome_channel');
      const joinMessage = await client.getGuildSetting(member.guild.id, 'join_message') || `Welcome to ${member.guild.name}`;

      if (joinRole && joinRole !== "None") {
        await member.roles.add(joinRole);
      }

      if (welcomeChannel && welcomeChannel !== "None") {
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle('Member Joined')
          .setDescription(joinMessage)
          .setTimestamp()

        const channel = member.guild.channels.cache.get(welcomeChannel);
        if (channel) {
          await channel.send({
            content: member.toString(),
            embeds: [embed]
          });
        }
      }
    } catch (err) {
      console.error('Error in guildMemberAdd event:', err);
    }
  }
}