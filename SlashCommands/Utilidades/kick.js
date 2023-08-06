const dc = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Comando para expulsar um usário do servidor.',
    type: 1,
    options: [{name: 'membro', type: 6, description: 'Coloque um usuário.', required: true},
    {name: 'motivo', type: 3, description: 'Coloque um motivo.', required: false, max_lenght: 200 }], //Máximo de 200 Caracteres;
    default_member_permissions: `0x0000000000000002`, //Caso a pessoa não tenha a perm, o comando não irá aparecer;

    run: async (client, interaction) => {

        const guild = interaction.guild;

        if(!guild.members.me.permissions.has(dc.PermissionsBitField.Flags.KickMembers)) { //Permissão do bot.

            const noPermsBot = new dc.EmbedBuilder()
            .setDescription(`Eu não tenho a permissão **Expulsar Membros** no servidor!`)
            .setColor("Red")
           
            return interaction.reply({ embeds: [noPermsBot], ephemeral: true }) 
    
        }
    
        if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.KickMembers)) { //Permissão do membro.
           
            const noPerms = new dc.EmbedBuilder()
            .setDescription(`Você não tem a permissão **Expulsar Membros** no servidor!`)
            .setColor("Red")
           
            return interaction.reply({ embeds: [noPerms], ephemeral: true }) 
        }

        const target = interaction.options.getUser("membro");
        const member = await guild.members.fetch(target.id);

        const reason = interaction.options.getString("motivo") || "Sem Motivo!";

        if(!member) {

            const invalidMember = new dc.EmbedBuilder()
            .setDescription(`❌ **Membro inválido!**`)
            .setColor("Red")

            return interaction.reply({ embeds: [invalidMember], ephemeral: true })

        }

        if(client.user.id == target.id) {

            const kickMe = new dc.EmbedBuilder()
            .setDescription(`❌ **Você não pode me expulsar!**`)
            .setColor("Red")

            return interaction.reply({ embeds: [kickMe], ephemeral: true })

        }

        if(interaction.user.id == target.id) {

            const kickYou = new dc.EmbedBuilder()
            .setDescription(`❌ **Você não pode se expulsar!**`)
            .setColor("Red")

            return interaction.reply({ embeds: [kickYou], ephemeral: true })
        }

        if(guild.ownerId == target.id) {

            const kickOwnerGuild = new dc.EmbedBuilder()
            .setDescription(`❌ **Você não pode expulsar o dono deste servidor!**`)
            .setColor("Red")

            return interaction.reply({ embeds: [kickOwnerGuild], ephemeral: true })

        }

        await interaction.deferReply();

        const kickSucess = new dc.EmbedBuilder()
        .setTitle(`<a:aviso:1066263831740960829> Kick`)
        .setDescription(`Houve uma expulsão no servidor.`)
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addFields({ name: `<a:world:1065754283099836417> Autor`, value: `${interaction.user.username} - ${interaction.user.id}`, inline: false },
        { name: `<a:loading:1065754253450289272> Membro`, value: `${target.username} - ${target.id}`, inline: false },
        { name: `<:termos:1065754312103428196> Motivo`, value: `${reason}`, inline: false })
        .setColor("#ff0000")
        .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true })})
        .setTimestamp(new Date())

        interaction.editReply({ embeds: [kickSucess] }).then(()=>{ setTimeout(() => { interaction.deleteReply() }, 99000) }) //Apagará em 99 segundos: 1:65 min; 

        await member.kick(reason).catch((er) => {

            console.log(er);

            const Error = new dc.EmbedBuilder()
            .setDescription(`**Não foi possível expulsar \`${target.tag}\` do servidor!**`)
            .setColor("Red")

            return interaction.editReply({ embeds: [Error] })

        })

}};