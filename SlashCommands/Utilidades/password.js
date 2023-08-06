const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'password',
    description: 'Insira uma senha para recer uma tag.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "password",
            description: "Insira uma senha para recer uma tag",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args) => {

        const password = interaction.options.getString("password")
        const pass1 = "COLOQUE UMA SENHA"; // SENHA 


        if (password !== pass1) {
            interaction.reply({
                content: `_${interaction.user}, Ops a senha \`${password}\` está incorreta!_`,
                ephemeral: true
            })
            return;

        } else {


            const embed = new Discord.EmbedBuilder()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                .setTimestamp()
                .setColor('0')
                .setTitle(`**<:setabranca:1065754274568613888> __Receba uma TAG__**`)
                .setDescription('**<a:world:1065754283099836417> Selecione uma tag para desbloquear a categoria Dark Web.**')

            const dropdown = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.SelectMenuBuilder()
                        .setCustomId('select2')
                        .setPlaceholder('Clique Aqui')
                        .addOptions(
                            {
                                label: 'Categoria Dark Web',
                                description: 'Clique para receber a tag e liberar a categoria.',
                                emoji: '<a:world:1065754283099836417>',
                                value: 'voice_channels',
                            },
                            {
                                label: 'Tag BioHazard',
                                description: 'Clique para receber a tag BioHazard.',
                                emoji: '<:teia:1052320496731041884>',
                                value: 'chat_channels',
                            },
                        ),
                );

            let msg = await interaction.reply({ embeds: [embed], components: [dropdown], fetchReply: true })


            client.on("interactionCreate", async (interaction) => {
                if (interaction.isSelectMenu()) {
                    let choice = interaction.values[0]

                    if (choice == 'voice_channels') {

                        setTimeout(function () {
                            msg.delete().catch(err => { })
                        }, 2000)
                    }

                    if (choice == 'chat_channels') {
                        setTimeout(function () {
                            msg.delete().catch(err => { })
                        }, 2000)
                    }
                }
            })
        }
    }
}