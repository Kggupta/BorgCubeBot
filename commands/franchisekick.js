const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "718638326973988935") return;
  if(!message.member.roles.find(r => r.name === "Franchise Recruiter") || !message.member.hasPermission('ADMINISTRATOR')){
    const channel = message.guild.channels.find(`name`, "taco-leaders");
    channel.send(`${message.author.username} | ${message.author.id} tried to use the recruit command.`)
    return message.channel.send("You aren't a franchise recruiter! This incident will be reported.");
  }
  const member = message.guild.member(message.mentions.users.first());
  let reason = args.join(" ").slice(22);
  if (!reason){
    reason = "No reason given"
  }
  const role = message.guild.roles.find(role => role.name === "Visitor");
  if (!member || !role) return message.channel.send("Failed due to invalid arguments")
  member.addRole(role)
  const roleFPF = message.guild.roles.find(role => role.name === "Fars Peak Franchise");
  member.removeRole(roleFPF)
  .then((MemberGuild) => {
    member.send(`Looks like you've been kicked from FPF. If you're still in the server, you are welcome to use it and the customer bot, however you must contact a recruiter to discuss getting re-invited to the franchise. You will not get any of the franchise perks until you do this. \n\n Reason for kick: ${reason}`)
    .catch((MemberGuild) => {
      message.channel.send(`${member} Looks like you've been kicked from FPF. If you're still in the server, you are welcome to use it and the customer bot, however you must contact a recruiter to discuss getting re-invited to the franchise. You will not get any of the franchise perks until you do this. \n\n Reason for kick: ${reason}`)
    })
  })


}

module.exports.help = {
  name: "franchisekick",
  aliases: ["frankick", "fkick"],
  description: "Stops the mentioned member from seeing FPF specific channels. Use this on a member you just kicked. An optional reason for their kick can be included.",
  usage: "brecruit <member> {reason}",
  accessibleby: "FPF Recruiters"
}
