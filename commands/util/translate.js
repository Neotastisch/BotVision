const discord = require('discord.js')
const fetch = require("node-fetch")
var translate = require('translation-google');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'translate',
  description: 'Can translate anything',
  shown: true,
  permissions: [],
  args: "[To] [Text]",
  execute(client, args, message ) {
    const texttotranslate = args.join(" ").replace(args[0]+" ","")
    if (args[1] !== undefined && args[0] !== undefined) {
        translate(texttotranslate, { to: args[0] }).then(resul => {
            const exampleEmbed = new EmbedBuilder()
	        .setColor('#0099ff')
	        .setTitle(resul.text)
	        .setDescription(texttotranslate)
          message.reply({embeds:[exampleEmbed]})
        }).catch(err => {
            console.error(err);
            message.reply({content:"Error"})
        });
    } else {
        message.reply({content:"Expecting msg / language"})
    }
  },
};