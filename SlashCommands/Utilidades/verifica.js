const Discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

        name: "verificar",
        description: "Ativar a verificação",
        type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) { //Verifica a permissão do membro
            interaction.reply({ content: `Você não possui permissão para utilizar esse comando.`, ephemeral: true })
        }

        else {
            let captcha = new Discord.EmbedBuilder()
            .setAuthor({ name: `✅ | Verificação`})
            .setDescription("Clique no botão abaixo para se verificar.")
            .setColor("#00FF00")

            const botao = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('botao1')
                        .setLabel(`Verifique-se ✅`)
                        .setStyle(ButtonStyle.Success)
                )

            await interaction.channel.send({ embeds: [ captcha ], components: [ botao ] })
            await interaction.reply({ content: 'Você colocou uma verificação por conta neste canal com sucesso.', ephemeral : true })
    }
     }
}