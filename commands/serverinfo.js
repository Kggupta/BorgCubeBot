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
    .addField("Server Name", message.guild.name, true)
    .addField("Owner", message.guild.owner.toString(), true)
    .addField("Server Region", message.guild.region, true)
    .addField("Channels", `${message.guild.channels.filter(channel => channel.type === `voice`).size} VC & ${message.guild.channels.filter(channel => channel.type === `text`).size} Text`, true)
    .addField("Humans", ChkMem(message.guild), true)
    .addField('Bots', ChkBot(message.guild), true)
    .addField("Total Members", message.guild.memberCount, true)
    .addField("Created On", message.guild.createdAt.toUTCString())
    .addField("You Joined", message.member.joinedAt.toUTCString());

    message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo",
  aliases: ["srvinfo"],
  description: "Get info about the server",
  usage: "bserverinfo",
  accessibleby: "Anyone"
}
