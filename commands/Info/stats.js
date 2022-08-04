const { MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js");
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
       const row = new MessageActionRow()
           .addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setEmoji(`994973405730324500`)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setEmoji(`994973299840921650`)
    .setURL("https://discord.gg/fdasM6ez3u")
			);
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
            .setFooter(ee.footertext, ee.footericon)
            .addField("<a:Developer:994974666395492474> • **Developers**", "[🥀𝐍σт𝐘συя𝐇αcкєя.︵♡⊹₊](https://discord.com/users/974984890959425566)\n [𓆩ζ͜͡𝐓he𝐑eal𝐏ennywise](https://discord.com/users/975012142640169020)\n [- S I G N](https://discord.com/users/979399328827338814)")
            .addField("<a:dev:998579670326988852> • **Co Developers**", "[Kalamkaar~\](https://discord.com/users/969192890205110313)\n [RIHAN](https://discord.com/users/967357218401947649)")
            .addFields (
                { name: `<a:discord:994984350812733612> • **Servers**`, value: `\`\`\`Total: ${client.guilds.cache.size} servers\`\`\``, inline: true },
                { name: `<:users:994983285065253015> • **Users**`, value: `\`\`\`Total: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users\`\`\``, inline: true },
                { name: `<:node:998585151359561851> • **Node Version**`, value: `\`\`\`v${process.versions.node}\`\`\``, inline: true },
                { name: `<:djs:994982229103087766> • **Discord.js**`, value: `\`\`\`v13.1.0\`\`\``, inline: true },
                { name: `<a:Clock00:994995301091917965> • **Uptime**`, value: `\`\`\`${uptime}\`\`\``, inline: true },
                { name: `<a:botping:994982895682863176> • **Ping**`, value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: `<a:playing:994976942740742284> • **Music**`, value: `\`\`\`Playing Music In ${connectedchannelsamount} Servers\`\`\``, inline: true },                
            )
            message.channel.send({embeds: [statsEmbed], components: [row]})
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
