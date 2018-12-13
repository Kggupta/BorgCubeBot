const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("GREEN")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username)

    message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["btinfo"],
  description: "Get info about me",
  usage: "bbotinfo",
  accessableby: "Anyone"
}
