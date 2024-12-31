const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async run(client, interaction) {
        try {
            if (!interaction.isCommand()) return;
            if (!interaction.guild) return;

            const prefix = await client.getGuildSetting(interaction.guild.id, 'prefix') || '?';
            const command = interaction.commandName;

            const cmd = client.commands.get(command);
            if (!cmd) return;

            if (cmd.permissions) {
                for (const permission of cmd.permissions) {
                    if (!interaction.member.permissions.has(permission)) {
                        return interaction.reply({ 
                            embeds: [client.noperms],
                            ephemeral: true 
                        });
                    }
                }
            }

            try {
                await cmd.execute(client, interaction.options.data, interaction);
            } catch (err) {
                console.error('Error executing slash command:', err);
                await interaction.reply({
                    content: `This slash command isn't fully supported yet, please use ${prefix}${interaction.commandName}`,
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Error in slash command handler:', err);
        }
    }
}