const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://252yash:${password}@cluster0.l43v4a3.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const PersonSchema = ({
    name : String,
    number : String
})

const Person = mongoose.model('Person',PersonSchema)

mongoose
    .connect(url)
    .then(result => {
        if(process.argv.length===3){
            return Person.find({})
        } else{
            const newName = process.argv[3];
            const newNumber = process.argv[4];
            const newPerson = new Person({
                name:newName,
                number:newNumber
            })
            return newPerson.save();
        }
    })
    .then((result) => {
        if(process.argv.length===3){
            result.forEach(person => {
                console.log(person)
            })
        } else{
            console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        }
        mongoose.connection.close();
    }).catch(err => {
        console.log({error : err})
        mongoose.connection.close();
    })