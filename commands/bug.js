const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
    let bugmessage = args.join(" ");
    console.log(bugmessage)
    let bugembed = new Discord.RichEmbed()
    .setTitle("Bug report")
    .setColor("RED")
    .addField("Reported by", message.author.username)
    .addField("Player ID", message.author.id)
    .addField("In server", message.guild.id)
    .addField("In channel", message.channel.id)
    .setTimestamp()
    .addField("Account created", message.author.createdAt)
    .addField("Bug", bugmessage);

    bot.channels.get("522985854319329295").send(bugembed)
    message.channel.send("Thank you for the report! I will review it and fix the problem ASAP. **Note that abuse of this command will result in a permanent ban from the bot!**")


}

module.exports.help = {
  name: "rbug",
  aliases: [],
  description: "Report a bug in the bot",
  usage: "brbug {bug}",
  accessibleby: "Anyone"
}
