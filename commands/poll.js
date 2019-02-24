const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  const pollmessage = args.join(' ')
  let pollEmbed = new Discord.RichEmbed()
  .setTitle("Poll")
  .setColor("GREEN")
  .addField("Question", pollmessage)

  message.channel.send(pollEmbed).then(function (message) {
    message.react("👍")
    message.react("👎")
    message.pin()
  });
}

module.exports.help = {
  name: "poll",
  aliases: ["p", "ask"],
  description: "Have the bot run a poll using the parameters you have",
  usage: "bpoll {Message}",
  accessibleby: "Anyone"
}
