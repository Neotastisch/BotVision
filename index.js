const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder, ChannelType} = require('discord.js');
const { token, client_id } = require('./botconfig.json');
const fs = require('fs');
const path = require('path')
const fetch = require("node-fetch")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bot.db');

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS guild_settings (
    guild_id TEXT PRIMARY KEY,
    prefix TEXT DEFAULT '?',
    welcome_channel TEXT,
    leave_channel TEXT,
    join_role TEXT,
    join_message TEXT,
    staff_role TEXT,
    levelsystem TEXT DEFAULT 'Off'
  )`);

  // Create levels table
  db.run(`CREATE TABLE IF NOT EXISTS user_levels (
    user_id TEXT,
    guild_id TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0,
    last_message_time INTEGER,
    PRIMARY KEY (user_id, guild_id)
  )`);

  // Create giveaways table
  db.run(`CREATE TABLE IF NOT EXISTS giveaways (
    message_id TEXT PRIMARY KEY,
    channel_id TEXT,
    guild_id TEXT,
    prize TEXT,
    winner_count INTEGER,
    host_id TEXT,
    ends_at INTEGER,
    started_at INTEGER,
    ended BOOLEAN DEFAULT FALSE,
    winners TEXT,
    reaction TEXT DEFAULT '🤝',
    messages JSON
  )`);
});

// Make db accessible to client
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User]
});
bot.db = db;

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var days = Math.floor(sec_num / (3600 * 24));
    var hours = Math.floor((sec_num - (days * (3600 * 24))) / 3600);
    var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
    var seconds = sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return days+':'+hours+':'+minutes+':'+seconds;
}

const { GiveawaysManager } = require('discord-giveaways');


// Custom giveaway manager that uses SQLite
class SQLiteGiveawayManager extends GiveawaysManager {
    async getAllGiveaways() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM giveaways', [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    resolve([]);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    messages: JSON.parse(row.messages),
                    ended: row.ended === 1,
                    winners: row.winners ? row.winners.split(',') : []
                })));
            });
        });
    }

    async saveGiveaway(messageId, giveawayData) {
        return new Promise((resolve, reject) => {
            const data = {
                message_id: messageId,
                channel_id: giveawayData.channelId,
                guild_id: giveawayData.guildId,
                prize: giveawayData.prize,
                winner_count: giveawayData.winnerCount,
                host_id: giveawayData.hostedBy,
                ends_at: giveawayData.endAt,
                started_at: giveawayData.startAt,
                ended: giveawayData.ended ? 1 : 0,
                winners: giveawayData.winnerIds ? giveawayData.winnerIds.join(',') : '',
                reaction: giveawayData.reaction || '🤝',
                messages: JSON.stringify(giveawayData.messages || {})
            };

            db.run(`INSERT OR REPLACE INTO giveaways (
                message_id, channel_id, guild_id, prize, winner_count, 
                host_id, ends_at, started_at, ended, winners, reaction, messages
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.message_id, data.channel_id, data.guild_id, data.prize,
                data.winner_count, data.host_id, data.ends_at, data.started_at,
                data.ended, data.winners, data.reaction, data.messages
            ],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    }

    async deleteGiveaway(messageId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM giveaways WHERE message_id = ?', [messageId], (err) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    }
}

// Initialize the custom giveaway manager
const manager = new SQLiteGiveawayManager(bot, {
    updateCountdownEvery: 60000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: 'RANDOM',
        embedColorEnd: '#000000',
        reaction: '🤝'
    }
});

var client = bot
client.id = client_id
client.statustext = "/help"
client.used = false;
client.token = token

const maintanceEmbed = new EmbedBuilder()
.setColor('#FF0000')
.setTitle('Maintanance')
.setDescription('Sorry, BotVision is currently in maintanance, please wait')

client.maintananceEmbed = maintanceEmbed
client.recordingfilelocation = path.join(__dirname, 'recordings')

// Database helper functions
client.getGuildSetting = function(guildId, setting) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM guild_settings WHERE guild_id = ?', [guildId], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                resolve(null);
            }
            resolve(row ? row[setting] : null);
        });
    });
}

client.setGuildSetting = function(guildId, setting, value) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO guild_settings (guild_id, ${setting}) 
                VALUES (?, ?)
                ON CONFLICT(guild_id) 
                DO UPDATE SET ${setting} = ?`,
            [guildId, value, value],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                }
                resolve();
            });
    });
}

client.maintanance = false
client.commands = new Collection()
client.slashcommands = [];
client.aliases = new Collection()
client.std = require("./servertemplates.json")
client.giveaway = manager
client.voiceGenerator = new Collection()

const exampleEmbed = new EmbedBuilder()
  .setColor('#FF0000')
  .setTitle('Missing permissions')
  .setDescription('Sorry, you are missing some permissions')
client.noperms = exampleEmbed;
client.usage = usageWarning;

var fullPath = path.join(__dirname, '').replace("/\/g","")
var fullpathfinal = fullPath.replace(/\\/g, "/");
require('./handler/handle.js')(client, fullpathfinal)

function updateUsed(){
    if(client.used == true){
        setTimeout(function(){
            client.used = false;
            updateUsed()
        },10000)
    }
    setTimeout(function(){
        updateUsed()
    },100)
}
updateUsed()

async function usageWarning(guildId, commandName, possibleArguments){
    const prefix = await client.getGuildSetting(guildId, 'prefix') || '?';
    const exampleEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Missing args.')
        .setDescription('Usage: '+ prefix + commandName + " " + possibleArguments)
    return exampleEmbed
}


client.on('disconnect', function(erMsg, code) {
    try{
        console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
        client.connect();
    }catch(err){
        console.log(err);
    }
});


// Cleanup database connection on process exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});

bot.login(token);

// Level system helper functions
client.getLevelData = function(userId, guildId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM user_levels WHERE user_id = ? AND guild_id = ?', [userId, guildId], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                resolve(null);
            }
            if (!row) {
                // If no data exists, create initial entry
                db.run('INSERT INTO user_levels (user_id, guild_id, xp, level, last_message_time) VALUES (?, ?, 0, 0, ?)',
                    [userId, guildId, Date.now()], (err) => {
                        if (err) {
                            console.error('Database error:', err);
                            resolve(null);
                        }
                        resolve({ xp: 0, level: 0, last_message_time: Date.now() });
                    });
            } else {
                resolve(row);
            }
        });
    });
}

client.addXP = function(userId, guildId, xpToAdd) {
    return new Promise(async (resolve, reject) => {
        const currentData = await client.getLevelData(userId, guildId);
        if (!currentData) {
            resolve(null);
            return;
        }

        const newXP = currentData.xp + xpToAdd;
        const xpNeeded = 5 * Math.pow(currentData.level, 2) + 50 * currentData.level + 100;
        let newLevel = currentData.level;
        let leveledUp = false;

        if (newXP >= xpNeeded) {
            newLevel++;
            leveledUp = true;
        }

        db.run('UPDATE user_levels SET xp = ?, level = ?, last_message_time = ? WHERE user_id = ? AND guild_id = ?',
            [newXP, newLevel, Date.now(), userId, guildId],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    resolve(null);
                }
                resolve({ 
                    leveledUp,
                    newLevel,
                    newXP,
                    xpNeeded
                });
            });
    });
}

client.getLeaderboard = function(guildId, limit = 10) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM user_levels WHERE guild_id = ? ORDER BY level DESC, xp DESC LIMIT ?',
            [guildId, limit],
            (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    resolve([]);
                }
                resolve(rows || []);
            });
    });
}