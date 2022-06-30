const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "invite",
  category: "Info",
  aliases: ["add", "inv"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      const emee = new MessageEmbed()
      .setColor("#2F3136")
      .addField(`**__Invite Me With Admin Perms__**`, `**[Click Here](${config.links.opmusicinv})**`)
      .addField(`**__Invite Me With Normal Perms__**`, `**[Click Here](https://dsc.gg/jazzmusic)**\n`)
      .addField(`**__Support Server__**`, `**[Click Here](${config.links.server})**`)
      .setURL(config.links.server)
      .setTimestamp()
      .setFooter(ee.footertext, ee.footericon)
      message.channel.send({embeds: [emee]});
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