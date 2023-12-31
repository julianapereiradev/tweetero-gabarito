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

    if(!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push({username, avatar})
    res.status(201).send("OK")
})


app.post("/tweets", (req, res) => {
   const {tweet} = req.body
   const {user} = req.headers

   if(!user || typeof user !== "string" || !tweet || typeof tweet !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!")
}
   
   //find => retorna undefined se não acha e se acha retorna o obj do usuário
   const userExists = users.find((u) => u.username === user)

   if(!userExists) return res.status(401).send("UNAUTHORIZED")

   tweets.push({username: user, tweet})
   res.status(201).send("OK")
})


app.get("/tweets", (req, res) => {
    const page = Number(req.query.page)
    
    if(req.query.page && (isNaN(page) || page < 1) ) {
        return res.status(400).send("Informe uma página válida!")
    }

    const completeTweets = tweets.map((tweet) => {
        const user = users.find((user) => user.username === tweet.username)
        return {...tweet, avatar: user.avatar}
    })

    if (page) {
        const limit = 10
        const start = (page - 1) * limit
        const end = page * limit

        return res.send(completeTweets.slice(start, end))
    }

    res.send(completeTweets.slice(-10))
})

app.get("/tweets/:username", (req,res) => {

    const {username} = req.params

    const filteredTweets = tweets
    .filter((tweet) => tweet.username === username)
    .map((tweet) => {
        const user = users.find((u) => u.username === tweet.username)
        return {...tweet, avatar: user.avatar}
    })

    res.send(filteredTweets)
})

// Ligar a aplicação do servidos para ouvir as requisições:
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))