const discord = require("discord.js")
const {ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js")
module.exports = {
      name: 'help',
      shown: false,
      interactions: true,
      //aliases: [],
      permissions: [],
      
      description: 'Shows a help page with all accessable commands ❓',

      async execute(client, args, message, slashcommand) {
            try{
            const msg = message
            const { commands } = client;
            const { member } = msg

            let prefix = await client.data.get(message.guild.id+"-PREFIX")
            
            if (prefix == undefined) prefix = "?"


            const max = 11

            let embed = new discord.EmbedBuilder()
            embed.setTitle("❓ Help Menu ❓")
            embed.setDescription("🤖 Select a page. 🤖")
            embed.setThumbnail("https://lh3.googleusercontent.com/yV9YRt1BZDdvzCMSHTHUKZBanQjifiJdm1rUKj9rM4YoZyHFcq4agj78yWP3LdFHDL_0lSo=s85")
            let commandsl = 0
            commands.forEach(el => {
                  if (el.perm === undefined) { el.perm = ""}
                  if (el.shown === undefined) { }
                  if (el.shown === false) { return }
                  if (!member.permissions.has(el.perm)) { return }
                  commandsl++
            })

            const put = Math.ceil(commandsl / max)
            const buttonRow = new ActionRowBuilder();
            let user = message.author.id || message.user.id
            let randomid = Math.random() * (100000000000000000000000 - 1) + 1
            for (let step = 0; step < put; step++) {
                  const plus = step + 1
                  buttonRow.addComponents(new ButtonBuilder().setCustomId(plus+"-"+randomid).setLabel("Page"+plus).setEmoji("📰").setStyle(ButtonStyle.Primary));
            }
            const m = await message.reply({ embeds: [embed], components: [buttonRow] })


                  let interactionC = interaction =>{
                  if (!interaction.isButton()) return;
                  if(interaction.user.id != user)return;
                  let cnt = interaction.customId
                  let randomitsplit = cnt.split('-')[1];
                  if(randomitsplit != randomid)return;
                  let formel = parseInt(cnt[0])
                  let formel2 = Math.round(formel * max) - 11;
                  let bisat = formel2 + max
                  const newcreated = createembed(formel2, bisat, formel, put, commandsl)
                  const newembed = newcreated.embed
                  interaction.update({embeds: [newembed]})
            }
            client.on('interactionCreate', interactionC);
            setTimeout(() => {
                  client.removeListener('interactionCreate', interactionC);
            },600000);

            function createembed(startat, bisat, count2, put, commandsforyou) {
                  let embed = new discord.EmbedBuilder()
                  embed.setTitle("❓ Help Menu Page " + count2 + " ❓")
                  embed.setThumbnail("https://lh3.googleusercontent.com/yV9YRt1BZDdvzCMSHTHUKZBanQjifiJdm1rUKj9rM4YoZyHFcq4agj78yWP3LdFHDL_0lSo=s85")
                  let count = 0
                  let commandsonsite = Math.floor(commandsforyou / put)
                  let cmds = []
                  commands.forEach(element => {
                        count++
                        let el = element
                        if (el.perm === undefined) { }
                        if (el.shown === undefined) { }
                        if (el.shown === false) { return }
                        if (!member.permissions.has(el.perm)) { return }
                        cmds.push(element)
                  })

                  for (let step = startat; step < bisat; step++) {
                        let element = cmds[step]
                        if (element !== undefined) {
                              if (element.aliases != undefined) {
                                    if (element.perm === undefined) {

                                          embed.addFields([{name: prefix + element.name + ", ?" + element.aliases.join(', ?'), value: element.description}])

                                    } else if (member.permissions.has(element.perm)) {
                                          embed.addFields([{name: prefix + element.name + ", ?" + element.aliases.join(', ?'), value: element.description}])

                                    }

                              } else {
                                    if (element.args != undefined) {
                                          if (element.perm === undefined) {
                                                embed.addFields([{name: prefix + element.name, value: element.description + "\n Usage: " + prefix + element.name + " " + element.args}])

                                          } else if (member.permissions.has(element.perm)) {
                                                embed.addFields([{name: prefix + element.name, value: element.description + "\n Usage: " + prefix + element.name + " " + element.args}])

                                          }
                                    } else {
                                          if (element.perm === undefined) {

                                                embed.addFields([{name: prefix + element.name, value: element.description}])

                                          } else if (member.permissions.has(element.perm)) {
                                                embed.addFields([{name: prefix + element.name, value: element.description}])

                                          }
                                    }






                              }
                        }

                  }
                  return { embed, count, commandsonsite }
            }
      }catch(err){console.log(err);}
      },
};