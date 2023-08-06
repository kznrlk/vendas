const dc = require("discord.js");
const ax = require("axios");

module.exports = {
    name: 'cantada',
    description: 'Passe uma cantada para um usuário.',
    type: 1,
    options: [{name: 'user', type: 6, description: 'Coloque um usuário.', required: true }],

    run: async (client, interaction, app) => {

    const tg = interaction.options.getUser('user');

    if(tg.bot) {

        const userBot = new dc.EmbedBuilder()
        .setDescription(`**Você não pode passar uma cantada em um bot.**`)
        .setColor("#ff0000")

        return interaction.reply({ embeds: [userBot], ephemeral: true });
    };

    await interaction.deferReply();

    const lah = await ax({ 
        url: `https://balahlindo.alguemai2.repl.co/romantic`,
        headers: {'accept': 'application/json'}
    }).then((d) => d.data);

    let over = lah.cantadas;
    const ctd = over[Math.floor (Math.random() * over.length)];

    const cantadaEmbed = new dc.EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`${tg} **${ctd}**`)
    .setColor("#FF1493")

    interaction.editReply({ embeds: [cantadaEmbed] })

}};