const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  return message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=518206536535769099&permissions=2080762993&scope=bot")
}

module.exports.help = {
  name: "invite",
  aliases: ["inv"],
  description: "Get the link to invite the bot to your own server!",
  usage: "binvite",
  accessibleby: "Anyone"
}
