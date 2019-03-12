const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args)=>{
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to do that");
  let usertomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!usertomute) return message.reply("No user specified");
  if (usertomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cannot mute that person. This message appears if my highest role is lower than the targets highest role or if I do not have the `Manage Roles` permission.");
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

  let timetomute = args[1];
  let muteReason = "";
  if (ms(timetomute) === undefined) return message.channel.send("Give a valid time period");
  args.shift();
  args.shift();
  console.log(args);
  await(usertomute.addRole(muterole.id));
  if(!args[1]){
    muteReason = "No reason given";
  }else{
    muteReason = args.join(" ");
  }
  let muteEmbed = new Discord.RichEmbed()
  .setTitle("Muted")
  .setColor("RED")
  .addField("Mute Enforcer", `<@${message.author.id}>`)
  .addField("User Muted", `<@${usertomute.id}>`)
  .addField("Duration of mute", timetomute)
  .addField("Reason", muteReason)
  message.channel.send(muteEmbed);

  let muteChannel = message.guild.channels.find(`name`, "mod-log");
  if(!muteChannel){
    muteChannel = message.channel
    message.channel.send("Can't find incidents channel. I will mute this person anyway, The Borg suggests that you make a channel called `mod-log` in the future.");
  }else{
    muteChannel.send(muteEmbed);
  }


  setTimeout(function(){
    usertomute.removeRole(muterole.id);
    let unmuteEmbed = new Discord.RichEmbed()
    .setTitle("Unmuted")
    .setColor("RED")
    .addField("Mute was enforced by", `<@${message.author.id}>`)
    .addField("User Unmuted", `<@${usertomute.id}>`);
    return message.channel.send(unmuteEmbed);
  }, ms(timetomute));


}

module.exports.help = {
  name: "mute",
  aliases: ["tempmute","tm"],
  description: "Temporarily mute a player, include a time period in the form of `number` then unit (s,m,h,d)\n -For this command to work the bot must have `Manage Roles` permission and a higher role than the target.\n -If the target has a role that manually gives them permission to send messages this command will not work!",
  usage: "bmute {user} {time}",
  accessibleby: "Administrator"
}
