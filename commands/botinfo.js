const Discord = require("discord.js")

module.exports = {
    name: "botinfo", // Coloque o nome do comando do arquivo
    aliases: ["infobot"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let servidor = client.guilds.cache.size;
        let usuarios = client.users.cache.size;
        let canais = client.channels.cache.size;
        let ping = client.ws.ping;
        let dono_id = "841029765015142410"; // Seu ID
        let dono = client.users.cache.get(dono_id);
        let prefixo = ".";
        let versao = "1.6";

        let embed = new Discord.MessageEmbed()
            .setColor("#9400D3")
            .setTimestamp(new Date)
            .setDescription(`⚡  | Olá, tudo bem? me chamo, **[${client.user.username}](https://discord.gg/d7R3FVT6sv)**  e fui desenvolvido para facilitar a vida dos meus usuários.


\ **・⛄| Desenvolvedores: ** [6IX.exe#4829](https://discord.gg/d7R3FVT6sv)
\ **・🌈| Linguagem: ** [node.js](https://nodejs.org/en/)
\ **・🛡| Versão: ** ${versao}

\ **・🗡 | Ping:** ${ping}`);



        message.reply({ embeds: [embed] })



    }
}