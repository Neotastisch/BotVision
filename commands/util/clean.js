const discord = require('discord.js')
module.exports = {
  name: 'clean',
  description: 'Deletes a specific ammount of messages',
  shown: true,
  args: "[Number]",
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, args, msg ) {
    let anzahl = args[0]
    if(isNaN(anzahl) != false || !anzahl){
      return msg.reply({content: "Please specify a number of messages"})
    }
    msg.channel.bulkDelete(anzahl++).catch(error => {
      msg.reply({content: "Error, something went wrong"})
    })
  msg.reply({content:"💥 Deleting "+anzahl+" messages 💥"}).then((msg2) => { setTimeout(() => msg2.delete(), 5000); })

  },
};