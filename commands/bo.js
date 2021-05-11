const Discord = require('discord.js')

const quotes = [
    'kes, i dont think hes right for you, i mean look at the size of his bastard head',
    'i also live with my mother - she is dead! - but she still likes tuna on her body though',
    'Craaaaiiigg david',
    'danieeeel bedingiieeeld',
    'heehee, cha\'mon motherf*cker',
    'im a bad ass invisible motherf*cker',
    'me minge is kicking off a right pong',
    'you\'re a minge teasing bastard pats!',
    'Ooooh, crab paste!',
    'lady in the night, cover me with Shite - let me get into your sweet vangita',

]

module.exports.run = async (bot, message, args) => {
  return message.reply(quotes[Math.floor(Math.random() * quotes.length)]);
}

module.exports.help = {
  name: "bo"
}
