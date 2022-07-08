const { MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require('../../botconfig/emojis.json');
module.exports = {
  name: "help",
  category: "info",
  aliases: ["help", "commands", "h"],
  cooldown: 5,
  usage: "help",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, guildData, player, prefix) => {

    try {
          const row = new MessageActionRow()
           .addComponents(
        new MessageButton()
    .setLabel("Invite Me")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/fdasM6ez3u"),
    new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/991404600366211092/vote")
			);
   const mainmenu = new MessageEmbed()
.setAuthor(`Fpy Help Panel`, client.user.displayAvatarURL({dynamic: true}), config.links.opmusicinv)
 .addField(`Playlist [10]`, `\`pl-addcurrent\`, \`pl-addqueue\`, \`pl-create\`, \`pl-delete\`, \`pl-info\`, \`pl-list\`, \`pl-load\`, \`pl-playshuffle\`, \`pl-removedupes\`, \`pl-removetrack\``)
 .addField(`General [9]`,`\`24/7\`, \`adddj\`, \`announce\`, \`prefix\`, \`removedj\`, \`reset\`, \`settings\`, \`setdjonly\`, \`pruning\``) 
 .addField(`Music [26]`, `\`autoplay\`, \`back\`, \`clearqueue\`, \`forward\`, \`grab\`, \`join\`, \`loop\`, \`movebot\`, \`moveme\`, \`movetrack\`, \`nowplaying\`, \`pause\`, \`play\`, \`playtop\`, \`queue\`, \`remove\`, \`replay\`, \`resume\`, \`rewind\`, \`search\`, \`seek\`, \`shuffle\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\``) 
 .addField(`Filter [15]`, `\`8d\`, \`bassboost\`, \`chipmunk\`, \`cleareq\`, \`clearfilter\`, \`darthvader\`, \`equalizer\`, \`nightcore\`, \`pitch\`, \`rate\`, \`slowmo\`, \`speed\`, \`tremolo\`, \`vibrato\`, \`vibrate\``)
.addField(`Utilities [9]`, `\`djmode\`, \`help\`, \`profile\`, \`invite\`, \`vote\`, \`ping\`, \`about\`, \`stats\`, \`uptime\``) 
.setTimestamp() 
  .setFooter(ee.footertext, ee.footericon)
.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : "#ff0000") 

      message.channel.send({embeds: [mainmenu], components: [row]})
    } catch (e) {
      console.log(String(e.stack).bgRed)
const emesdf = new MessageEmbed()
.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : "#ff0000") 
.setAuthor(`An error occurred`)
.setDescription(`\`\`${e.message}\`\`\``);
return message.channel.send({embeds: [emesdf]});
    }
  }
} 
