const discord = require('discord.js')
module.exports = {
  name: 'ban',
  description: 'Bans a player',
  shown: false,
  permissions: ["BAN_MEMBERS"],
  execute(client, args, message ) {
    var bot = client
    let msg = message
    const target = message.mentions.members.first()
    if (message.mentions.members.first()) {
        try {
            const targetmember = msg.guild.members.cache.get(target.id)
            var grund = args.slice(1)
            var real = grund.toString()
            var final = real.replace(/,/g, " ")
            banembed(msg, targetmember, final, msg.guild.id, target.user.username+"#"+target.user.discriminator, msg.guild)
            targetmember.ban(grund)
        } catch {
            const embed = new discord.EmbedBuilder()
                .setColor('#ff0000')
                .setTitle("❌ Error ❌")
                .addField("Error: ", "I have no permission, try put my rank on top of all ranks")
                msg.reply({embeds: [embed]}).then(msg => msg.delete({ timeout: "5000" }))

            msg.reply({embeds: [embed]})
        }
    } else {
        const embed = new discord.EmbedBuilder()
            .setColor('#ff0000')
            .setTitle("❌ Error ❌")
            .addField("Error: ", "Invalid args")
            .addField("Usage:", module.usage)
        msg.reply({embeds: [embed]}).then(msg => msg.delete({ timeout: "5000" }))
    }



    function banembed(msg, user2, grund, guildid, username, guild) {

        const embed = new discord.EmbedBuilder()
            .setAuthor(username + " has been banned. 🔨", bot.guilds.resolve(guildid).members.resolve(user2.id).user.avatarURL())
        if (grund == "") { embed.setDescription("**Reason:** Unspecified") } else { embed.setDescription("**Reason:** " + grund) }
        embed.setFooter("To unban type: \"?unban " + user2.id + "\"")
        msg.channel.send({embeds: [embed]})
        user2.send("You got banned from " + guild.name + "🔨")
        if (grund == "") {
        } else {
            user2.send("**Reason:** " + grund)
        }


    }

  },
};