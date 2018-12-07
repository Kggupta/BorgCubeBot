const Discord = require("discord.js");


module.exports.run = async (bot, message, args)=>{
  let bicon = bot.user.displayAvatarURL;
  let helpEmbed = new Discord.RichEmbed()
  .setTitle("Bot Help")
  .setColor("GREEN")
  .setThumbnail(bicon)
  .addField("bhail/ping", "Get the bot ping")
  .addField("bhelp/h", "Gives you the list of commands")
  .addField("bcredits/coins/coin/balance/bal/$", "Check your federation credits balance")
  .addField("bsend/transfer/give `user` `amount`", "Send credits to the specified user")
  .addField("breport/rpt/bar `user` `reason`", "Report a user and send the reciept to the channel #reports")
  .addField("bserverinfo/srvinfo", "Get basic information about the server")
  .addField("bbotinfo/btinfo", "Get basic information about me")
  .addField("bdebt/db/checkdebt/debtbal", "Check your debt from borg loans (experimental)")
  .addField("bcoinflip/cf/bf/flip `t/h` `amount`", "Flip a coin and bet on the outcome")
  .addField("btempmute/mute/tm `user` `time + s/m/h/d`", "Mute the specified user for a specified amount of time")
  .addField("bunmute/um `user`", "Unmute the specified user")
  .addField("bassimilate/invade `user` `message`", "Resistance is futile!")
  .addField("bkick/k/boot `user` `reason`", "Kick the specified user with a specified reason.")

  message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "help",
  aliases: ["h"]
}
