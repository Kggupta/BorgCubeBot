const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  return message.channel.send("https://discordbots.org/bot/518206536535769099/vote")
}

module.exports.help = {
  name: "vote",
  aliases: ["vte"],
  description: "Get the link to upvote the bot on the BotList site!",
  usage: "bvote",
  accessibleby: "Anyone"
}
