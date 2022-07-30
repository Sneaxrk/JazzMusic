const {
  MessageEmbed
} = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js")  
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "about",
    category: "Info",
    aliases: [ "aboutbot" ],
    description: "",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    run: async (client, message, args, guildData, player, prefix) => {


let aboutembed = new MessageEmbed()
        
  .setAuthor(`Jazz`, client.user.displayAvatarURL())
.setDescription(`
**Welcome To Jazz, A Premium Quality Discord Music Bot. My Work Is To Provide Best Quality Music For The Best Discord Servers, I am developed in JavaScript.**

<a:dev:998579670326988852> **Developers** : [🥀ᛜ.⌁𝐍σт𝐘συя𝐇αcкєя.︵♡⊹₊](https://discord.com/users/974984890959425566) [𓆩ζ͜͡𝐓he𝐑eal𝐏ennywise](https://discord.com/users/975012142640169020) [- SIGN](https://discord.com/users/979399328827338814)

`)


.setThumbnail(client.user.displayAvatarURL())
.setColor(client.embedColor)
const button1 = new MessageButton()
  .setLabel(`Invite`)
  .setURL("https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot")
  .setStyle(`LINK`)
        .setEmoji(`994973405730324500`)
//  .setEmoji(`896818548326952980`)
  const button2 = new MessageButton()
  .setLabel(`Support`)
  .setURL("https://discord.gg/KpvpQpFznG")
  .setStyle(`LINK`)
        .setEmoji(`994973299840921650`)
		  
      //.setEmoji(`896959039999717398`)
  const row = new MessageActionRow()
  .addComponents(button1, button2) 	  
message.channel.send({embeds: [aboutembed], components: [row]});
      
  //      message.channel.send({ embeds: [aboutembed], components : [row] })


}
}

