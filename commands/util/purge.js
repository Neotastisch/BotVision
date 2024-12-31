const discord = require('discord.js')
module.exports = {
  name: 'purge',
  description: 'Purges the channel',
  shown: true,
  neoonly: true,
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, args, msg ) {
    msg.reply("💥 Purging messages... 💥")
    const nukeChannel = msg.channel
    if (!nukeChannel.deletable) return msg.reply("❌ Channel can not be purged ❌")
    await nukeChannel.clone().catch(err => console.log(err))
    await nukeChannel.delete("💥 Nuked by " + msg.author.username + " 💥").catch(err => console.log(err))
  },
};