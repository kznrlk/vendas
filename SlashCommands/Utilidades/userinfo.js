const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Veja informações de algum usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "ID ou Menção do usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("user")

        let ryan = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .addFields(
                {
                    name: `
                    <a:world:1065754283099836417>  Nome`,
                    value: `\`\`\`${user.tag}\`\`\``,
                    inline: true,
                },
                {
                    name: `<:termos:1065754312103428196> Identidade`,
                    value: `\`\`\`${user.id}\`\`\``,
                    inline: true,
                },
                {
                    name: `<a:aviso:1066263831740960829> Menção`,
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: `<a:loading:1065754253450289272> Conta criada`,
                    value: `<t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)`,
                    inline: false,
                },
        )
        interaction.reply({ embeds: [ryan] })
    }
}