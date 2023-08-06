const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "info",
    run: async(client, message, args) => {
      const embederro2 = new Discord.MessageEmbed()
      if (message.author.id !== config.get(`owner`)) return message.reply(`⚡ | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`⚡ | Você não selecionou nenhum ID de compra!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db3.get(`${args[0]}.id`)}`) return message.reply(`⚡ | Esse ID de compra não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const id = args[0]
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Compra Aprovada`)
        .addField(`⚡ | ID Da compra:`, `${db3.get(`${args[0]}.id`)}`)
        .addField(`<:as_ping:1046918282680209559> | Status:`, `${db3.get(`${args[0]}.status`)}`)
        .addField(`⚡ | Comprador:`, `<@${db3.get(`${args[0]}.userid`)}>`)
        .addField(`<:IDD:1046918420093993121> | Id Comprador:`, `${db3.get(`${args[0]}.userid`)}`)
        .addField(`📅 | Data da compra:`, `${db3.get(`${args[0]}.dataid`)}`)
        .addField(`⚡ | Produto:`, `${db3.get(`${args[0]}.nomeid`)}`)
        .addField(`⚡ | Quantidade:`, `${db3.get(`${args[0]}.qtdid`)}`)
        .addField(`⚡ | Preço:`, `${db3.get(`${args[0]}.precoid`)}`)
        .addField(`⚡ | Produto entregue:`, `\`\`\`${db3.get(`${args[0]}.entrid`)}\`\`\``)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed], content: "⚡ | Encontrado!"})
    }
}