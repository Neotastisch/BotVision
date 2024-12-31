const path = require('path');
const discord = require("discord.js")
const fs = require('fs')

module.exports = {
    name: 'messageCreate',
    description: "Leveling system",
    run: async (client, msg) => {
        if (msg.author.bot) return;
        if (msg.channel.type === 'dm') return;

        // Check if leveling is enabled for this guild
        const guildSettings = await new Promise((resolve) => {
            client.db.get('SELECT * FROM guild_settings WHERE guild_id = ?', [msg.guild.id], (err, row) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                }
                resolve(row);
            });
        });

        if (!guildSettings || guildSettings.levelsystem !== 'On') return;

        // Get user's current level data
        const addXP = Math.floor(Math.random() * 8) + 3;
        
        client.db.get('SELECT * FROM user_levels WHERE user_id = ? AND guild_id = ?', 
            [msg.author.id, msg.guild.id], 
            async (err, row) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (!row) {
                    // Create new user entry
                    client.db.run('INSERT INTO user_levels (user_id, guild_id, xp, level) VALUES (?, ?, ?, ?)',
                        [msg.author.id, msg.guild.id, addXP, 0]);
                    return;
                }

                const newXP = row.xp + addXP;
                const reqXP = 100 * Math.pow(1.25, row.level);

                if (newXP >= reqXP) {
                    // Level up
                    const newLevel = row.level + 1;
                    client.db.run('UPDATE user_levels SET xp = ?, level = ? WHERE user_id = ? AND guild_id = ?',
                        [newXP - reqXP, newLevel, msg.author.id, msg.guild.id]);

                    const embed = new discord.EmbedBuilder()
                        .setColor('Yellow')
                        .setTitle("🆙 " + msg.author.tag + " leveled up! 🆙")
                        .setDescription("to level 🌟**" + newLevel + "**🌟!")
                    msg.reply({ embeds: [embed] });
                } else {
                    // Just update XP
                    client.db.run('UPDATE user_levels SET xp = ? WHERE user_id = ? AND guild_id = ?',
                        [newXP, msg.author.id, msg.guild.id]);
                }
            }
        );
    },
};