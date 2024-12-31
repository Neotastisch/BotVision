const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "messageDelete",
    async run(client, message) {
        try {
            if (!message.guild) return;
            if (message.author?.bot) return;

            const logChannel = await client.getGuildSetting(message.guild.id, 'log_channel');
            if (!logChannel || logChannel === "None") return;

            const prefix = await client.getGuildSetting(message.guild.id, 'prefix') || '?';
            if (message.content.startsWith(prefix)) return;

            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Message Deleted')
                .setDescription(`Message from ${message.author.tag} was deleted in ${message.channel}`)
                .addFields(
                    { name: 'Content', value: message.content || 'No content' }
                )
                .setTimestamp();

            const channel = message.guild.channels.cache.get(logChannel);
            if (channel) {
                await channel.send({ embeds: [embed] });
            }
        } catch (err) {
            console.error('Error in message delete event:', err);
        }
    }
}