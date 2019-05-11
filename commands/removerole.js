const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) { //roles.has is false for addroel & removerole
      var rolename = "";
      const member = message.guild.member(message.mentions.users.first());
      for (i=1; i<args.length; i++){
        if (i == 1){
          rolename = args[1]
        }else{
          rolename = rolename + " " + args[i]
        }
      }
      const role = message.guild.roles.find(role => role.name === rolename);
      if (member.id === message.author.id) return message.reply("You cannot remove a role from yourself");
      if (!member || !role) return message.channel.send("Remove role failed due to invalid arguments")
      member.removeRole(role)
      .then((MemberGuild) => {
          return message.channel.send(`:white_check_mark: Role ${rolename} has been removed from ${member} `);
      })
      .catch ((err) => {
          return message.channel.send(`:x: Was not able to remove Role ${rolename} from ${member} `);
      });
  } else {
      return message.channel.send("You do not have permission to do this, you must have `MANAGE_ROLES_OR_PERMISSIONS` to use this command.");
  }
}

module.exports.help = {
  name: "removerole",
  aliases: ["remrole"],
  description: "Remove a specified role from a specified user",
  usage: "bremoverole <member> {rolename}",
  accessibleby: "MANAGE_ROLES_OR_PERMISSIONS"
}
