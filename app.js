const Bot = require("node-telegram-bot-api");
const request = require('request');
const Token = "647204953:AAHduVFcP_IKVXGNkJTNqkODtHPVjliC-NM";
// const debug = require("./helpers");
const bot = new Bot(Token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

bot.on("message", (msg) => {
  try {
    const { id } = msg.chat;
    console.log(msg);
    const message = msg.text.toLowerCase();
    if (message === "hello") {
      if (msg.chat.last_name === "Malyukin") {
        bot.sendMessage(
          id,
`Hello great of the greatest system administrator,${
msg.from.first_name
          }`
        );
      } else {
        bot.sendMessage(id, `Hello,${msg.from.first_name}`);
      }
    } else if (message === "bye") {
      if (msg.chat.last_name === "Malyukin") {
        bot.sendMessage(id, `Go to Hell,${msg.from.first_name}`);
      } else {
        bot.sendMessage(
          id,
          `Goodbay,${msg.from.first_name}.
          Have a nice day !`
        );
      }
    } else if(message === 'money'){
        request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',(err,res,body)=>{
            if(!err && res.statusCode===200){
                const data= JSON.parse(body);
                data.forEach((element,index) => {
                    bot.sendMessage(id,(
`Exchange Rates:
Currency: ${element.ccy} | National: ${element.base_ccy}:
Buy: ${element.buy} / Sale: ${element.sale}`))
                });
            }
        })
    
    }else {
      if (msg.chat.last_name === "Malyukin") {
        bot.sendMessage(id, `Go to Hell,${msg.from.first_name}`);
      } else {
        bot.sendMessage(id, `Sorry, but now I dont understood you (`);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
