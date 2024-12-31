const discord = require('discord.js')
module.exports = {
  name: 'jointocreate',
  description: 'Join-To-Create help',
  shown: true,
  permissions: [],
  execute(client, args, message ) {
    const msg = message
    message.reply("To create a Join-To-Create channel, just name any channel with the content: \"JoinToCreate\" in this exact spelling. Example: 👼│JoinToCreate")
  },
};