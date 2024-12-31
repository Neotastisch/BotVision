const discord = require('discord.js')
module.exports = {
  name: 'timeout',
  description: 'Times a player out',
  shown: false,
  permissions: ["KICK_MEMBERS"],
  execute(client, args, message ) {

    var bot = client
    let msg = message
    const target = message.mentions.members.first()
    if (message.mentions.members.first()) {
        try {
            let timeout = parseInt(args[1]) || 1
            const targetmember = msg.guild.members.cache.get(target.id)
            var grund = args.slice(2)
            var real = grund.toString()
            var final = real.replace(/,/g, " ")
            banembed(msg, targetmember, final, msg.guild.id, target.user.username+"#"+target.user.discriminator, msg.guild, timeout)
            targetmember.timeout(timeout * 60 * 1000)
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



    function banembed(msg, user2, grund, guildid, username, guild, timeout) {

        const embed = new discord.EmbedBuilder()
            .setAuthor(username + " has been sent to a timeout for "+timeout+" minute/s.", bot.guilds.resolve(guildid).members.resolve(user2.id).user.avatarURL())
        if (grund == "") { embed.setDescription("**Reason:** Unspecified") } else { embed.setDescription("**Reason:** " + grund) }
        msg.channel.send({embeds: [embed]})
        user2.send("You have gotten a timeout from " + guild.name + "("+timeout+" minute/s), better stop.")
        if (grund == "") {
        } else {
            user2.send("**Reason:** " + grund)
        }


    }

  },
};