const axios = require('axios')
const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes
    }
}

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta)
})

app.post("/eventos", (req, res) => {
    funcoes[req.body.type](req.body.payload)
    res.status(200).send(baseConsulta)
})

app.listen(process.env.PORT, () => console.log(`consultas porta ${process.env.PORT}`))