const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'setup',
    description: 'Configure server settings',
    async run(client, message, args) {
        try {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return message.reply({ embeds: [client.noperms] });
            }

            const settings = {
                'welcome_channel': 'Channel for welcome messages',
                'leave_channel': 'Channel for leave messages',
                'prefix': 'Command prefix',
                'staff_role': 'Staff role',
                'join_role': 'Auto-assign role for new members',
                'log_channel': 'Channel for logging events',
                'join_message': 'Welcome message for new members'
            };

            if (args.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Server Settings')
                    .setDescription(`To edit a setting use: ${await client.getGuildSetting(message.guild.id, 'prefix')}setup [setting] [value]`);

                for (const [setting, description] of Object.entries(settings)) {
                    const value = await client.getGuildSetting(message.guild.id, setting) || 'None';
                    embed.addFields({ name: setting, value: `${description}\nCurrent value: ${value}` });
                }

                return message.reply({ embeds: [embed] });
            }

            const setting = args[0].toLowerCase();
            if (!Object.keys(settings).includes(setting)) {
                return message.reply('Invalid setting. Use the command without arguments to see available settings.');
            }

            const value = args.slice(1).join(' ');
            if (!value) {
                return message.reply('Please provide a value for the setting.');
            }

            await client.setGuildSetting(message.guild.id, setting, value);
            return message.reply(`Successfully updated ${setting} to: ${value}`);

        } catch (err) {
            console.error('Error in setup command:', err);
            message.reply('An error occurred while updating the settings.');
        }
    }
}