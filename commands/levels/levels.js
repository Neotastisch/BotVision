const discord = require("discord.js")
module.exports = {
    name: 'level',
    description: 'Shows your level and xp 🎚️',
    shown: true,
    interactions: true,
    permissions: [],
    execute(client, args, msg) {
        const bot = msg.client
        const { levels } = msg.client


        let user = msg.mentions.users.first() || msg.author

        if (levels[msg.guild.id]?.[user.id] == undefined) { msg.channel.send("There is no data for " + user.username + " in our database."); return }
        const embed = new discord.EmbedBuilder()
            .setTitle("🎚️ Level card 🎚️")

            .addFields([
            {name: "Level: ", value: levels[msg.guild.id][user.id].level+"."},
            {name:"XP: ", value: levels[msg.guild.id][user.id].xp +"."},
            {name: "XP till next level:  ", value: levels[msg.guild.id][user.id].reqxp+"."}
            ])
        msg.reply({embeds: [embed]})

    },
};