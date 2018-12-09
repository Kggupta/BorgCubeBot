const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bannedUser) return message.channel.send("Can't find user!");
  let banReason = args.join(" ").slice(22);
  if (!banReason){
    banReason = "No reason given"
  }
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You aren't an Admin, simple human.");
  if(bannedUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You would attempt to ban someone of The Borg Collective?");
  if(!bannedUser.bannable) return message.channel.send("This person's role is too high for me");
  console.log(message.mentions.users.first().highestRole)
  let banEmbed = new Discord.RichEmbed()
  .setDescription("Banned")
  .setColor("#e56b00")
  .addField("Banned User", `${bannedUser} with ID ${bannedUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", banReason);

  let bannedChannel = message.guild.channels.find(`name`, "mod-log");
  if(!bannedChannel){
    bannedChannel = message.channel
    message.channel.send("Can't find incidents channel. I will ban this person anyway, The Borg suggests that you make a channel called `mod-log` in the future.");
  }
  message.guild.member(bannedUser).ban(banReason);
  bannedChannel.send(banEmbed);

}

module.exports.help = {
  name: "ban",
  aliases: ["banhammer"]
}
