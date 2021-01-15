const Discord = require('discord.js');
const client = new Discord.Client();
const data = require("./utils/data.json");
let fs = require("fs");

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.on("messageReactionAdd", async (reaction, user) => {

  
});

fs.readdir(__dirname + "/commands", (err, files) => {
    if(err) {
        console.error(err);
        return;
    }

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if(jsfiles.length < 0) {
        console.warn("[WARN] No commands to load.");
        return;
    }

    console.info(`[INFO] Loading ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let fileName = f.substring(0, f.length - 3);
        let fileContents = require("./commands/" + f);
        console.info(`Command ${f} loaded`);
        client.commands.set(fileName, fileContents);
        delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
});

for(const file of fs.readdirSync("./events")) {
    if(file.endsWith("js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require("./events/" + file);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    }
}


client.login(data.token.discord).then(() => {
    console.info(`[INFO] Logged in ${client.user.tag}.`);
}).catch((err) => {
    console.error(`[ERROR] Can't login. \n${err}`);
});
    // client invite https://discord.com/api/oauth2/authorize?client_id=789952288701022279&permissions=608169665&scope=bot