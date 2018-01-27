const bot = new(require("discord.js")).Client({fetchAllMembers: true});
const config = {
    "myDiscriminator": ["0000", "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "1337"
                        ],
    "username": "S.A.O",
    "password": "123123123",
    "token": "Mzk3ODA4NjQ0O4NzMxMDA4.DS1YBQ.NLnYDwC8kuhM0wxsXi3mcMpQ3rU"
};
bot.login(config.token);
function changeDiscriminator() {
  if (config.myDiscriminator.includes(bot.user.discriminator.toString()))
    return console.log("Discriminator Loaded: " + bot.user.discriminator);
  try {
    const us = bot.users.find(u => u.discriminator === bot.user.discriminator && u.username !== bot.user.username && !u.bot).username;
    console.log(Date.now(), "Username Loaded: " + us);
    bot.user.setUsername(us, config.password).then((u) => {
      console.log(Date.now(), "Username: " + u.username, "Discriminator: " + u.discriminator);
      setTimeout(changeDiscriminator, 8640 * 10000);
    }).catch((err) => {
      console.log(Date.now(), "An error occurred. Trying again in sixty (60) seconds.");
      setTimeout(changeDiscriminator, 60 * 1e3);
    });
  } catch(e) {
    console.log(Date.now(), `[${e}] Trying again in 30 seconds.`);
    setTimeout(changeDiscriminator, 30 * 1e3);
  }
}

bot.once("ready", () => {
  console.log(Date.now(), "Started with " + bot.users.size + " users.");
  changeDiscriminator();
  if(config.myDiscriminator.includes(bot.user.discriminator)) {
      console.log(`I successfully got the discrim ${bot.user.discriminator}!`) 
      process.exit();
}
});
