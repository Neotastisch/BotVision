module.exports = {
    name: "messageCreate",
    async run(client, message) {
        try {
            if (message.author.bot) return;
            if (!message.guild) return;

            const prefix = await client.getGuildSetting(message.guild.id, 'prefix') || '?';
            
            if (!message.content.startsWith(prefix)) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            
            if (cmd.length === 0) return;
            
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            
            if (command) {
                try {
                    await command.run(client, message, args);
                } catch (err) {
                    console.error('Error executing command:', err);
                    message.reply('There was an error executing that command.').catch(console.error);
                }
            }
        } catch (err) {
            console.error('Error in messageCreate event:', err);
        }
    }
}