const Discord = require("discord.js");
const prefix = "b"

module.exports.run = async (bot, message, args)=>{

  if(args[0] == "help") return message.channel.send("The syntax is bhelp {command}")

  if(args[0]){
    let command = args[0];
    if(bot.commands.has(command)){
      command = bot.commands.get(command);
      var helpEmbed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setAuthor(`${command.help.name.charAt(0).toUpperCase()+command.help.name.slice(1)}`, message.guild.iconURL)
      .setDescription(`**Command:** ${command.help.name}\n **Description** ${command.help.description}\n**Usage:** ${command.help.usage}\n **Accessible by:** ${command.help.accessableby}\n **Aliases:** ${command.help.aliases}`)
      message.channel.send(helpEmbed);
    }
  }
  if (!args[0]){
    message.delete();
    let Checkembed = new Discord.RichEmbed()
    .setAuthor(`Help`, message.guild.iconURL)
    .setColor("GREEN")
    .setDescription("Check Your DM's")

    let DMembed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Help`)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .setDescription("The commands are:")
    .addField("bhail", "Get the bot ping")
    .addField("bhelp `command`", "Gives you the list of commands")
    .addField("bcredits", "Check your federation credits balance")
    .addField("bsend `user` `amount`", "Send credits to the specified user")
    .addField("breport `user` `reason`", "Report a user and send the reciept to the channel #reports")
    .addField("bserverinfo", "Get basic information about the server")
    .addField("bbotinfo", "Get basic information about me")
    .addField("bdebt", "Check your debt from borg loans (experimental)")
    .addField("bcoinflip `t/h` `amount`", "Flip a coin and bet on the outcome")
    .addField("btempmute `user` `time + s/m/h/d`", "Mute the specified user for a specified amount of time")
    .addField("bunmute `user`", "Unmute the specified user")
    .addField("bassimilate `user` `message`", "Resistance is futile!")
    .addField("bkick `user` `reason`", "Kick the specified user with a specified reason.")
    .addField("bban `user` `reason`", "Ban a user with a specified reason")
    .addField("bunban `user`", "Unban the given user using their ID")
    message.channel.send(Checkembed);
    message.author.send(DMembed)

  }
}


module.exports.help = {
  name: "help",
  aliases: ["h"],
  description: "Sends help with how to use a command.",
  usage: "bhelp {command}",
  accessibleby: "Anyone"
}
