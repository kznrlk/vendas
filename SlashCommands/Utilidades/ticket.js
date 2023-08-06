const Discord = require("discord.js");

module.exports = {
  name: "ticket", 
  description: 'Ticket para suporte.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
],
  
    run: async(client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({
            content: `**${interaction.user}, Você precisa da permissão \`Administrador\` para usar este comando!**`,
            ephemeral: true,
      }); else {

        let chat = interaction.options.getChannel("chat")

        if (!chat.send)
        return interaction.reply({
            content: `**${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
            ephemeral: true,
        })

        let rowTicket = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.SelectMenuBuilder()
                .setCustomId('select2')
                .setPlaceholder('Selecionar Opção.')
                .addOptions(
                    {
                        label: ' - Ticket',
                        description: 'Clique aqui para abrir seu Ticket.',
                        emoji: '<:cupom:1065754248521977866>',
                        value: 'ticket',
                    },
                
                ),
                
           )

          
        let embedTicket = new Discord.EmbedBuilder()
         .setTitle(`<:cupom:1065754248521977866> - Ticket`)
         .setDescription(`*Selecione uma opção de suporte abaixo!*`)
         .setColor("#ff0000")
         .setAuthor({ name: `${interaction.user.username}`, iconURL: `${(interaction.user.displayAvatarURL({ dinamyc: true, format: "png" }))}`})
         .setFooter({ text: `Copyright © | Kiev`, iconURL: `${client.user.displayAvatarURL()}`})
 
         interaction.reply({ content: `<:oks:1066259580625104896> - Feito! Ticket enviado no canal ${chat}!`, ephemeral: true})
         chat.send({ components: [rowTicket], embeds: [embedTicket] })
              
    

      } 

  }
}