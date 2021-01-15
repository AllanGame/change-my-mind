const Discord = require("discord.js");
module.exports = {
    name: "poll",
    usage: 'poll {question} {options}',
    onlyowner: false,
    alias: [""],
    cooldown: 3,
    perms: [],
    run: (client, message, args, storage) => {
    const PollSchema = require("../models/poll.js");
    const codeGenerator = require("../utils/codeGenerator.js")        
        if(!args[0]) return message.channel.send(`Usage: \`${client.commands.get('poll').usage}\``)

        let pollCode = codeGenerator.generateCode(6);

        PollSchema.findOne({
            userID: message.author.id,
            guildID: message.guild.id,             
            pollID: pollCode
        }, (err, poll) => {
            
            if(err) {
                console.error(err);
            }
            if(!poll) {
                const newPollSchema = new PollSchema({
                    userID: message.author.id,
                    guildID: message.guild.id, 
                    pollID: pollCode, 
                    question: args[0],
                    status: "Pending"
                });
                
                return newPollSchema.save().then(p => {
                    let POLL_EMBED = new Discord.MessageEmbed()
                    .setTitle(p.question)
                    .setDescription("**Options**")
                    .addField(":one: Me                              90% (4 votes)", "** **",false)
                    .addField(":two: you                        10% (1 vote)", "** **", false)
                    .setFooter("Change My Mind :p | "+p.status)
                     message.channel.send(POLL_EMBED)                })
            }

        })

    }
}