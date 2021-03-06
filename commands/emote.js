const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  const emotes = ["jelly", "<a:jelly:525727683506864148>", "mario", "<a:mario:525727683305537548>", "smak", "<a:smak:525727716805443604>", "sanity", "<a:sanity:525727716520230950>", "partybird", "<a:partybird:525727685545164810>","penguin", "<a:penguin1:525739937128120340><a:penguin2:525739937342160896><a:penguin3:525739937195360257><a:penguin4:525739937379647488>", "scared", "<a:scared:525740761262587904>","nom","<a:nom:525745634842771476>", "neonblob", "<a:neonblob:525835833388040258>", "jellywall", "<a:jellywall:529040908939952128>", "dogedance", "<a:dogedance:530787990386114570>", "thonk", "<a:wtfthonk:536261946572275722>", "yey", "<a:yey:547229235245219865>", "cri", "<a:cri:615245538929016893>","wave","<a:wave:615245526052634665>", "lsdjelly","<a:lsdjelly:627988914673680404>"];

  args.forEach(function(element,index){
    emotes.forEach(function(element2,index2){
      if (element2==element){
       args[index] = emotes[index2+1]
      }
    })
  });

  let emoteEmbed = new Discord.RichEmbed()
  .setTitle(`${message.author.username} says`)
  .setColor("GREEN")
  .setDescription(args.join(" "))

  message.channel.send(emoteEmbed);

  try{
    return message.delete();
  }catch(error){
    console.log(error)
    return;
  }
}

module.exports.help = {
  name: "emote",
  aliases: ["emte"],
  description: "\n-Have the bot send an animated emote on your behalf!\n-Type `brbug {Emote URL}` to have it added to the list of emotes **Must be animated**.\n-Type `bhelp` to see the list of emotes that the bot currently has.",
  usage: "bemote {message}",
  accessibleby: "Anyone"
}
