const Discord = require("discord.js")

module.exports = {
    name: "renomearcanal",
    description: "Renomear o canal em que usar o comando!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome",
            description: "Qual sera o novo nome do canal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        
        let renamechannel = interaction.options.getString("nome");

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("Canal Renomeado!")
                .setColor('0')
                .setDescription(`
                <:oks:1066259580625104896>
                  Esse canal foi renomeado para \`\`\`${renamechannel}\`\`\``)

              const nomedocanal = interaction.options.getString("nome");

                interaction.reply({ embeds: [embed]}).then(() => {
                        interaction.channel.setName(`${nomedocanal}`);
                })
                }
            }
    }