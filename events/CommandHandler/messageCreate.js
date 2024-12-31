const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
        try {
            // Get prefix from SQLite database, default to '?' if not set
            const prefix = await new Promise((resolve, reject) => {
                client.db.get('SELECT prefix FROM guild_settings WHERE guild_id = ?', [message.guild.id], (err, row) => {
                    if (err) reject(err);
                    resolve(row ? row.prefix : '?');
                });
            });
        
            const args = message.content.trim().slice(prefix.length).split(" ")
            const command = args.shift().toLowerCase()

            if (!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;

            if(client.maintanance == true) return message.reply({embeds: [client.maintananceEmbed]})
            let cmd = client.commands.get(command || client.aliases.get(command))
            if(!cmd) return;
            
            if(cmd.permissions) {
                cmd.permissions.forEach(permission => {
                    if(!message.member.permissions.has(permission)){
                        return message.reply({embeds: [client.noperms]})
                    } 
                });
            }
            
            client.used = true
            cmd.execute(client, args, message)
   
        } catch(err) {
            console.log("Error in messageCreate.js:");
            console.log(err);
        }
    }
}