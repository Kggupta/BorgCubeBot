const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("You need to enter a user");
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send("A reason is needed for the report to be filed")
  let reportEmbed = new Discord.RichEmbed()
  .setTitle("Reports")
  .setColor("GREEN")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", `${message.channel}`)
  .addField("Reason", reason);

  let reportchannel = message.guild.channels.find(`name`, "reports");
  if(!reportchannel) return message.channel.send("Could not find reports channel. Name the channel `reports` or as a mod to do it for you to enable this command.")
  message.delete().catch(O_o=>{})
  reportchannel.send(reportEmbed)
}

module.exports.help = {
  name: "report",
  aliases: ["rpt", "bar"]
}
