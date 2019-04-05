const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let roleparameter = args.join(` `)
  if(!roleparameter){
    return message.channel.send("Specify a role!");
  }

  let foundRole = message.guild.roles.find(`name`, roleparameter);
  if(!foundRole){
    return message.channel.send("No role found");
  }

  const roleInfoEmbed = new Discord.RichEmbed()
  .setColor(foundRole.hexColor)
  .addField("Role ID", foundRole.id, true)
  .addField("Role Name", foundRole.name, true)
  .addField("Role Hex Color", foundRole.hexColor, true)
  .addField("Role Member Size", foundRole.members.size, true)
  .addField("Hierarchy Position", foundRole.position, true)
  .addField("Hoisted", foundRole.hoist, true)
  .addField("Mentionable", foundRole.mentionable, true)

  return message.channel.send(roleInfoEmbed);
}

module.exports.help = {
  name: "roleinfo",
  aliases: ["roinfo"],
  description: "Get information about the specified role",
  usage: "broleinfo {rolename}",
  accessibleby: "Anyone"
}
