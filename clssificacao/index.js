require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

const funcoes = {
    ObservacaoCriada: (observacao) => {
        console.log (observacao)
        if (observacao.texto.toLowerCase().includes('importante'))
          observacao.status = 'importante'
        else   
          observacao.status = 'comum'
        axios.post("http://localhost:10000/eventos", {
            type: 'ObservacaoClassificada',
            payload: observacao
        })
    }
}

app.post('/eventos', async (req, res) => {
    try{
        funcoes[req.body.type](req.body.payload)
    }catch(e){}        
    res.status(200).send(temp)
})



app.listen(process.env.PORT, () => console.log(`classificacao porta ${process.env.PORT}`))