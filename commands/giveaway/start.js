const discord = require('discord.js')
const ms = require('ms');
module.exports = {
  name: 'gstart',
  description: 'Starts the giveaway 🎉',
  shown: true,
  permissions: [],
  args: "[#channel] [Duration] [Winners] [Prize]",
  execute(client, args, message ) {
    let usage = "Usage: ?gstart [#channel] [Duration (H,D,M,Y)] [Winners (1,2,...)] [Prize to win]"
    const msg = message
    const serverstats = client.data
    var cmd = message.content
    let prefix = serverstats[message.guild.id].prefix
		if(prefix == undefined)prefix = "?"
        const channel = message.mentions.channels.first()
        const duration = args[1]
        const winners = args[2]
        const prize = args.slice(3).join(" ")
        if (!channel || !duration || !winners || !prize) return message.reply({embeds: [client.usage(message.guild.id,module.exports.name,module.exports.args)]})

        client.giveaway.start(channel, {
          duration: ms(duration),
          prize: prize,
          winnerCount: parseInt(winners),
          hostedBy: message.author.username,
          messages: {
            giveaway: (true ? "@everyone\n\n" : '') + "🥳 Giveaway 🥳",
            giveawayEnd: (true ? "@everyone\n\n" : '') + "Giveaway Ended",
            timeRemaining: "Time Remaining **{duration}**",
            inviteToParticipate: "React with 🤝 to join the giveaway",
            winMessage: "Congrats {winners}, you have won the giveaway",
            embedFooter: "Giveaway Time!",
            noWinner: "❌ Could not determine a winner ❌",
            hostedBy: 'Hosted by '+message.author.toString(),
            winners: "Winners",
            endedAt: 'Ends at',
            lastChance: {
              enabled: true,
              content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
              threshold: 5000,
              embedColor: '#FF0000'
            },
            units: {
              seconds: "seconds",
              minutes: "minutes",
              hours: 'hours',
              days: 'days',
              pluralS: false
            }
          },

        })
        message.channel.send({content:`Giveaway is starting in ${channel}`})
        
  },
};