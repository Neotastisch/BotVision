const path = require('path');

const { MessageAttachment, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  async run(client, member) {
    try {
      const leaveChannel = await client.getGuildSetting(member.guild.id, 'leave_channel');
      
      if (leaveChannel && leaveChannel !== "None") {
        const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Member Left')
          .setDescription(`${member.user.tag} has left the server`)
          .setTimestamp()

        const channel = member.guild.channels.cache.get(leaveChannel);
        if (channel) {
          await channel.send({ embeds: [embed] });
        }
      }
    } catch (err) {
      console.error('Error in guildMemberRemove event:', err);
    }
  }
};