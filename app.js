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
            readLine.close();
        }
        else {
            readLine.question('Phone Number: ', (phone) => {
                if(!valid.isMobilePhone(phone, ['id-ID'])) {
                    console.log("ERROR: Invalid Format");
                    readLine.close();
                }
                else {
                    console.log(`Name: ${name}\n
                    Email Address: ${email}\n
                    Phone Number: ${phone}`);

                    fs.readFile('data/contacts.json', 'utf8', function readFileCallback(err, data){
                        if (err){
                            console.log(err);
                        } else {
                            var obj = JSON.parse(data);
                            if (Array.isArray(obj)) {
                                obj.push({name: name, email: email, phone: phone}); //add some data
                                json = JSON.stringify(obj); //convert it back to json
                                fs.writeFile('data/contacts.json', json, function callback(err) {
                                    if (err){
                                        console.log(err);
                                    };
                                });
                            }
                        }
                    });

                    console.log('Data saved.')
                    readLine.close();
                }
            })
        }
    })
});
