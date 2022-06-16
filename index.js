const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
███████ ████████ ██    ██ ███    ███ ██████  ██      ███████         
██         ██    ██    ██ ████  ████ ██   ██ ██      ██           
███████    ██    ██    ██ ██ ████ ██ ██████  ██      █████          
     ██    ██    ██    ██ ██  ██  ██ ██   ██ ██      ██            
███████    ██     ██████  ██      ██ ██████  ███████ ███████    

By : ${chalk.red('@dkmpostor')} - ${chalk.blue('https://dkmpostor.herokuapp.com/')}
`);

    const auth = rs.question('[+] Enter your auth token : ');
    console.log('');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            process.stdout.write(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Wrong cookie or Expired cookie !`));

        } else if (result.includes('User')) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns;
            
            process.stdout.write(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | Trophy : ${trophy} | Crown : ${crown}`));
        }
    }
    

})();