const Discord = require("discord.js");
const Client  = new Discord.Client();
const {GoogleSpreadsheet} = require('google-spreadsheet');
const { promisify } = require('util');
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

async function accessSpreadsheet(entries, lbtype, message){
  console.log(lbtype)
  await doc.useServiceAccountAuth({
    private_key_id: process.env.PRIVATE_KEY_ID.replace(new RegExp("\\\\n", "\g"), "\n"),
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,

  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  const rows = await sheet.getRows();
  var indexInSheet = -1
    switch(lbtype){
      case "Shifts":
        for(var i = 0; i < entries.length; i++){
          indexInSheet = -1
          var searchTerm = (entries[i])[0]
          for(var t = 0, len = rows.length; t < len; t++) {
            if (rows[t].ID === searchTerm) {
              indexInSheet = t;
              break;
            }
          }
          if (indexInSheet == -1) {
            await sheet.addRow({ID: searchTerm, incomePrior: 0, incomeCurrent: 0, shiftsPrior: 0, shiftsCurrent:(entries[i][1]), donationPrior: 0, donationCurrent: 0, memberStatus: "NEW"});
            message.channel.send(`Added ${searchTerm} to sheet. Please manually insert the shack name and username.`)
          }else{
            rows[indexInSheet].shiftsPrior = rows[indexInSheet].shiftsCurrent
            rows[indexInSheet].shiftsCurrent = (entries[i])[1]
            rows[indexInSheet].shiftsIncrease = parseInt(rows[indexInSheet].shiftsCurrent) - parseInt(rows[indexInSheet].shiftsPrior)
            rows[indexInSheet].memberStatus = "OLD"
            await rows[indexInSheet].save();
          }
        }
        message.channel.send("Ready for next page.")
        break;
        case "Donations":
          for(var i = 0; i < entries.length; i++){
            indexInSheet = -1
            var searchTerm = (entries[i])[0]
            for(var t = 0, len = rows.length; t < len; t++) {
              if (rows[t].ID === searchTerm) {
                indexInSheet = t;
                break;
              }
            }
            if (indexInSheet == -1){
              await sheet.addRow({ID: searchTerm, incomePrior: 0, incomeCurrent: 0, shiftsPrior: 0, shiftsCurrent:0, donationPrior: 0, donationCurrent: (entries[i])[1], memberStatus: "NEW" });
              message.channel.send(`Added ${searchTerm} to sheet. Please manually insert the shack name and username.`)
            }else{
              rows[indexInSheet].donationPrior = rows[indexInSheet].donationCurrent
              rows[indexInSheet].donationCurrent = (entries[i])[1]
              rows[indexInSheet].donationIncrease = parseInt(rows[indexInSheet].donationCurrent) - parseInt(rows[indexInSheet].donationPrior.replace(/,/g,"").replace(/\$/g,""))
              rows[indexInSheet].memberStatus = "OLD"
              await rows[indexInSheet].save();
            }
          }
          message.channel.send("Ready for next page.")

          break;
          case "Incomes":
            for(var i = 0; i < entries.length; i++){
              indexInSheet = -1
              var searchTerm = (entries[i])[0]
              for(var t = 0, len = rows.length; t < len; t++) {
                if (rows[t].ID === searchTerm) {
                  indexInSheet = t;
                  break;
                }
              }
              if (indexInSheet == -1){
                await sheet.addRow({ID: searchTerm, incomePrior: 0, incomeCurrent: (entries[i][1]), shiftsPrior: 0, shiftsCurrent:0, donationPrior: 0, donationCurrent: 0, memberStatus: "NEW"});
                message.channel.send(`Added ${searchTerm} to sheet. Please manually insert the shack name and username.`)
              }else{
                rows[indexInSheet].incomePrior = rows[indexInSheet].incomeCurrent
                rows[indexInSheet].incomeCurrent = (entries[i])[1]
                rows[indexInSheet].incomeIncrease = parseInt(rows[indexInSheet].incomeCurrent) - parseInt(rows[indexInSheet].incomePrior.replace(/,/g,"").replace(/\$/g,""))
                rows[indexInSheet].memberStatus = "OLD"
                await rows[indexInSheet].save();
              }
            }
            message.channel.send("Ready for next page.")
            break;
    }
}

module.exports.run = async (bot, message, args)=>{
  if (message.guild.id != "718638326973988935") return;
  if(!message.member.roles.find(r => r.name === "Franchise Recruiter")){
    const channel = message.guild.channels.find(`name`, "taco-leaders");
    channel.send(`${message.author.username} | ${message.author.id} tried to use the analyse command.`)
    return message.channel.send("You aren't a franchise recruiter! This incident will be reported.");
  }
  let messageid = args[0]
  if (!messageid) return message.channel.send("The message ID is required.")
  message.channel.fetchMessage(messageid)
    .then(message => {
      message.embeds.forEach((embed) => {
        let name = embed.author.name
        let regex = "(Donations|Incomes|Shifts)"
        let category = name.match(regex)
        let content = embed.description.split("\n")
        let regexForMention = "<.+>"
        let regexForPara = "- [0-9]+"
        let refinedRegexPara = "[0-9]+"
        let parsedEntries = []
        var arrayLength = content.length;
        switch (category[0]){
          case "Shifts":
            for (var i = 0; i < arrayLength; i++) {
              let id = content[i].match(regexForMention)[0].match("[0-9]{18}")[0]
              parsedEntries.push([id,content[i].match(regexForPara)[0].match(refinedRegexPara)[0]])
            }
            break;
          case "Incomes":
            regexForPara = "[$]{1}[0-9,]+"
            refinedRegexPara = "[0-9,]+"
            for (var i = 0; i < arrayLength; i++) {
              let id = content[i].match(regexForMention)[0].match("[0-9]{18}")[0]
              parsedEntries.push([id,(content[i].match(regexForPara)[0].match(refinedRegexPara)[0]).replace(/,/g, "")])
            }
            break;
          case "Donations":
            regexForPara = "- 💵 .+"
            refinedRegexPara = "[0-9,]+"
            for (var i = 0; i < arrayLength; i++) {
              let id = content[i].match(regexForMention)[0].match("[0-9]{18}")[0]
              parsedEntries.push([id,(content[i].match(regexForPara)[0].match(refinedRegexPara)[0]).replace(/,/g, "")])
            }
            break;
        }

        accessSpreadsheet(parsedEntries, category[0], message)
      })
    })
    .catch(console.error);
}

module.exports.help = {
  name: "franchiseanalyse",
  aliases: ["fpfanalyse"],
  description: "Update the FPF google spreadsheet with the latest data.",
  usage: "bfranchiseanalyse [messageid]",
  accessibleby: "Anyone"
}
