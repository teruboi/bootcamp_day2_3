const fs = require('fs');
const valid = require('validator');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question('Name: ', (name) => {
    readLine.question('Email Address: ', (email) => {
        if(!valid.isEmail(email)) {
            console.log("ERROR: Invalid Format");
        }
        else {
            readLine.question('Phone Number: ', (phone) => {
                if(!valid.isMobilePhone(phone, ['id-ID'])) {
                    console.log("ERROR: Invalid Format");
                }
                else {
                    console.log(`Name: ${name}\n
                    Email Address: ${email}\n
                    Phone Number: ${phone}`);

                    if(!fs.existsSync('data')){
                        fs.mkdirSync('data');
                        console.log('Folder not found, new folder created.');
                    };

                    if(!fs.existsSync('data/contacts.json')){
                        fs.writeFileSync('data/contacts.json', JSON.stringify([]));
                        console.log('File not found, new file created.');
                    }

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

                    console.log('Data saved.')
                    readLine.close();
                }
            })
        }
    })
});