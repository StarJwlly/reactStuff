const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const axios = require('axios')

const app = express();
app.use(bodyParser.json())

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body
    eventos.push(evento)
    try {axios.post("http://localhost:4000/eventos", evento)} catch(e){}
    try {axios.post("http://localhost:5000/eventos", evento)} catch(e){}
    try {axios.post("http://localhost:6000/eventos", evento)} catch(e){}
    try {axios.post("http://localhost:7000/eventos", evento)} catch(e){}
    res.status(200).send({msg: "ok"})
})

app.get('/eventos', (req, res) => {
    res.status(200).json(eventos)
})

app.listen(process.env.PORT, () => {
    console.log(`barramento de eventos porta ${process.env.PORT}`)
})