const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let bicon = bot.user.displayAvatarURL;
  let Unum = bot.users.size
  let Cnum = bot.channels.size
  let Snum = bot.guilds.size
  let botembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setThumbnail(bicon)
  .setDescription("Bot Info")
  .addField("Creator", "<@444998388795179042>", true)
  .addField("Bot Name", `${bot.user.username}`, true)
  .addField("Servers", `${Snum}`, true)
  .addField("Channels", `${Cnum}`, true)
  .addField("Users", `${Unum}`, true)
  .addField("Created On", bot.user.createdAt.toUTCString(), true)
  .setTimestamp()
  .addField("Git Repo", "https://github.com/Kggupta/borgcube", true)

    message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["btinfo"],
  description: "Get info about me",
  usage: "bbotinfo",
  accessibleby: "Anyone"
}
