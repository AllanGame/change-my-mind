const Discord = require("discord.js");
module.exports = {
    name: "poll",
    usage: 'poll {question} {options}',
    onlyowner: false,
    alias: [""],
    cooldown: 3,
    perms: [],
    run: (client, message, args, storage) => {

        if(!args[0]) return message.channel.send(`Usage: \`${client.commands.get('poll').usage}\``)
       let POLL_EMBED = new Discord.MessageEmbed()

            .setTitle("Who is better?")
            .setDescription("**Options**")
            .addField(":one: Me                              90% (4 votes)", "** **",false)
            .addField(":two: you                        10% (1 vote)", "** **", false)
            .setFooter("Change My Mind :p")
             message.channel.send(POLL_EMBED)
    }
}