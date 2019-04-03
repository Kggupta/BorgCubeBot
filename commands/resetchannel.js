const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "546754678172549124") return;
  if(!message.member.roles.find(r => r.name === "QGames")){
    return message.channel.send("You don't have the required role to use this command");
  }
  let roles = message.guild.roles;
  let everyonerole = roles.find('name', '@everyone');
  let qGamesrole = roles.find('name', 'QGames')
  let resetQGEmbed = new Discord.RichEmbed()
  .setTitle("Questionable Games Reset")
  .setColor("#e56b00")
  .addField("Attempted by ID", `ID: ${message.author.id}`)
  .addField("Attempted by name", `<@${message.author.id}>`)
  .addField("Time", message.createdAt);

  let rQGChannel = message.guild.channels.find(`name`, "evidence-logs");
  rQGChannel.send(resetQGEmbed);

  message.author.send("Note that doing this is permanent.\n\n**If you are using this command while a game is still going on and the players do not want you to reset the channel, there will be consequences (Dont think you can hide, I can see everything that happens on my bot)**");
  let resetchannel = message.guild.channels.find(`name`, "questionable-games");
  resetchannel.delete();
  message.guild.createChannel("questionable-games", "text")
    .then(channel => {
      channel.setParent("547973207387406336");
      channel.overwritePermissions(
        everyonerole,
        { 'READ_MESSAGES': false },
      )
      channel.overwritePermissions(
        qGamesrole,
        { 'READ_MESSAGES': true },
      )

    });
    return;
}

module.exports.help = {
  name: "resetchannel",
  aliases: ["resetc", "resc", "rchan"],
  description: "Deletes and remakes the pre-determined channel",
  usage: "bresetchannel",
  accessibleby: "QGames role"
}
