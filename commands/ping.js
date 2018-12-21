const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{

    let basestation = Math.floor(Math.random()*1000)+1;
    let ping = Math.round(bot.ping)
    let picon = message.author.displayAvatarURL;
    let pingembed = new Discord.RichEmbed()
    .setTitle("Hailing Frequencies = INITIATED")
    .setColor("GREEN")
    .setThumbnail(picon)
    .addField(`Reply recieved from Starbase-${basestation}`, `Positron-delay: ${ping}ms`)

    message.channel.send(pingembed);
}

module.exports.help = {
  name: "hail",
  aliases: ["ping"],
  description: "Check the bot ping",
  usage: "bhail",
  accessibleby: "Anyone"
}
