const Discord = require('discord.js')

module.exports = {
    name: 'config',
    description: 'Gerenciar aplicação',
    typy: Discord.ApplicationCommandType.ChatInput,
    options: [
          
    ],

    run: async (client, interaction) => {

        if (interaction.user.id != "970187059216121867") { //Seu id
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`${interaction.user.tag} Você não possui permissão para utilizar esse comando.`)
                        .setColor("#ff0000")
                        .setTimestamp()
                ],
                ephemeral: true,
            })
        } else {

            interaction.reply({
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("alterar_username")
                                .setLabel("Alterar Username")
                                .setStyle(Discord.ButtonStyle.Success),
                            new Discord.ButtonBuilder()
                                .setCustomId("alterar_avatar")
                                .setLabel("Alterar Avatar")
                                .setStyle(Discord.ButtonStyle.Danger),
                        )
                ],
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`Para me configurar clique nos botões abaixo de acordo com oque você dessejar.`)
                        .setColor("#ff0000")
                        .setImage("https://i.imgur.com/b0lLWn7.png")
                        .setTimestamp()
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dinamyc: true }) })
                ],
                ephemeral: true,
            })
        }
    }
}