const discord = require('discord.js');
const { prefix, token, prefix2, giphyToken } = require('./config.json');
const client = new discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)
client.once ('ready', () => {
    console.log('ready!')
})

client.on('message', message => {
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {

        //console.log(message.content);

    

        if(message.content.startsWith(`${prefix}helpmod`)){
            message.channel.send("commands mod: E%Pkick, E%Pban")

        }

        if(message.content.startsWith(`${prefix}ban`)){
            let member = message.mentions.members.first()
            member.ban().then((member) => {
                message.channel.send(":woman_shrugging:" + member.displayName + " I banned you.")
            })
        }

        if(message.content.startsWith(`${prefix}kick`)){
            //message.channel.send("kick")

            let member = message.mentions.members.first();
            member.kick().then((member) => {

                giphy.search('gifs', {"q": "fail"})
                    .then((response) => {
                        var totalResponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                        var responseFinal = response.data[responseIndex];

                        message.channel.send(":wave: " + member.displayName + " has been kicked!", {
                            files: [responseFinal.images.fixed_height.url]
                        })


                    }).catch(() => {
                        message.channel.send('Error ugh!');
                    })


            })
        }

    }

    if(message.content.startsWith(`${prefix}invite`)){
        message.channel.send("https://discord.com/oauth2/authorize?client_id=717923019695194114&scope=bot&permissions=1342201022")
    }

    if(message.content.startsWith(`${prefix}dev`)){
        message.channel.send("I was created by ᗴTᕼᗩᑎᑭᗴᕼ#9187.")
    }

    if(message.content.startsWith(`${prefix}help`)){
        message.channel.send("Commands: E%Phelp, E%Pinvite, E%Pdev, E%Phelpmod")
    }

})

client.login(token);
