const { MessageEmbed } = require("discord.js");
const Discord  = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  getRandomInt
} = require("../../handlers/functions")
module.exports = {
    name: "stats",
    category: "Info",
    aliases: ["musicstats"],
    cooldown: 10,
    usage: "stats",
    description: "Shows music Stats, like amount of Commands and played Songs etc.",
    run: async (client, message, args, guildData, player, prefix) => {
        try {
            let totalSeconds = message.client.uptime / 1000;
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            
            let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  
            let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
            }
            if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

            const statsEmbed = new Discord.MessageEmbed()
            .setColor("#303037")
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription(`[Invite](${config.links.opmusicinv}) ● [Support Server](${config.links.server})`)
            .setFooter(ee.footertext, ee.footericon)
            .addFields (
                { name: `<:jk_members:949868611437207572> • **Servers**`, value: `\`\`\`Total: ${client.guilds.cache.size} servers\`\`\``, inline: true },
                { name: `<:user:987202051001974824> • **Users**`, value: `\`\`\`Total: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users\`\`\``, inline: true },
                { name: `<:CPU:988625311732236319> • **Node Version**`, value: `\`\`\`v${process.versions.node}\`\`\``, inline: true },
                { name: `<:discordjs:988612114354675783> • **Discord.js**`, value: `\`\`\`v13.1.0\`\`\``, inline: true },
                { name: `<:uptimer:988611217671209042> • **Uptime**`, value: `\`\`\`${uptime}\`\`\``, inline: true },
                { name: `<a:Duration:950973648087416882> • **Ping**`, value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: `<a:requester:960295168664301568> • **Music**`, value: `\`\`\`Playing Music In ${connectedchannelsamount} Servers\`\`\``, inline: true },                
            )
             .addField("<a:Valid_Code_Developer:949687780383031336> • **Developer**", "[- PEACE#1111](https://discord.com/users/979399328827338814), [🥀ᛜ`.⌁𝐍σт𝐘συя𝐇αcкєя.︵♡⊹₊#7331 ](https://discord.com/users/974984890959425566) and Special thanks all supporters")
            message.channel.send({embeds: [statsEmbed]});
        } catch (e) {
            console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
        }
    }
}
