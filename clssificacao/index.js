require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

const funcoes = {
    ObservacaoCriada: (observacao) => {
        if (observacao.texto.toLowerCase().includes('importante')){
          observacao.status = 'importante'
        }else{
          observacao.status = 'comum'
        }
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
    res.status(200).send({msg: "ok"})
})



app.listen(process.env.PORT, async () => {
    const eventos = await axios.get("http://localhost:10000/eventos")
    eventos.data.forEach(x => {
        try{ funcoes[x.type](x.payload) } catch(e){}
    })
    console.log(`classificacao porta ${process.env.PORT}`)
})