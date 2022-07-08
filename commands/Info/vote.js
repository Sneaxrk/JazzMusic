const { MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require('../../botconfig/emojis.json');
module.exports = {
  name: "vote",
  category: "info",
  aliases: ["vote", "dbl", "vt"],
  cooldown: 5,
  usage: "vote",
  description: "Fpy Vote Command",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      const button = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setLabel("Vote Me")
  .setStyle("LINK")
  .setURL("https://top.gg/bot/991404600366211092/vote")
  );

      const mainmenu = new MessageEmbed()
     .setDescription("Click [here](https://top.gg/bot/991404600366211092/vote) to vote me on top.gg!")
     
      .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : "#ff0000") 


      message.channel.send({embeds: [mainmenu], components: [button]});
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
