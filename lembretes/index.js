const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
require('dotenv').config()

const app = express()


lembretes = {}
contador = 0

app.use(bodyParser.json())



app.get('/lembretes', (req, res) => {
    res.send(lembretes)
})

app.post('/lembretes', async (req, res) => {
    contador++
    const { texto } = req.body
    lembretes[contador] = {contador, texto}
    await axios.post("http://localhost:10000/eventos", {
        type: "LembreteCriado",
        payload: {contador, texto}
    })
    res.status(201).send(lembretes[contador])
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).send({msg: "ok"})
})

app.listen(process.env.PORT, () => {
    console.log(`lembretes porta ${process.env.PORT}`)
})