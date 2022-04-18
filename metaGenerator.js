const fs = require("fs");

const metaGenerator = (opts) => {
  const commands = fs.readdirSync("./commands").map((item) => {
    const splitted = item.split(".");
    splitted.pop();
    return splitted[0];
  });

  if (opts !== undefined && opts.type === "alt") {
    const altIndex = {};
    commands.forEach((item) => {
      const data = require(`./commands/${item}.js`);
      altIndex[data.alt] = data;
    });
    return altIndex;
  }

  const commandIndex = {};
  commands.forEach((item) => {
    commandIndex[item] = require(`./commands/${item}.js`);
  });
  return commandIndex;
};


module.exports = metaGenerator;