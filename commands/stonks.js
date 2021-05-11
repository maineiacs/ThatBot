const Discord = require('discord.js')
let price = require('crypto-price')

module.exports.run = async (bot, message, args) => {

  let base = 'GBP';
  let target = args[0];

  if (target == undefined) {
    return message.reply(`
Provide a crypto currency. e.g.

\`*crypto BTC\`

\`*crypto BTC USD\`
    `);
  }

  if (args[1] !== undefined) {
    base = args[1];
  }

  price.getCryptoPrice(base, target).then(object => {

    if (object === undefined) {
      return message.reply("Couldn't find a currency with that symbol.")
    }

    let changeEmoji = ":small_red_triangle_down:"

    if (object.change > 0) {
      changeEmoji = ":up:"
    }

    if (object.change > 30) {
      changeEmoji = ":rocket:"
    }

    return message.reply(`
${object.base}  :arrow_right:  ${object.target}

:moneybag: Price:       ${object.price}
:speaker: Volume:  ${object.volume}
${changeEmoji} Change:  ${object.change}
    `)
  }).catch(e => {
    return message.reply(e.message);
  })

}

//name this whatever the command name is.
module.exports.help = {
  name: "stonks"
}
