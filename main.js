require('dotenv').config();

const Discord = require('discord.js');
const ms = require('ms'); 
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const isCommand = (message, cmdName) => message.content.toLowerCase().startsWith(prefix + cmdName);


client.once('ready', () => {
    console.log(`${client.user.tag} yra online! `);
    console.log(process.env.BOT_TOKEN);
    client.user.setActivity(process.env.ACTIVITY);
});


client.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    if(message.author.bot) return;

    //Komandos V

        //Labas
    if(isCommand(message, "labas")) {
        message.reply("Zdrw");
    }
        //Help
    else if (isCommand(message, "help")) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Informacija')
        .addField('Botas by', '-| Ganja |-#5141')
        .addField('Komandų sarašas:', prefix + 'cmds')
        .setColor(0xEC6B11)
        .setThumbnail("https://cdn.discordapp.com/app-icons/734044867746988122/dc00554d39b310ef50732299858221b0.png?size=128");

        message.channel.send(embed);  
    }
        //Serverioinfo
    else if (isCommand(message, "serverioinfo")) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Informacija')
        .addField('Narių skaičius:', `${message.guild.memberCount - 7}`)
        .addField('Botų skaičius:', '7')
        .addField('Narių skaičius:', `${message.guild.roles}`)
        .setColor(0xEC6B11)
        .setThumbnail(message.guild.iconURL());

        message.channel.send(embed);  
    }
        //MUTE Funkcija
    else if (isCommand(message, "mute")) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
        var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!person) return  message.reply("Nerandu nario " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Narys");
            let role = message.guild.roles.cache.find(role => role.name === "Užtildytas");
           
            if(person.roles.cache.find(r => r.name === "Užtildytas")) {
                return message.reply(`@${person.user.tag} jau užtildytas!`);
            }
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("Reikia įrašyti laiką!");
            }
 
            person.roles.remove(mainrole.id)
            person.roles.add(role.id);
 
 
            message.channel.send(`@${person.user.tag} yra užtildytas ${ms(ms(time))}`)
 
            timeoutas = setTimeout(function(){
               
                person.roles.add(mainrole.id)
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} yra atitildytas.`)
            }, ms(time));
        } else {
            message.channel.send("Neturi teisių naudoti šios komandos!");
        }
    }
            //Unmute
    else if (isCommand(message, "unmute")) {
        var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!person) return  message.reply("Nerandu nario " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Narys");
            let role = message.guild.roles.cache.find(role => role.name === "Užtildytas");
           
            if(!person.roles.cache.find(r => r.name === "Užtildytas")) {
                return message.reply(`@${person.user.tag} nėra užtildytas!`);
            }
 

            person.roles.remove(role.id)
            person.roles.add(mainrole.id);
 
            clearTimeout(timeoutas);
            message.channel.send(`@${person.user.tag} yra atitildytas!`);

    }
            //SunaikintiServeri

    else if (isCommand(message, "sunaikintiserveri")) {

        message.channel.send("Serveris sunaikinamas už 10 sekundžių!");

        var sunaikintiserveri = setInterval(() => {
            message.channel.send("jk nubas");
            clearInterval(sunaikintiserveri);
        },10000);


    }

    // Komandų pabaiga /\
});




client.login(process.env.BOT_TOKEN);

