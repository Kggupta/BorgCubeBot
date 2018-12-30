const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  message.channel.send(`!disboard bump`)
}

module.exports.help = {
  name: "test",
  aliases: ["t"],
  description: "Assimilate the mentioned user",
  usage: "bassimilate <mention> {message}",
  accessibleby: "Anyone"
}
