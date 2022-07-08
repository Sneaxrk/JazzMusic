const {
  MessageEmbed
} = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js")  
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "about",
    category: "Information",
    aliases: [ "aboutbot" ],
    description: "",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    run: async (client, message, args, guildData, player, prefix) => {


let aboutembed = new MessageEmbed()
        
  .setAuthor(`Fpy#2951`, client.user.displayAvatarURL())
.setDescription(`
**Welcome To Fpy, A Premium Quality Discord Music Bot. My Work Is To Provide Best Quality Music For The Best Discord Servers, I am developed in JavaScript.**

<a:Developer:994974666395492474> **Developer** : [- PEACE](https://discord.com/users/979399328827338814), [HACKER](https://discord.com/users/974984890959425566)

`)


.setThumbnail(client.user.displayAvatarURL())
.setColor(client.embedColor)
const button1 = new MessageButton()
  .setLabel(`Invite`)
  .setURL("https://discord.com/api/oauth2/authorize?client_id=991404600366211092&permissions=8&scope=bot")
  .setStyle(`LINK`)
        .setEmoji(`994973405730324500`)
//  .setEmoji(`896818548326952980`)
  const button2 = new MessageButton()
  .setLabel(`Support`)
  .setURL("https://discord.gg/fdasM6ez3u")
  .setStyle(`LINK`)
        .setEmoji(`994973299840921650`)
		const button3 = new MessageButton()
			.setLabel(`DEVELOPER`)
			.setURL(`https://discord.com/users/979399328827338814`)
			.setStyle(`LINK`)
.setEmoji(`994974666395492474`)     
      //.setEmoji(`896959039999717398`)
  const row = new MessageActionRow()
  .addComponents(button1, button2, button3) 	  
message.channel.send({embeds: [aboutembed], components: [row]});
      
  //      message.channel.send({ embeds: [aboutembed], components : [row] })


}
}
