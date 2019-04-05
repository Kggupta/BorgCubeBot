const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
    let ping = Math.round(bot.ping)

    let pingembed = new Discord.RichEmbed()
    .setTitle("Hailing Frequencies")
    .setColor("GREEN")
    .setDescription(`Positron-delay: ${ping}ms`)

    message.channel.send(pingembed);
}

module.exports.help = {
  name: "hail",
  aliases: ["ping"],
  description: "Check the bot ping",
  usage: "bhail",
  accessibleby: "Anyone"
}
