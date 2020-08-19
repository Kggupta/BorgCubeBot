const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "718638326973988935") return;
  if(!message.member.roles.find(r => r.name === "Franchise Recruiter")){
    const channel = message.guild.channels.find(`name`, "taco-leaders");
    channel.send(`${message.author.username} | ${message.author.id} tried to use the recruit command.`)
    return message.channel.send("You aren't a franchise recruiter! This incident will be reported.");
  }
  const member = message.guild.member(message.mentions.users.first());
  const role = message.guild.roles.find(role => role.name === "Visitor");
  if (!member || !role) return message.channel.send("Failed due to invalid arguments")
  member.removeRole(role)
  const roleFPF = message.guild.roles.find(role => role.name === "Fars Peak Franchise");
  const roleTacoShopper = message.guild.roles.find(role => role.name === "Taco Shopper");
  const roleMem = message.guild.roles.find(role => role.name === "Member");
  member.addRole(roleFPF)
  .then((MemberGuild) => {
      member.addRole(roleTacoShopper)
      .then((MemberGuild) => {
        member.addRole(roleMem)
        return message.channel.send(`Welcome to the franchise, ${member}!`);
      })
  })


}

module.exports.help = {
  name: "recruit",
  aliases: ["rec"],
  description: "Recruit the mentioned player to the franchise. It will setup all their roles as a new member.",
  usage: "brecruit <member>",
  accessibleby: "FPF Recruiters"
}
