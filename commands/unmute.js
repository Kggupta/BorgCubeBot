const Discord = require("discord.js");


module.exports.run = async (bot, message, args)=>{
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to do that");
  var usertounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!usertounmute) return message.reply("No user specified");
  if(usertounmute.roles.has(muterole.id)){
    usertounmute.removeRole(muterole.id);
    return message.reply("User unmuted");
  }else{
    return message.reply("That user wasn't muted");
  }
}

module.exports.help = {
  name: "unmute",
  aliases: ["um"],
  description: "Unmute a player",
  usage: "bunmute <member>",
  accessibleby: "Administrator"
}
