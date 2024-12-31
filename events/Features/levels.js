const path = require('path');
const discord = require("discord.js")
const fs = require('fs')
module.exports = {
    name: 'messageCreate',
    description: "Leveling system",
    run: (client, msg) => {
        if (msg.author.bot) return
        var { levels } = client
        const bot = client
        if(msg.channel.type === 'dm')return
        if(!client.data[msg.guild.id])return
        if(!client.data[msg.guild.id].levelsystem == "On")return
        if(!levels) levels = {}
        var addXP = Math.floor(Math.random() * 8) + 3;
        if (!levels[msg.guild.id]) {
            levels[msg.guild.id] = {}
        }
        if (!levels[msg.guild.id][msg.author.id]) {
            levels[msg.guild.id][msg.author.id] = {
                level: 0,
                xp: 0,
                reqxp: 100,
                username: msg.author.username
            }
        }

        levels[msg.guild.id][msg.author.id].xp += addXP;
        if (levels[msg.guild.id][msg.author.id].xp > levels[msg.guild.id][msg.author.id].reqxp) {
            levels[msg.guild.id][msg.author.id].xp -= levels[msg.guild.id][msg.author.id].reqxp;
            levels[msg.guild.id][msg.author.id].reqxp *= 1.25;
            levels[msg.guild.id][msg.author.id].reqxp = Math.floor(levels[msg.guild.id][msg.author.id].reqxp)
            levels[msg.guild.id][msg.author.id].level += 1;

            const embed = new discord.EmbedBuilder()
                .setColor('YELLOW')
                .setTitle("🆙 " + msg.author.tag + " leveled up! 🆙")
                .setDescription("to level 🌟**" + levels[msg.guild.id][msg.author.id].level + "**🌟!")
            msg.reply({ embeds: [embed]})

            fs.writeFile("./levels.json", JSON.stringify(levels, null, "\t"), function (err) {
                if (err) console.log(err)
            })
        }
        




    },
};