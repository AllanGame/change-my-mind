const Discord = require("discord.js");
module.exports = {
    name: "hello",
    usage: 'hello {option}',
    onlyowner: false,
    alias: ["test"],
    cooldown: 3,
    perms: [],
    run: (client, message, args, storage) => {

        message.channel.send('Hello World!, All working.')

    }
}