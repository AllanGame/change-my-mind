module.exports = (client, message) => {
  const Discord = require("discord.js");
  let misc = require("../utils/misc.json");

  let prefix = "c!";

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.channel.send(`Prefix: c!`);
  }

  let errorEmbed = new Discord.MessageEmbed()
    .setTitle("error")
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription("error")
    .setColor("RED")
    .setFooter("error")
    .setTimestamp();

  if (!message.content.startsWith(prefix)) {
    return;
  }

  if (message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  var cmd =
    client.commands.get(command) ||
    client.commands.find((c) => c.alias && c.alias.includes(command));

  if (!cmd) {
    return;
  }

  if (!message.member.permissions.has(cmd.perms)) {
    message.channel.send("no permss");
    return;
  }

  var storage = {
    errorEmbed: errorEmbed,
    Discord: Discord,
  };

  if (cmd.onlyowner) {
    if (!misc.owners.id.includes(message.author.id)) {
      message.channel.send(lang.command.onlydev);
      return;
    }
  }

  const cmdCooldown = Math.floor(cmd.cooldown * 1000);
  const endCooldown = Math.floor(Date.now() + cmdCooldown);

  if (!client.cooldowns.has(`${message.author.id}.${cmd.name}`)) {
    client.cooldowns.set(`${message.author.id}.${cmd.name}`, 0);
  }

  const userCooldown = client.cooldowns.get(`${message.author.id}.${cmd.name}`);

  if (Date.now() < userCooldown) {
    let restCooldown = userCooldown - Date.now();
    let seconds = Math.floor(restCooldown / 1000);
    let cooldownMessage = "{cooldown}";
    message.channel.send(cooldownMessage).then((msg) => {
      msg.delete({ timeout: restCooldown });
    });
    return;
  } else {
    try {
      cmd.run(client, message, args, storage);
      client.cooldowns.set(`${message.author.id}.${cmd.name}`, endCooldown);
    } catch (err) {
      message.channel.send(errorEmbed);
      console.error(err);
      client.channels
        .resolve("746467458491351101")
        .send(`ERROR! check the console.\n` + "```js\n" + err + "```");
    }
  }
};