const Discord = require("discord.js");
const fs = require("fs");
const download = require("download");
const path = require("path");
const express = require("express");
require("dotenv").config();

const commandHandler = require("./commandHandler");
const ErrorEmbed = require("./utils/ErrorEmbed");

const client = new Discord.Client();
const app = express();

app.get("/", (_, res) => res.send("BOT RUNNING"));

app.listen(3000, () => console.log("\x1b[32m", `Server Started`));

client.on("ready", () => {
  console.log("\x1b[32m", `Bot logged in as ${client.user.tag}`);
  client.user.setActivity(`Use ${process.env.PREFIX}help`);
});

client.on("message", (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

// Delete Handler
client.on("messageDelete", async (message) => {

  if (message.content.length > 1024) {
    message.channel.send(
      new ErrorEmbed(
        "Message Too Long",
        "I cant cache anything longer than 1024 characters."
      )
    );
    return;
  }

  fs.readdir("./temp/attachments", (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join("./temp/attachments", file), (err) => {
        if (err) throw err;
      });
    }
  });

  if (message.attachments.first()) {
    message.attachments.forEach(async (item) => {
      await download(item.url, "./temp/attachments");
    });
  }

  fs.writeFile("./temp/delete.json", JSON.stringify(message), "utf-8", () => {
    console.log("\x1b[31m", "DELETE Detected and Cached");
  });

  // I like big boobs
  const cache = JSON.parse(fs.readFileSync("./temp/cache.json"), "utf8");
  if (cache.length === 5) cache.shift();
  cache.push(message);
  fs.writeFileSync("./temp/cache.json", JSON.stringify(cache));

});

// Edit Handler
client.on("messageUpdate", (oldMessage, newMessage) => {

  if (oldMessage.content.length > 1024 || newMessage.content.length > 1024) {
    oldMessage.channel.send(
      new ErrorEmbed(
        "Message Too Long",
        "I cant cache anything longer than 1024 characters."
      )
    );
    return;
  }

  const linkRegexp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (linkRegexp.test(oldMessage.content)) return;

  fs.writeFile(
    "./temp/edit.json",
    JSON.stringify({ oldMessage: oldMessage, newMessage: newMessage }),
    "utf-8",
    () => {
      console.log("\x1b[33m", "EDIT Detected and Cached");
    }
  );
  
});

client.login(process.env.TOKEN);
