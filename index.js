const Discord = require("discord.js"); 
const { Intents, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, Collection} = require("discord.js");
const Enmap = require("enmap"); //this package is our Database! We will use it to save the data for ever!
const app = require("express")
const colors = require("colors"); 
const fs = require("fs"); 
require('discord-reply'); 
const config = require("./botconfig/config.json");
const emoji = require("./botconfig/emojis.json");
const ee = require(`./botconfig/embed.json`);
const fetch = require("node-fetch");
const mongoose = require("mongoose")
const { findOrCreateGuild } = require("./handlers/functions")
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/994676838544724019/Nwp5yFpLWpjLyyGjioYfaPqRhMTdG1m1qd5WidMEg9qaBck0DywvCgoRDrmHSzmOK8sr' }); 
const { readdirSync } = require("fs")

const intents = new Intents([ 
  "GUILD_MEMBERS" 
]);

// Hello from the new soul bot lol

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    presence: {
        status: "online",
        activities: [{
        name: "+play | Jazz Development",
        type: "WATCHING"
        }]
    },
    ws: { intents },
    fetchAllMembers: false,
    restTimeOffset: 0,
    shards: "auto",
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});


require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);


["clientvariables", "command", "events", "erelahandler"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
});


client.databaseCache = {};

client.guildsData = require("./models/Guild"); // Guild mongoose model
client.databaseCache.guilds = new Discord.Collection();


//login into the bot
mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  }).then(() => {
  //login to the bot
  client.login(config.token) 


client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try {
            await newState.guild.me.voice.setSuppressed(false);
        } catch (e) {
            console.log(e)
        }
    }
})

  
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const { createBar, format, autoplay } = require(`./handlers/functions`);

    const { channel } = interaction.member.voice;

    const nomusic = new MessageEmbed()
    .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
    .setColor(ee.color)

    const empty = new MessageEmbed()
    .setTitle('No song currently playing')
    .setDescription(`[Invite](${config.links.opbotinv}) • [Support server](${config.links.server})`)
    .setColor(ee.color)
    .setImage(ee.nosongbanner)

    let playrow = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("reducev")
        .setEmoji(emoji.msg.reduce_volume),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("previous")
        .setEmoji(emoji.msg.previous_track),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("pause-play")
        .setEmoji(emoji.msg.pause_resume),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("skip")
        .setEmoji(emoji.msg.skip_track),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("raisev")
        .setEmoji(emoji.msg.raise_volume)
    )

    interaction.deferUpdate().catch(() => {
        return
    })

    const player = client.manager.players.get(interaction.guild.id);
    // const setup = client.manager.setups.get(interaction.guild.id);

    console.log(client.setups)
    
    if (!channel) {
        const opop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You need to join a voice channel.`)
        return interaction.followUp({ embeds: [opop] });
    }

    if(player === undefined) {
        if(interaction.channel.name === 'Fpy-Requets') {
            setTimeout(() => {
                interaction.editReply({ embeds: [empty], components: [playrow] })
            }, 300)
        }
        setTimeout(() => {
            interaction.followUp({ embeds: [nomusic], ephemeral: true })
        }, 500)
        return
    }

    if(interaction.customId === 'reducev') {
        if(player.volume === '0') {
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume way to quiet at \`${player.volume} %\``)
            .setColor(ee.color)
            interaction.followUp({ embeds: [yto] }).then(responce => {
                setTimeout(() => {
                    try {
                        responce.delete().catch(() => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 12000)
            })
            return
        }
        
        player.setVolume(player.volume - 10); // Keep it I wanna know if it works

        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.raise_volume} Volume set to \`${player.volume} %\``)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'previous') {
        const yto = new MessageEmbed()
        .setDescription(`**${emoji.msg.ERROR} Sorry we havent figured out playing the\nprevious song please try agian later.**`)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'pause-play') {
        if(player.paused === true) {
            player.pause(false);
        } else {
            player.pause(true);
        }

        const yto = new MessageEmbed()
        .setTitle(`${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
        .setColor(ee.color)
        .addField(`${emoji.msg.Playing} Progress: `, createBar(player))
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'skip') {
        if(player.queue.size == 0) {
            if(player.get("autoplay")) {
                const idkd = new MessageEmbed()
                .setDescription(`${emoji.msg.skip_track} Skipped **${player.queue.current.title}** by \`${message.author.tag}\``)
                .setColor(ee.color)
                message.channel.send({embeds: [idkd]});
                return autoplay(client, player, "skip")
            } else {
                player.stop();
                const idkd = new MessageEmbed()
                .setDescription(`${emoji.msg.skip_track} Skipped **${player.queue.current.title}** by \`${message.author.tag}\``)
                .setColor(ee.color)
                return message.channel.send({embeds: [idkd]});
            }
        }

        player.stop();
        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.skip_track} Skipped *${player.queue.current.title}*`)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'raisev') {
        player.setVolume(player.volume + 10); // Keep it I wanna know if it works

        if (player.volume < 0 || player.volume > 150) {
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume is way to high at \`${player.volume} %\``)
            .setColor(ee.color)
            interaction.followUp({ embeds: [yto] }).then(responce => {
                setTimeout(() => {
                    try {
                        responce.delete().catch(() => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 12000)
            })
            return
        }
        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.raise_volume} Volume set to \`${player.volume} %\``)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }
})

//new MessageButton()
  //  .setStyle("SECONDARY")
 //   .setCustomId("reducev")
  // .setEmoji("🔉"),
  //  new MessageButton()
   // .setStyle("SECONDARY")
   // .setCustomId("previous")
   // .setEmoji("⏮️"),
//new MessageButton()
   // .setStyle("SECONDARY")
   // .setCustomId("stop")
   // .setEmoji("⏹️"),
//new MessageButton()
  //  .setStyle("SECONDARY")
   // .setCustomId("skip")
   // .setEmoji("⏭️"),
//new MessageButton()
  //  .setStyle("SECONDARY")
   // .setCustomId("raisev")
   // .setEmoji("🔊")

  
  
   

client.on('guildCreate', async (guild) => {
    try {
        const owner = await guild.fetchOwner()
        const embed = new Discord.MessageEmbed()           
        .setTitle("Joined A New Server")
        .setColor("GREEN")
        .setThumbnail(guild.iconURL())
        .setDescription("Hey Developer Look! I've Joined A New Server !!")
        .addField("**Server Name**", guild.name, true)
        .addField("**Server ID**", guild.id, true)
        .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
        .addField("**Members**", `${guild.memberCount} + <@812605686583394304>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
    
    client.channels.cache.get("994672911879258242").send({embeds: [embed]})
  } catch (e) { console.log(e) }


  try {

    
    const guildData = await findOrCreateGuild(client, { id: guild.id });
    let prefix = guildData.prefix;
    const ownerlmao = await guild.fetchOwner()

    if (prefix === null) prefix = config.prefix;
    guildData.announce = true;
    guildData.save();
  
    const texts = "Hi, This Is jazz If You Need Support Related Me Join My Support Server. Support Server Link Is Here https://discord.gg/fdasM6ez3u"
    const guildembed = new Discord.MessageEmbed()
    .setTitle("Thank you for adding me in your server! ❤️")
    .setColor("#303037")

    .setDescription(`\`\`\`fix\nMy prefix here is ${prefix}\nYou can see a list of commands by typing ${prefix}help or ${prefix}commands\nYou can change my prefix using ${prefix}prefix <New Prefix>\`\`\``);
 ownerlmao.send({content: texts, embeds: [guildembed]});
  } catch {/** */}
});

client.on('guildDelete', async (guild) => {
    try {
        const owner = await guild.fetchOwner()
        const embed = new Discord.MessageEmbed()
        .setTitle("Left A Server")
        .setColor("RED")
        .setThumbnail(guild.iconURL())
        .setDescription("Hey Developers Look! Someone kicked me from their server !!")
        .addField("**Server Name**", guild.name, true)
        // This has an error ufff
        .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
        try { embed.addField("**Region**", guild.region, true) } catch {/** */}

      client.channels.cache.get("994672971027325030").send({ embeds: [embed] })
    } catch (e) { console.log(e) }
});




 



     
});




process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error.stack}\`\`\``)
});
process.on("uncaughtException", (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
});
process.on('beforeExit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('exit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('multipleResolves', (type, promise, reason) => {
}); 

//uhh
