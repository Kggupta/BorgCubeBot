const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let mention = message.mentions.users.first() || message.author
  let game;
  if (mention.presence.game === null) {
    game = "Not playing a game"
  } else {
    game = mention.presence.game.name
  }
  roleMember = message.mentions.members.first() || message.member
  const uInfoEmbed = new Discord.RichEmbed()
  .setColor('GREEN')
  .setAuthor(`Info for ${mention.username}`, mention.displayAvatarURL)
  .setThumbnail(mention.displayAvatarURL)
  .setFooter(`Info requested by ${message.author.username}`)
  .addField(`Info for`, mention.username, true)
  .addField(`ID`, mention.id, true)
  .addField(`Status`, mention.presence.status.toUpperCase(), true)
  .addField(`Playing`, game, true)
  .addField(`Account Created`, mention.createdAt.toUTCString(), true)
  .addField('Roles', roleMember.roles.map(r => `${r}`).join(' | '), true)

  return message.channel.send(uInfoEmbed);
}

module.exports.help = {
  name: "userinfo",
  aliases: ["uinfo"],
  description: "Basic information on a mentioned user (or yourself)",
  usage: "buserinfo <member>",
  accessibleby: "Anyone"
}
