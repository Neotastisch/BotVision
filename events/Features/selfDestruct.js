const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageCreate",
    run: (client, message) => {
        let msg = message
        if(message.content == "Computer, destruct seqence"){
            // https://i.imgur.com/xhIFyG0.png
            // 11A
            // https://i.imgur.com/QIeZUe7.png
            // https://i.imgur.com/W38i7zw.png
            // 11A2B
            // https://i.imgur.com/oAhoXmZ.png
            // https://i.imgur.com/QwPoQZ6.png
            // 1B2B3
            // https://i.imgur.com/w8AGQq3.png
            // https://i.imgur.com/df6ma41.png
            // https://i.imgur.com/fTymoXe.png
            // 0 0 0 Destruct 0
            // https://i.imgur.com/GQiZsql.png

            const filter = (m) => m.author.id === message.author.id;

            message.author.send("\"11A\", \"11A2B\", \"1B2B3\", \"0 0 0 Destruct 0\"")

            message.channel.send({files: ["https://i.imgur.com/xhIFyG0.png"]})
            msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(collections => {
                console.log(collections.first().content);
                if(collections.first().content == "11A"){
                    message.channel.send({files: ["https://i.imgur.com/QIeZUe7.png", "https://i.imgur.com/W38i7zw.png"]})
                    msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(collections => {
                        if(collections.first().content == "11A2B"){
                            message.channel.send({files: ["https://i.imgur.com/oAhoXmZ.png", "https://i.imgur.com/QwPoQZ6.png"]})
                            msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(collections => {
                                if(collections.first().content == "1B2B3"){
                                    message.channel.send({files: ["https://i.imgur.com/w8AGQq3.png", "https://i.imgur.com/df6ma41.png", "https://i.imgur.com/fTymoXe.png"]})
                                    msg.channel.awaitMessages({filter, max: 1, time: 30 * 1000 , errors: ["time"]}).then(collections => {
                                        if(collections.first().content == "0 0 0 Destruct 0"){
                                            message.channel.send({files: ["https://i.imgur.com/GQiZsql.png", "https://media.tenor.com/ea1hCxY7CGAAAAAC/autodistruct.gif"]})
                                                setTimeout(() => {
                                                    message.channel.send("**AUTO DESTRUCT IN** \n 50") 
                                                    setTimeout(() => {
                                                        message.channel.send("**AUTO DESTRUCT IN** \n 40")
                                                        setTimeout(() => {
                                                            message.channel.send("**AUTO DESTRUCT IN** \n 30") 
                                                            setTimeout(() => {
                                                                message.channel.send("**AUTO DESTRUCT IN** \n 20") 
                                                                setTimeout(() => {
                                                                    message.channel.send("**AUTO DESTRUCT IN** \n 10") 
                                                                    setTimeout(() => {
                                                                        message.channel.send("**AUTO DESTRUCT IN** \n 5") 
                                                                        setTimeout(() => {
                                                                            message.channel.send("**AUTO DESTRUCT IN** \n 4") 
                                                                            setTimeout(() => {
                                                                                message.channel.send("**AUTO DESTRUCT IN** \n 3")
                                                                                setTimeout(() => {
                                                                                    message.channel.send("**AUTO DESTRUCT IN** \n 2")
                                                                                    setTimeout(() => {
                                                                                        message.channel.send("**AUTO DESTRUCT IN** \n 1") 
                                                                                        message.channel.send({files:["https://i.imgur.com/IHkguDL.gif"]})
                                                                                    }, 1000)   
                                                                                }, 1000)

                                                                            }, 1000)

                                                                        }, 1000)
   
                                                                    }, 5000)

                                                                }, 10000)

                                                            }, 10000)

                                                        }, 10000)

                                                    }, 10000)

                                                }, 10000)


                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    }
}