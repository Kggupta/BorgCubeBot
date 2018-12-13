const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let contenttoreply = message.mentions.users.first() || args[0]
  if (!contenttoreply) return message.reply("No matter how much The Borg may want to assimilate the air, it is not possible")
  if (contenttoreply.id === "444998388795179042" || contenttoreply.id === "518206536535769099") return message.reply("Feeble human! You would attempt to assimilate The Borg Collective?")
  let assimilatemessage = args.join(" ").slice(22);
  if (!assimilatemessage){
    assimilatemessage = "You have just been assimilated!"
  }
  message.channel.send(`${contenttoreply}, ${assimilatemessage} http://www.youtube.com/watch?v=AyenRCJ_4Ww`)
}

module.exports.help = {
  name: "assimilate",
  aliases: ["ae", "invade", "borg"],
  description: "Assimilate the mentioned user",
  usage: "bassimilate <mention> {message}",
  accessableby: "Anyone"
}
