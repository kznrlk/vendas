const dc = require('discord.js');

module.exports = {
    name: 'banir',
    description: 'Comando para banir um usário do servidor.',
    type: 1,
    options: [{name: 'user', type: 6, description: 'Coloque um usuário.', required: true},
    {name: 'motivo', type: 3, description:  'Coloque um motivo.', required: false, max_lenght: 150}],

    run: async (client, interaction, app) => {

    const membro = interaction.options.getMember('user');
    const user = membro.user;
    const motivo = interaction.options.getString('motivo') || 'Não Informado.';

    if(!interaction.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do bot.

        const e = new dc.EmbedBuilder()
        .setDescription(`Eu não possuo permissão de banir membros.`)
        .setColor('0')
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do membro.
       
        const e = new dc.EmbedBuilder()
        .setDescription(`Você não possui permissão de banir membros.`)
        .setColor('0')
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 
    }

    if (interaction.user.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`Não sei se te falei, mas você não pode se banir.`)
        .setColor('0')
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    if (client.user.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`Não sei se te falei, mas você não pode me banir.`)
        .setColor('0')
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    await interaction.deferReply();

    const e = new dc.EmbedBuilder()
    .setDescription(`Você está prestes a banir ${user}, gostaria de confirmar sua ação?`)
    .addFields({ name: `Motivo`, value: `${motivo}`, inline: true })
    .setColor('0')
    .setFooter({ text: `Você tem 1 min para esta ação!` })

    const b = new dc.ButtonBuilder()
    .setLabel('Sim')
    .setStyle(3)
    .setCustomId('ss')
    const b1 = new dc.ButtonBuilder()
    .setLabel('Não')
    .setStyle(4)
    .setCustomId('nn')

    const ac = new dc.ActionRowBuilder()
    .addComponents(b, b1)

    const ai = await interaction.editReply({ embeds: [e], components: [ac] })

    const ccl = ai.createMessageComponentCollector({ time: 60000 }); // 1 Min pra responder.
    ccl.on('collect', async(ban) => {

        if(ban.user.id !== interaction.user.id) return;

        if(ban.customId === 'ss') {

            const e1 = new dc.EmbedBuilder()
    .setTitle(`<a:aviso:1066263831740960829> Banimento`)
    .setDescription(`Um novo usuário foi banido.`)
    .addFields({ name: `Autor`, value: `${interaction.member}`, inline: true },
    { name: `Membro`, value: `${user}`, inline: true },
    { name: `Motivo`, value: `**${motivo}**`, inline: false },)

    ban.update({ embeds: [e1], components: [] })

    interaction.guild.members.ban(membro, { reason: motivo }).catch(e => {
        
        const e2 = new dc.EmbedBuilder()
        .setDescription(`Não possível realizar o banimento de ${user}.`)
        .setColor('0')

        ban.update({ embeds: [e2] }).then(()=>{ setTimeout(() => { interaction.deleteReply() }, 6000) })
        console.log(e)
    })

        }

        if(ban.customId === 'nn') {

            const e = new dc.EmbedBuilder()
            .setDescription(`<:termos:1065754312103428196> *O banimento de ${user} foi cancelado por ${interaction.member}!*`)
            .setColor('0')

            ban.update({ embeds: [e], components: [] })

        }
        
    });

}};