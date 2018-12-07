const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kickedUser) return message.channel.send("Can't find user!");
    let kickReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You aren't an Admin, simple human.");
    if(kickedUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You would attempt to kick someone of The Borg Collective?");
    if(!kickedUser.kickable) return message.channel.send("This person's role is too high for me");
    console.log(message.mentions.users.first().highestRole)
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `${kickedUser} with ID ${kickedUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kickReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel){
      kickChannel = message.channel
      message.channel.send("Can't find incidents channel. I will kick this person anyway, The Borg suggests that you make a channel called `mod-log` in the future.");
    }

    message.guild.member(kickedUser).kick(kickReason);
    kickChannel.send(kickEmbed);
}


module.exports.help = {
  name: "kick",
  aliases: ["k", "boot"]
}
