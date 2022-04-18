require("dotenv").config();
const ErrorEmbed = require("./utils/ErrorEmbed");
const throwGeneric = require("./utils/throwGeneric");
const metaGenerator = require("./metaGenerator");

const prefix = process.env.PREFIX;

const commandHandler = (message) => {
  try {
    if (!message.content.startsWith(prefix)) return;
    if (!message.content[1]) return;

    const baseCommand = message.content.toLowerCase().split(" ")[0].split("");
    baseCommand.shift();
    const command = baseCommand.join("");

    const commandIndex = metaGenerator();
    if (!commandIndex[command]) {
      const altIndex = metaGenerator({ type: "alt" });
      if (!altIndex[command]) {
        message.channel.send(
          new ErrorEmbed(
            "Command Not Found",
            "I don't think I have that command chief."
          )
        );
        return;
      } else {
        altIndex[command].handler(message);
      }
    } else {
      commandIndex[command].handler(message);
    }
  } catch (err) {
    console.log(err);
    throwGeneric(message);
    return;
  }
};

module.exports = commandHandler;
