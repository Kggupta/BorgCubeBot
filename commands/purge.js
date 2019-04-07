const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    if (isNaN(args[0])) {
      return message.channel.send("You didnt give a number for me to delete.").then(m => m.delete(1000))
    }

    var am = args[0]
    setTimeout(() => {
      message.channel.bulkDelete(am).catch(err => message.channel.send("I couldn't assimilate those messages. Bots cannot purge more than 100 messages at a time nor can they delete messages more than 14 days old. You may also get this message due to a DiscordAPI overload.").then(m => m.delete(2000)))
      message.channel.send("I've assimilated " + am + " messages.").then(m => m.delete(1000))
    }, 2000);
  } else {
  	message.channel.send("Feeble human you do not have permission to do that!").then(m => m.delete(1500))
  }
}

module.exports.help = {
  name: "purge",
  aliases: ["delete", "del"],
  description: "Delete a specified amount of messages in a channel.\n- Bot can only purge 100 messages at a time\n - Messages older than 14 days cannot be deleted. This is due to Discord ToS and cannot be avoided.",
  usage: "bpurge [amount]",
  accessibleby: "`MANAGE_MESSAGES`"
}
