const dc = require("discord.js");

module.exports = {
    name: 'desbanir',
    description: 'Remova um banimento do servidor.',
    type: 1,
    default_member_permissions: dc.PermissionsBitField.Flags.BanMembers, //Caso a pessoa não tenha a perm, o comando não irá aparecer;
    options: [{ name: `member_id`, description: `Coloque o id do usário que queira desbanir do servidor.`, type: 3, required: true },
    { name: `reason`, description: `Coloque um motivo para o unban.`, type: 3, required: false }],

 run: async(client, interaction) => {

    const guild = interaction.guild;

    const memberId = interaction.options.getString("member_id");
    const reason = interaction.options.getString("reason") || "Sem Motivo!";

    const e = new dc.EmbedBuilder()
    .setDescription(`Eu não tenho a permissão **Banir Membros** no servidor!`)
    .setColor('Red')

    const e1 = new dc.EmbedBuilder()
    .setDescription(`Você não tem a permissão **Banir Membros** no servidor!`)
    .setColor('Red')

    if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [e1], ephemeral: true })
    if(!guild.members.me.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [e], ephemeral: true })

    const bans = await guild.bans.fetch();
    const verificacao = bans.map(ds => ds.user.id === memberId)[0];
    const user = await client.users.fetch(memberId).catch(e => { });

    if(verificacao && user) {

        await interaction.deferReply();

        const unbanned = new dc.EmbedBuilder()
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
        .setColor("#ff0000")
        .setDescription(`Houve um desbanimento em ${guild.name}`)
        .addFields({ name: `<a:world:1065754283099836417> Adm`, value: `${interaction.user.tag}\n(${interaction.user.id})`, inline: true },
        { name: `<a:loading:1065754253450289272> User`, value: `${user.tag}\n(${user.id})`, inline: true },
        { name: `<:termos:1065754312103428196> Motivo`, value: `*${reason}*`, inline: true },)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTimestamp()

        interaction.editReply({ embeds: [unbanned] })

        return guild.bans.remove(memberId, reason).catch(not => { 
            
            console.log(not);

            const errorEmbed = new dc.EmbedBuilder()
            .setDescription(`**<a:aviso:1066263831740960829> Não foi possível desbanir o usuário (${memberId})!**`)
            .setColor("#d91629")

            interaction.editReply({ embeds: [errorEmbed] })
        })

    } else {

        await interaction.deferReply({ ephemeral: true });

        const notFoundMember = new dc.EmbedBuilder()
        .setDescription(`**<a:aviso:1066263831740960829> Membro não encontrado na lista de banimentos!**`)
        .setColor("#d9162")

        return interaction.editReply({ embeds: [notFoundMember] })
    }

}}; 