const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let user = message.mentions.users.first() || message.author;

  let boticon = bot.user.displayAvatarURL;
  let avatarEmbed = new Discord.RichEmbed()
  .setAuthor(`${user.username}'s Avatar`)
  .setImage(user.displayAvatarURL)
  .setColor("GREY")
  .setTimestamp();

  return message.channel.send(avatarEmbed);
}

module.exports.help = {
  name: "avatar",
  aliases: ["av"],
  description: "Enlarge the avatar of a user",
  usage: "bavatar <member>",
  accessibleby: "Anyone"
}
