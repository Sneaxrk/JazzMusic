const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Info",
    aliases: [ "addme", "links", "inv", "invites"],
    description: "Shows Jazz Development official invite links!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   run: async (client, message, args, guildData, player, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Fpy")
    .setStyle("LINK")
    .setEmoji(`994973405730324500`)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=991404600366211092&permissions=8&scope=bot`),
    new MessageButton()
    .setLabel("Jazz Music")
    .setStyle("LINK")
    .setEmoji(`994973405730324500`)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot`),
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setEmoji(`994973299840921650`)
    .setURL("https://discord.gg/fdasM6ez3u")
			);

          const mainPage = new MessageEmbed()
            .setTitle("Invite Links For Jazz Development")
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : "#ff0000")
            .addField('Fpy', `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=991404600366211092&permissions=8&scope=bot)`, true)
            .addField('Jazz Music', `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot)`, true)
            .addField('Support Server', `[Click Here](https://discord.gg/fdasM6ez3u)`)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}
