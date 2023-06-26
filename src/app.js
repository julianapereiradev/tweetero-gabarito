import express from "express"
import cors from "cors"

// Crianção do app:
const app = express()

// Configurações:
app.use(cors())
app.use(express.json())


const users = []
const tweets  = []

// Funções (endpoints):
app.post("/sign-up", (req,res) => {
    const {username, avatar} = req.body
    users.push({username, avatar})
    console.log('', users)
    res.send("OK")
})


// Ligar a aplicação do servidos para ouvir as requisições:
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))