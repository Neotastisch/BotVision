const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "messageCreate",
    async run(client, message) {
        try {
            if (!message.guild) return;

            // Initialize default settings if they don't exist
            const settings = {
                welcome_channel: await client.getGuildSetting(message.guild.id, 'welcome_channel'),
                leave_channel: await client.getGuildSetting(message.guild.id, 'leave_channel'),
                prefix: await client.getGuildSetting(message.guild.id, 'prefix'),
                staff_role: await client.getGuildSetting(message.guild.id, 'staff_role'),
                join_role: await client.getGuildSetting(message.guild.id, 'join_role'),
                log_channel: await client.getGuildSetting(message.guild.id, 'log_channel'),
                join_message: await client.getGuildSetting(message.guild.id, 'join_message')
            };

            // Set default values if they don't exist
            if (!settings.welcome_channel) {
                await client.setGuildSetting(message.guild.id, 'welcome_channel', 'None');
            }
            if (!settings.leave_channel) {
                await client.setGuildSetting(message.guild.id, 'leave_channel', 'None');
            }
            if (!settings.prefix) {
                await client.setGuildSetting(message.guild.id, 'prefix', '?');
            }
            if (!settings.staff_role) {
                await client.setGuildSetting(message.guild.id, 'staff_role', 'None');
            }
            if (!settings.join_role) {
                await client.setGuildSetting(message.guild.id, 'join_role', 'None');
            }
            if (!settings.log_channel) {
                await client.setGuildSetting(message.guild.id, 'log_channel', 'None');
            }
            if (!settings.join_message) {
                await client.setGuildSetting(message.guild.id, 'join_message', `Welcome to ${message.guild.name}`);
            }
        } catch (err) {
            console.error('Error in init message event:', err);
        }
    }
}
