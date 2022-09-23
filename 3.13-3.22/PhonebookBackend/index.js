require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express ()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req,res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

const PORT = process.env.PORT || 3001


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    res.send(`<h1>Phonebook</h1><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(person => {
        res.json(person)
    })
})

app.post('/api/persons', (req, res) => {
    Person.find({}).then((myDb)=>{
        myDb = myDb.map(x=>x.name)
        console.log(myDb)
        const checkFormat = (number) => {
            let validNums ="1234567890"
            if (number.length < 8){
                return false
            }
            let phoneNum = number.split('-')
            if (phoneNum.length != 2){
                return false
            }
            if (phoneNum[0].length < 2 || phoneNum[0].length > 3){
                return false
            }
            phoneNum = phoneNum.join('')
            for (let i = 0; i < phoneNum.length; i++){
                if (!validNums.includes(phoneNum[i])){
                    return false
                }
            }
            return true
        }
        const body = req.body
        if(myDb.includes(body.name)){
            return res.status(400).json({error: "name already in db"})
        }
        if (!checkFormat(body.number.toString())){
            return res.status(400).json({error: "invalid number format (222-3454433)"})
        }
        if (body.name === undefined || body.number === undefined){
            return res.status(400).json({error: 'name or number missing'})
        }
        if (body.name.length < 3){
            return res.status(400).json({error: "name must be at least 3 characters long"})
        }
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            res.json(savedPerson)
        })
    })
    //here
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
