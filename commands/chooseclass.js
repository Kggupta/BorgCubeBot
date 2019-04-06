const Discord = require("discord.js");
let rpgdata = require("../rpgdata.json");
const fs = require("fs");

module.exports.run = async (bot, message, args)=>{
  if(!rpgdata[message.author.id]){
    let specieschoice = args[0]
    let species;
    switch(specieschoice) {
      case "1":
        species = "Human"
      break;
      case "2":
        species = "Vulcan"
      break;
      case "3":
        species = "Klingon"
      break;
      case "4":
        species = "Ferengi"
      break;
      default:
        return message.channel.send("Not a valid choice")
      break;
    }
    message.channel.send("Are you sure? This cannot be undone!").then(msg =>{
      msg.react('✅').then( r =>{
        msg.react('❎')

        const yeschoice = (reaction,user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const nochoice = (reaction,user) => reaction.emoji.name === '❎' && user.id === message.author.id;

        const yes = msg.createReactionCollector(yeschoice, {time: 5000});
        const no = msg.createReactionCollector(nochoice, {time: 5000});
        yes.on('collect', r =>{//When backward emoji is selected
          rpgdata[message.author.id] = {
            race: species
          }
          fs.writeFile("rpgdata.json", JSON.stringify(rpgdata), (err) =>{
            if (err) console.log(err)
          })
          message.channel.send(`Species set as ${species}`)
          return msg.delete();
        })

        no.on('collect', r=>{//When forward emoji is selected
          message.channel.send("Cancelled")
          return msg.delete();
        })//End of cancel handler
      })//End of reaction handler
    })//Bot (msg) end of handler


  }else{
    return message.reply(`You are already ${rpgdata[message.author.id].race}`)
  }
}

module.exports.help = {
  name: "pickspecies",
  aliases: ["chooseclass", "pickspec"],
  description: "Pick your species! This cannot be reversed once you make your choice!\n The number is the species number out of 4 displayed when you use the `species` command.\n Please note that since the RPG functionality is new, databases will be unstable and saves might get lost. If they do feel free to DM me (The Borg) and I will fix it for you.",
  usage: "bpickspecies [number]",
  accessibleby: "Anyone"
}
