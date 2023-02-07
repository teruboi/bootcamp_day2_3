const fs = require('fs');
const valid = require('validator');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
    console.log('Folder not found, new folder created.');
};

const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8');
    console.log('File not found, new file created.');
}

function input(question) {
    return new Promise((resolve) => {
        readLine.question(question, (answer)=>{
            resolve(answer);
        })
    })
}

const main = async () =>
{
    const name = await input('Name: ');
    let email;
    do {
        email = await input('Email address: ');
        if(!valid.isEmail(email)){
            console.log('Invalid email format, try again');
        }
    } while (!valid.isEmail(email));
    let phone;
    do {
        phone = await input('Phone Number: ');
        if(!valid.isMobilePhone(phone,['id-ID'])){
            console.log('Invalid phone number format, try again');
        }
    } while (!valid.isMobilePhone(phone,['id-ID']));

    console.log(`Name: ${name}\nEmail Address: ${email}\nPhone Number: ${phone}`);

    fs.readFile('data/contacts.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            var obj = JSON.parse(data);
            obj.push({name, email, phone});
            fs.writeFile('data/contacts.json', JSON.stringify(obj), function callbackErr(err) {
                if(err){
                    console.log(err);
                };
            });
        }
    });

    console.log('Data saved.');
    process.exit(0)
};

main();