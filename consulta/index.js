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
    },
    ObservacaoAtualizada: (observacao) => {
        console.log(observacao)
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes']
        const index = observacoes.findIndex(x => x.id == observacao.id)
        baseConsulta[observacao.lembreteId]["observacoes"][index] = observacao
    }
}

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta)
})

app.post("/eventos", (req, res) => {
    try{
        funcoes[req.body.type](req.body.payload)
    }catch(e){}
    res.status(200).send(baseConsulta)
})

app.listen(process.env.PORT, async () => {
    const eventos = await axios.get("http://localhost:10000/eventos")
    eventos.data.forEach(x => {
        try{ funcoes[x.type](x.payload) } catch(e){console.log(e)}
    })
    console.log(`consultas porta ${process.env.PORT}`)
})