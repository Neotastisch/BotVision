const discord = require('discord.js')
const ball = ['It is certain.','It is decidedly so.','Without a doubt.','Yes — definitely.','You may rely on it.','As I see it, yes.','Most likely.','Outlook good.','Yes.','Signs point to yes.','Reply hazy, try again.','Ask again later.','Better not tell you now.','Cannot predict now.','Concentrate and ask again.','Don’t count on it.','My reply is no.','My sources say no.','Outlook not so good.','Very doubtful.']
module.exports = {
  name: '8ball',
  description: 'Gives you an random answer',
  shown: true,
  interactions: true,
  permissions: [],
  execute(client, args, message ) {
    const msg = message
        const memeEmbed = new discord.EmbedBuilder()
        .setTitle(ball[Math.floor(Math.random() * ball.length)])
        msg.reply({embeds: [memeEmbed]})
  },
};