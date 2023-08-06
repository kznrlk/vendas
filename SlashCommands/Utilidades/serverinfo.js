const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Veja as informações do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Cole o ID do servidor",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.options.getString("id")
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor: ${interaction.guild}`)
            .addFields(
                {
                    name: `
                    <a:loading:1065754253450289272>  Identidade`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `
                    <a:setazul:1065754277101973594>Canais em geral`,
                    value: `# Canais: ${canais}\n# Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `<a:world:1065754283099836417> Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `<:termos:1065754312103428196> Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `<:foguete:1060745960122228806> ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `<a:coroa:1052320714931318784> Dono`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
        )
        
        
        
        
        interaction.reply({ embeds: [ryan] })
    }
}