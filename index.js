const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let Persons = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
          }
]

app.get('/api/persons', (request,response) => {
    response.json(Persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = Persons.find(person => person.id === id)
     if (person) {
        response.json(person)
     } else {
    response.status(404).end()
    }
})

app.post('/api/persons', (request,response) => {
    const person = request.body;
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Persons = Persons.filter(person => person.id !== id)
    response.status(204).end()
  })

const UnknownEndpoint = (request,response) => {
    response.status(404).send({error:'Unknown Endpoint'})
}

app.use(UnknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on the Port:${PORT}`)
})