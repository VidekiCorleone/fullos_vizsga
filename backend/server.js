const express = require('express')
const JWT = require('jsonwebtoken')
const cors = require('cors')
const dbHandler = require('./dbHandler')
require('dotenv').config()

const server = express()
server.use(express.json())
server.use(cors())

const PORT = process.env.PORT
const SECRET = process.env.SECRET

dbHandler.artworks.sync({alter:true})
dbHandler.users.sync({alter:true})

function Auth(){
    return async(req, res, next) => {
        const header = req.headers.authorization
        try {
            console.log(header);
            const token = await JWT.verify(header, SECRET)
            next()
        } catch (error) {
            res.status(401).json({'error':'Token hiba' + error}).end()
        }
    }
}

server.post('/login', async (req, res) => {
    const oneUser = await dbHandler.users.findOne({
        where:{
            username: req.body.loginUser,
            password: req.body.loginPass
        }
    })

    if(!oneUser){
        res.status(401).json({'error':'Hibás felhasználónév vagy jelszó'}).end()
        return
    }

    const token = await JWT.sign({username: req.body.loginUser}, SECRET, {expiresIn: '1h'})
    res.status(200).json({'message':'Sikeres bejelentkezés', token:token}).end()
})

server.post('/register', async (req, res) => {
    const oneUser = await dbHandler.users.findOne({
        where:{
            username: req.body.regUser
        }
    })

    if(oneUser){
        res.status(409).json({'error':'A felhasználónév már foglalt'}).end()
        return
    }

    await dbHandler.users.create({
        username: req.body.regUser,
        password: req.body.regPass
    })

    res.status(201).json({'message':'Sikeres regisztráció.'}).end()
})

server.get('/artworks', async (req, res) => {
    res.status(200).json(await dbHandler.artworks.findAll()).end()
})

server.post('/artworks', Auth(), async (req, res) => {
    const oneArtwork = await dbHandler.artworks.findOne({
        where:{
            title: req.body.newTitle
        }
    })

    if(oneArtwork){
        res.status(409).json({'error':'Már létezik ilyen című műalkotás.'}).end()
        return
    }

    await dbHandler.artworks.create({
        title: req.body.newTitle,
        value: req.body.newValue
    })
    
    res.status(201).json({'message':'Új m űalkotás sikeresen hozzáadva.'}).end()
})

server.delete('/artworks/:id', Auth(), async (req, res) => {
    const oneArtwork = await dbHandler.artworks.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!oneArtwork){
        res.status(404).json({'error':'A megadott műalkotás nem található.'}).end()
        return
    }

    await dbHandler.artworks.destroy({
        where:{
            id: req.params.id
        }
    })

    res.status(201).json({'message':'Sikeres törlés.'}).end()
})

server.listen(PORT, console.log("A szerver fut a " + PORT + "-es porton."))