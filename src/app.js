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
    // console.log('Array de users aqui:', users)
    res.send("OK")
})


app.post("/tweets", (req, res) => {
   const {username, tweet} = req.body
   
   //find => retorna undefined se não acha e se acha retorna o obj do usuário
   const userExists = users.find((user) => user.username === username)

   if(!userExists) return res.send("UNAUTHORIZED")

   tweets.push({username, tweet})
   res.send("OK")
})


app.get("/tweets", (req, res) => {
    const completeTweets = tweets.map((tweet) => {
        const user = users.find((user) => user.username === tweet.username)
        return {...tweet, avatar: user.avatar}
    })

    res.send(completeTweets.slice(-10).reverse())
})

// Ligar a aplicação do servidos para ouvir as requisições:
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))