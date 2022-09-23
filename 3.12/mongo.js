const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Please provide: node mongo.js <password> <name> <number>')
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://brett:${password}@cluster1.ghnlh.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name && !number){
    mongoose.connect(url).then(()=>{
        console.log('connected')
        Person.find({}).then((res) => {
            console.log('phonebook:')
            res.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    })
} else {
    mongoose.connect(url).then((response) => {
        console.log('connected')
        const person = new Person({
            name: name,
            number: number,
        })
        return person.save()
    })
    .then(() => {
        console.log('Person Saved')
        return mongoose.connection.close()
    }).catch((err) => console.log(err))
}