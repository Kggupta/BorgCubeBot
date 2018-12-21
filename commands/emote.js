const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  const emotes = ["jelly", "<a:jelly:525727683506864148>", "mario", "<a:mario:525727683305537548>", "smak", "<a:smak:525727716805443604>", "sanity", "<a:sanity:525727716520230950>", "partybird", "<a:partybird:525727685545164810>","penguin", "<a:penguin1:525739937128120340><a:penguin2:525739937342160896><a:penguin3:525739937195360257><a:penguin4:525739937379647488>", "scared", "<a:scared:525740761262587904>","dance", "<a:dance:525697744711712771>","nom","<a:nom:525745634842771476>"];
  emoteName = args[0];
  if(!emoteName) return;
  const isInArray = emotes.includes(emoteName);
  if(isInArray == true){
    var count = emotes.length;
    for(var i=0;i<count;i++)
    {
      if(emotes[i]===emoteName){
        message.delete()
        return message.channel.send(`${message.author.username} says ${emotes[i+1]}`);
      }
    }
  }
}

module.exports.help = {
  name: "emote",
  aliases: ["e"],
  description: "Have the bot send an animated emote on your behalf!\n Type `brbug {Emote URL}` to have it added to the list of emotes **Must be animated**.\nType `bhelp` to see the list of emotes that the bot currently has.",
  usage: "bemote {name}",
  accessibleby: "Anyone"
}
