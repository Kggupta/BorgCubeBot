const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "546754678172549124") return;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You aren't an Admin, simple human.");
  let channel = message.channel;
  let everyoneRole = message.guild.roles.find('name', '@everyone');
  channel.overwritePermissions(
    everyoneRole,
    { 'SEND_MESSAGES': true },
    `lockdown cmd by ${message.author.username}`
    ).then(message.channel.send("Unlocked the channel!"))
}

module.exports.help = {
  name: "unlock",
  aliases: ["unlock", "ulchannel"],
  description: "Makes it so that people can send messages to a channel again.",
  usage: "bunlock",
  accessibleby: "Administrator"
}
