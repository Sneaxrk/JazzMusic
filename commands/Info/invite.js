const {
  MessageEmbed
} = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js")  
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "invite",
    category: "Info",
    aliases: [ "inv" ],
    description: "",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    run: async (client, message, args, guildData, player, prefix) => {

      
let aboutembed = new MessageEmbed()
        
  .setAuthor(`Jazz Music`, client.user.displayAvatarURL())
.setDescription(`<:invite:994973405730324500> **__Invite Me__** : 
  
   [Click Here](https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot)

<:Support:994973299840921650> **__Support Server__** : 
  
   [Click Here](https://discord.gg/fdasM6ez3u)

`)


.setThumbnail(client.user.displayAvatarURL())
.setColor(client.embedColor)
const button1 = new MessageButton()
  .setLabel(`Invite`)
  .setURL("https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot")
  .setStyle(`LINK`)
        .setEmoji(`994973405730324500`)
//  .setEmoji(`994973001894338670`)
  const button2 = new MessageButton()
  .setLabel(`Support`)
  .setURL("https://discord.gg/fdasM6ez3u")
  .setStyle(`LINK`)
        .setEmoji(`994973299840921650`)     
      //.setEmoji(`896959039999717398`)
  const row = new MessageActionRow()
  .addComponents(button1, button2) 	  
message.channel.send({embeds: [aboutembed], components: [row]});
      
  //      message.channel.send({ embeds: [aboutembed], components : [row] })


}
}
