const Discord = require("discord.js")


module.exports = {

  name: "ping", 

  description: "Veja o ping do bot em tempo real.", 

  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction) => {


    let ping = client.ws.ping;


    let embed_1 = new Discord.EmbedBuilder()

    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)

    .setColor("#000000");


    let embed_2 = new Discord.EmbedBuilder()

    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    .setTitle("**__Ping Calculado__**")
    
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)

    .setColor("#ff0000")
 
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))  
    
    .setFooter({ text: `Comando requisitado por ${interaction.user.username}` })

    .setTimestamp()
    
    interaction.reply({ embeds: [embed_1] }).then( () => {

        setTimeout( () => {

            interaction.editReply({ embeds: [embed_2] })

        }, 3000) //Segundos para a edição 

    })

  }

}