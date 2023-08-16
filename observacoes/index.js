const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
const observacoesPorLembreteId = {}


app.use(bodyParser.json())

app.get('/lembretes/:id/observacoes', (req, res) => {

})

app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    const {texto} = req.body
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembrete.push({ id: idObs, texto })

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    res.status(201).send(observacoesDoLembrete)
})


app.listen(5000, () => {
    console.log('observacoes porta 5000')
})