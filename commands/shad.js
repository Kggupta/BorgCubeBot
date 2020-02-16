const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "546754678172549124") return;
  if (!member.hasPermission("ADMINISTRATOR")) return message.channel.send("This command is disabled for you. Please wait for a mod.")
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
  aliases: ["sms"],
  description: "Add your social media's to the compiled list of social media channel. See `usage` to see how to use this command. If you only have one of the two accounts, simply say N/A for that account.",
  usage: "bshad <member> [snap account] [insta account]",
  accessibleby: "The Borg"
}
