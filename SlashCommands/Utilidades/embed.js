const { TextInputStyle } = require(`discord.js`)
const { InteractionType } = require(`discord.js`)
const Discord = require(`discord.js`)

module.exports = {
    name: `embed`,
    description: `Embed Moderna`,
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

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages))
        return interaction.reply({
            content: `**${interaction.user}, Você precisa da permissão \`Gerenciar Mensagens\` para usar este comando!**`,
            ephemeral: true,
        })

        const modal = new Discord.ModalBuilder()
        .setCustomId(`Embed`)
        .setTitle(`Criar Embed 🔪`)
        const TítuloEmbed = new Discord.TextInputBuilder()
        .setCustomId(`TítuloEmbed`)
        .setLabel(`Título da Embed`)
        .setPlaceholder(`Insira o título da Embed.`)
        .setStyle(TextInputStyle.Short)
        const DescriçãoEmbed = new Discord.TextInputBuilder()
        .setCustomId(`DescriçãoEmbed`)
        .setLabel(`Descrição da Embed`)
        .setPlaceholder(`Insira a descrição da Embed`)
        .setStyle(TextInputStyle.Paragraph)
        const CorEmbed = new Discord.TextInputBuilder()
        .setCustomId(`CorEmbed`)
        .setLabel(`Cor da sua Embed`)
        .setPlaceholder(`Insira a cor da sua embed`)
        .setStyle(TextInputStyle.Short)

        





        const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);
        const SegundaActionRow = new Discord.ActionRowBuilder().addComponents(DescriçãoEmbed);
        const TerceiraActionRow = new Discord.ActionRowBuilder().addComponents(CorEmbed);


        let chat = interaction.options.getChannel("chat")

        modal.addComponents(PrimeiraActionRow, SegundaActionRow, TerceiraActionRow,)

        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === `Embed`) {

        const DescriçãoEmbed = interaction.fields.getTextInputValue(`DescriçãoEmbed`);
        const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);
        const CorEmbed = interaction.fields.getTextInputValue(`CorEmbed`);

        let embedModal1 = new Discord.EmbedBuilder()
        .setColor(`${CorEmbed}`)
        .setTitle(`${TítuloEmbed}`)
        .setDescription(`${DescriçãoEmbed}`)
        
        .setFooter({ text: `Kiev#0002` })
        
        
        interaction.reply({
            content: `**✅ Embed Submetida com sucesso.**`, ephemeral: true
        })
        
       
        chat.send({
           embeds: [embedModal1]
        }).catch( (e) => {
            interaction.reply({ content: `Algo deu errado, por favor tente novamente...`,ephemeral: true })
        })

    }

});


    }
}