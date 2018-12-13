const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args)=>{
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to do that");
  let usertomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!usertomute) return message.reply("No user specified");
  if (usertomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cannot mute that person");
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
  if(!timetomute) return message.reply("You didnt give a time to mute");

  await(usertomute.addRole(muterole.id));
  let muteEmbed = new Discord.RichEmbed()
  .setTitle("Muted")
  .setColor("RED")
  .addField("Mute Enforcer", `<@${message.author.id}>`)
  .addField(`User with id ${usertomute}`, `Muted for ${timetomute}`);

  message.channel.send(muteEmbed);

  setTimeout(function(){
    usertomute.removeRole(muterole.id);
    let unmuteEmbed = new Discord.RichEmbed()
    .setTitle(`User with id ${usertomute} has been un-muted`)
    .setColor("RED")
    .addField("Mute was enforced by", `<@${message.author.id}>`);

    return message.channel.send(unmuteEmbed);
  }, ms(timetomute));


}

module.exports.help = {
  name: "mute",
  aliases: ["tempmute","tm"],
  description: "Temporarily mute a player",
  usage: "bmute {user} {time}",
  accessableby: "Administrator"
}
