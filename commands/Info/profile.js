const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "profile",
  category: "Info",
  aliases: ["badge", "badges", "achievement", "pr"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, guildData, player, prefix) => {
    
      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
      const bxby = user.id === "979399328827338814" ? true : false;
      let badges = "";
        
     const guild = await client.guilds.fetch("991887398403313734"); 

      const sus = await guild.members.fetch(user.id).catch((e) => {
        
      if(user) badges = badges;
      else badges = "`No Badge Available`";
      });
      if(bxby === true || user.id === "974984890959425566") badges = badges + `\n<a:Developer:994974666395492474>・**Developer**`;
try{
      const own = sus.roles.cache.has("991890050440769677");
      if(own === true) badges = badges+`\n<:OWNER00:995004575381737684>・**Owner**`;

   //  const pr = sus.roles.cache.has("959392690863210496");
    //  if(fr === true) badges = badges + `\n<a:teddy_friend:949715347538329610> Friends`;
   //   const help = sus.roles.cache.has("948131708950159370");
   //   if(help === true) badges = badges + `\n<:xeta_helper:959097342861119498> Helper | Developer`;

      const fyp = sus.roles.cache.has("991890053536170074");
      if(fyp === true) badges = badges + `\n<a:developer00:994974716869742642>・**Co Developer**`;

     // const bpart = sus.roles.cache.has("959093515781034016");
   //   if(bpart === true) badges = badges + `\n<:xeta_partner:955861281666125844> Partner`;
    //  const spons = sus.roles.cache.has("948131710279778336");
   //   if(spons === true) badges = badges + `\n<:xeta_sponsor:959099714341576725> Sponsor`;

      const han = sus.roles.cache.has("991890054471499776");
      if(han === true) badges = badges + `\n<:Admin00:995004137815167088>・**Admin**`;

    //  const gbug = sus.roles.cache.has("959094254901280769");
  //if(gbug === true) badges = badges + `\n<:xeta_hunter_gold:955860143944388738> Bug Hunter Prime`;

      const manager = sus.roles.cache.has("991890055541039155");
      if(manager === true) badges = badges + `\n<:mod00:995004232430264410>・**Mod**`;

     const aman = sus.roles.cache.has("991890056749002822");
      if(aman === true) badges = badges + `\n<:Support_Team:995004490669371462>・**Support Team**`;

      const hundi = sus.roles.cache.has("994236234572509244");
      if(hundi === true) badges = badges + `\n<:a_BugHunter:995004952822947951>・**Bug Hunter**`;

      const supp = sus.roles.cache.has("991890071588450345");
      if(supp === true) badges = badges + `\n<:Supporterss:995005141595979866>・**Supporter**`;

      const fr = sus.roles.cache.has("991890069105422387");
      if(fr === true) badges = badges + `\n<a:Friendsss:995004699122073620>・**Friends**`;



}catch(err){
if(badges) {
badges = "";
badges = badges;
}
else if(badges === "") badges = "`No Badge Available`";
}


      const pr = new MessageEmbed()
.setAuthor(`Profile For ${user.username}#${user.discriminator}`, client.user.displayAvatarURL({dynamic: true})) 
.setThumbnail(user.displayAvatarURL({dynamic: true}))
//.setTitle(`${user.username}'s Profile`)
.setColor("#00ffff")
.setDescription(`
**__BADGES__** <a:Badges:995124766195335218>

${badges ? badges : "`No Badge Available`"}`)
//.setTimestamp();
      message.channel.send({embeds: [pr]});
      
    }
  
}
