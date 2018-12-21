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
  .addField("Creator", "<@444998388795179042>")
  .addField("Bot Name", `${bot.user.username}`)
  .addField("Servers", `${Snum}`)
  .addField("Channels", `${Cnum}`)
  .addField("Users", `${Unum}`)
  .addField("Created On", bot.user.createdAt)
  .setTimestamp()
  .addField("Git Repo", "https://github.com/Kggupta/borgcube")

    message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["btinfo"],
  description: "Get info about me",
  usage: "bbotinfo",
  accessibleby: "Anyone"
}
