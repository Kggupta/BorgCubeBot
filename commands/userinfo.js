const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let mention = message.mentions.users.first() || message.author
  let gamestate;
  let detail;
  switch(mention.presence.game){
    case null:
      gamestate = "Not playing a game"
    break;
    case "Spotify":
      gamestate = "Listening to"
    break;
    default:
      gamestate = "Playing"
  }

  if(mention.presence.game == null){
    detail = "-"
  }else{
    detail = mention.presence.game
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
  .addField(gamestate, detail, true)
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
