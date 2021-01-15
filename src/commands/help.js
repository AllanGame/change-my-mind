const Discord = require("discord.js");
module.exports = {
    name: "help",
    usage: "help {command}",
    onlyowner: false,
    alias: ["commands"],
    cooldown: 3,
    perms: [],
    run: (client, message, args, storage) => {

        message.channel.send(client.commands)

    }
}