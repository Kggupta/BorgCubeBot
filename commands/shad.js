const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "546754678172549124") return;
  if (message.author.id != "444998388795179042") return message.channel.send("Im sorry, for the time being this command is only enabled for **The Borg#3630** as the command is still very buggy. At the moment, please just follow the format as instructed by MEE6 and I will get to adding your social media account ASAP. Sorry for the inconvenience!")
  message.channel.send("Passed to compiler");
  let nameOfUser = message.guild.member(message.mentions.users.first());
  if (!nameOfUser) return message.channel.send("You need to add a name.");
  let snapChatAcc = args[1];
  let instaAcc = args[2];

  let shadEmbed = new Discord.RichEmbed()
  .setTitle("Social media account")
  .setColor("GREEN")
  .addField("Name", nameOfUser)
  .addField("Snapchat username", `${snapChatAcc}`, true)
  .addField("Instagram username", `${instaAcc}`,true)

  bot.channels.get("548295750526959638").send(shadEmbed)
  return;
}

module.exports.help = {
  name: "shad",
  aliases: [],
  description: "Add your social media's to the compiled list of social media channel. See `usage` to see how to use this command. If you only have one of the two accounts, simply say N/A for that account.",
  usage: "bshad <member> [snap account] [insta account]",
  accessibleby: "Anyone (In the approved server)"
}
