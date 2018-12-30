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
      .setDescription(`**Command:** ${command.help.name}\n **Description** ${command.help.description}\n**Usage:** ${command.help.usage}\n **Accessible by:** ${command.help.accessibleby}\n **Aliases:** ${command.help.aliases}`)
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
    .addField("Get more info using", "`bhelp {command}`")
    .setDescription("The commands are:\n\n <a:jelly:525727683506864148> **FUN**\n`assimilate`\n\n <:bang:525725763777986571> **Loans**\n`debt` `loanrules` `setdebt`\n\n 💸 **Currency**\n`coinflip` `credits` `send` `addmoney`\n\n <:banhammer:525730006522003467> **Moderation**\n`ban` `kick` `report` `mute` `unban` `unmute`\n\n <:crazyeyes:525725763777855500> **Other**\n `botinfo` `rbug` `help` `ping` `serverinfo`\n\n <:uwuwu:456238538455777291>**Emotes**\n`jelly`<a:jelly:525727683506864148> `mario`<a:mario:525727683305537548> `smak`<a:smak:525727716805443604> `sanity`<a:sanity:525727716520230950> `partybird`<a:partybird:525727685545164810> `penguin`<a:penguin1:525739937128120340><a:penguin2:525739937342160896><a:penguin3:525739937195360257><a:penguin4:525739937379647488> `scared` <a:scared:525740761262587904> `dance` <a:dance:525697744711712771> `nom` <a:nom:525745634842771476> `jellywall` <a:jellywall:529040908939952128>")
    .addField("Support server", "https://discord.gg/evYQA2h")
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
