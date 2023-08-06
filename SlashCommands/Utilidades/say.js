const Discord = require("discord.js");
const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "say", // Coloque o nome do comando
    description: "Escreva uma mensagem com o bot", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "mensagem",
            description: "escreva uma mensagem",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "canal",
            description: "selecione um canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true })
        } else {

       let msg = interaction.options.getString("mensagem");
       let canal = interaction.options.getChannel("canal");

        const embed = new Discord.EmbedBuilder()
        .setTitle('Nova mensagem!')
        .setColor("#ff0000")
        .setDescription(`${msg}`)
        .setFooter({ text: `Kiev#0002`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
          
        interaction.reply({ embeds: [embed], content: `Mensagem enviada com sucesso em ${canal}!`, ephemeral: true })

        canal.send({ embeds: [embed], content: `@everyone` })

        

    }
}}