const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
    let sicon = message.guild.iconURL;
    function ChkBot(guild) {
      let botCount = 0;
      guild.members.forEach(member => {
        if(member.user.bot) botCount++;
      });
      return botCount;
    }
    function ChkMem(guild) {
      let memCount = 0;
      guild.members.forEach(member => {
        if(!member.user.bot) memCount++;
      });
      return memCount;
    }


    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setColor("GREEN")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Owner", message.guild.owner.toString())
    .addField("Created On", message.guild.createdAt)
    .addField("Server Region", message.guild.region)
    .addField("Channels", `${message.guild.channels.filter(channel => channel.type === `voice`).size} voice channels & ${message.guild.channels.filter(channel => channel.type === `text`).size} text channels`)
    .addField("You Joined", message.member.joinedAt)
    .addField("Humans", ChkMem(message.guild))
    .addField('Bots', ChkBot(message.guild))
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo",
  aliases: ["srvinfo"],
  description: "Get info about the server",
  usage: "bserverinfo",
  accessibleby: "Anyone"
}
