const Discord = require("discord.js")
const dc = require('discord.js');
const moment = require("moment");
const { set } = require("mongoose");

module.exports = {
  name: "bater-ponto",
  description: "Ativar painel de bater ponto.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'canal',
        description: 'Selecione um canal de texto.',
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
    return interaction.reply({
        content: `Opa ${interaction.user}, você não possui permissão para utilizar este comando!`,
        ephemeral: true,
    })

    interaction.reply({ content: `Painel bate-ponto enviado com sucesso!`, ephemeral: true })

        const role = '1064680285926600754' //Cargo que tem permissão para bater ponto
        const canalEnv = interaction.options.getChannel('canal')

    const embedT = new Discord.EmbedBuilder()
    .setTitle(`Bate Ponto System | Kiev`)
    .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
    .setDescription(` <a:setazul:1065754277101973594> Para **INICIAR** seu **PONTO** clique no botão: <:sim:1066259578871873568>\n\n <a:setazul:1065754277101973594> Para **FINALIZAR** seu **PONTO** clique no botão: <:nao:1066259576527257680>`)
    .setColor('0')
    .setFooter({
        iconURL: interaction.guild.iconURL({ dynamic: true }),
        text: (`Copyright © | Kiev.`)
            })
    .setTimestamp()

    const acct = new dc.ActionRowBuilder()
                  .addComponents(
                  new dc.ButtonBuilder()
                  .setLabel("Abrir Ponto")
                  .setStyle(2)
                  .setCustomId("btE")
                  .setEmoji("<:sim:1066259578871873568>"),
                  new dc.ButtonBuilder()
                  .setLabel("Fechar Ponto")
                  .setStyle(2)
                  .setCustomId("btS")
                  .setEmoji(`<:nao:1066259576527257680>`),
                  )

    canalEnv.send({ embeds: [embedT], components: [acct] })
    
    
  }}
