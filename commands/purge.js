const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    if (isNaN(args[0])) {
      return message.channel.send("You didnt give a number for me to delete.").then(m => m.delete(1000))
    }

    var am = args[0]
    message.channel.send("Assimilating: " + am + " messages").then(m => m.delete(2000))

    setTimeout(() => {
      message.channel.bulkDelete(am)
      .then(() => {
          message.channel.send("Just assimilated: " + am + " messages.").then(m => m.delete(1500))
      })
      .catch(err => message.channel.send("Assimilating the messages failed for some reason. If you get this messages please report the bug using `brbug {explantion}`").then(m => m.delete(5000)))
    }, 1000);
  } else {
  	message.channel.send("Feeble human you do not have permission to do that!").then(m => m.delete(1500))
  }
}

module.exports.help = {
  name: "purge",
  aliases: ["delete", "del"],
  description: "Delete a specified amount of messages in a channel.",
  usage: "bpurge {amount}",
  accessibleby: "Must have `MANAGE_MESSAGES` permission."
}
