const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "546754678172549124") return;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You aren't an Admin, simple human.");
  let channel = message.channel;
  let everyoneRole = message.guild.roles.find('name', '@everyone');
  channel.overwritePermissions(
        everyoneRole,
        { 'SEND_MESSAGES': false },

        `lockdown cmd by ${message.author.username}`
  ).then(message.channel.send("Locked-down the channel!"))
}

module.exports.help = {
  name: "lockdown",
  aliases: ["lock", "ldown"],
  description: "Makes it so that nobody can send messages to the current channel.",
  usage: "blockedown",
  accessibleby: "Administrator"
}
