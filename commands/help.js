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
      .setDescription(`**Command:** ${command.help.name}\n **Description:** ${command.help.description}\n**Usage:** ${command.help.usage}\n **Accessible by:** ${command.help.accessibleby}\n **Aliases:** ${command.help.aliases}\n\n **Note:**\n- **< >** must be a mention. \n- **{ }** have no character limit.\n- **[ ]** are one word arguments.\n- Ommit brackets when using a command.`)
      message.channel.send(helpEmbed);
    }
  }
  if (!args[0]){
    message.delete();
    let DMembed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Help`)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("Get more info using", "`bhelp {command}`")
    .setDescription("The commands are:\n\n <a:jelly:525727683506864148> **FUN**\n`assimilate`\n\n <:bang:525725763777986571> **Loans**\n`debt` `loanrules` `setdebt`\n\n 💸 **Currency**\n`coinflip` `credits` `send` `addmoney`\n\n <:banhammer:525730006522003467> **Moderation**\n`ban` `kick` `report` `mute` `unban` `unmute` `purge` `addrole` `removerole`\n\n <:crazyeyes:525725763777855500> **Other**\n `userinfo` `avatar` `botinfo` `rbug` `help` `ping` `serverinfo` `youtube` `play (BETA)` `stop (BETA)` `poll`\n\n <:uwuwu:456238538455777291>**Emotes**\n`jelly`<a:jelly:525727683506864148> `mario`<a:mario:525727683305537548> `smak`<a:smak:525727716805443604> `sanity`<a:sanity:525727716520230950> `partybird`<a:partybird:525727685545164810> `penguin`<a:penguin1:525739937128120340><a:penguin2:525739937342160896><a:penguin3:525739937195360257><a:penguin4:525739937379647488> `scared` <a:scared:525740761262587904> `nom` <a:nom:525745634842771476> `jellywall` <a:jellywall:529040908939952128> `dogedance` <a:dogedance:530787990386114570> `thonk` <a:wtfthonk:536261946572275722> `yey` <a:yey:547229235245219865>")
    .addField("Support server", "https://discord.gg/evYQA2h")
    return message.channel.send(DMembed);

  }
}


module.exports.help = {
  name: "help",
  aliases: ["h"],
  description: "Sends help with how to use a command.",
  usage: "bhelp [command]",
  accessibleby: "Anyone"
}
