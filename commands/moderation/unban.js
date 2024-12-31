const discord = require('discord.js')
module.exports = {
  name: 'unban',
  description: 'Unbans a player',
  shown: false,
  permissions: ["BAN_MEMBERS"],
  execute(client, args, msg ) {
    var { member, mentions } = msg;

    const target = args[0]
    if (target != "") {
        try {
            banembed(msg, args[0], target)
        } catch {
            const embed = new discord.EmbedBuilder()
                .setColor('#ff0000')
                .setTitle("Error")
                .addField("Error: ", "❌ I have no permission, try put my rank on top of all ranks ❌")
            msg.reply({embeds: [embed]}).then(msg => msg.delete({ timeout: "5000" }))
        }
    } else {
        const embed = new discord.EmbedBuilder()
            .setColor('#ff0000')
            .setTitle("❌ Error ❌")
            .addField("Error: ", "Invalid args")
            .addField("Usage:", module.usage)
        msg.reply({embeds: [embed]}).then(msg => msg.delete({ timeout: "5000" }))
    }



    function banembed(msg, user2, username) {
        const embed = new discord.EmbedBuilder()
            .setAuthor("⚒️ " + username + " has been unbanned ⚒️")
        msg.channel.send({embeds: [embed]})


        msg.guild.members.unban(user2)
    }

  },
};