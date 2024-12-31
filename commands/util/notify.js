const discord = require('discord.js')
module.exports = {
  name: 'notify',
  description: '',
  shown: false,
  neoonly: true,
  permissions: [],
  execute(client, args, message ) {
    
    const msg = message
    const input = args.slice(0).join(" ")
    if(!input){
      message.reply("No input defined")
      return;
    }
    client.guilds.cache.forEach((guild) => {
      try{
      const channel = client.channels.cache.get(client.data[guild.id].logchannel);
      channel.send({ content: input });
      }catch(err){
        console.log("Error");
      }  
  });
  },
};