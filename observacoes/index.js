const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')

require('dotenv').config()

const app = express()
const observacoesPorLembreteId = {}


app.use(bodyParser.json())

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4()
    const {texto} = req.body
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembrete.push({ id: idObs, texto })

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    await axios.post("http://localhost:10000/eventos", {
        type: "ObservacaoCriada",
        payload: {id: idObs, texto, lembreteId: req.params.id}
    })
    res.status(201).send(observacoesDoLembrete)
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).send({msg: "ok"})
})

app.listen(process.env.PORT, () => {
    console.log(`observacoes porta ${process.env.PORT}`)
})