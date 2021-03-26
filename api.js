const express = require('express')
const app = express()
const pokedex = require('./pokedex.json')

// middleware permettant d'interprêter le body de la requête
app.use(express.json())

// sélection du port d'écoute de l'api, et log lors du lancement confirmant son fonctionnement
app.listen(8000, () => {
    console.log("Lancement de l'API")
})

// première requête HTTP, elle affiche le contenu dans son intégralité et retourne un code 200 pour confirmer son succès
app.get('/pokedex', (req, res) => {
    res.status(200).json(pokedex)
})

// seconde requête GET permettant d'afficher uniquement l'ID concerné, la fonction parseInt permet de renvoyer l'ID en ENTIER
app.get('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokedex.find(pokemon => pokemon.id === id)
    res.status(200).json(pokemon)
})

// la méthode POST permet d'ajouter un nouveau pokemon et ses informations dans le pokedex au format JSON, ici, sans modèle
app.post('/pokedex', (req, res) => {
    pokedex.push(req.body)
    res.status(200).json(pokedex)
})


// la méthode PUT permet de modifier l'intégralité des pokémons existants par les nouvelles valeurs entrées
app.put('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let pokemon = pokedex.find(pokemon => pokemon.id === id)
    pokemon.name = req.body.name,
        pokemon.type = req.body.type,
        pokemon.base = req.body.base,
        res.status(200).json(pokemon)
})

// la méthode PATCH permet quant à elle de modifier uniquement certains champs
app.patch('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let pokemon = pokedex.find(pokemon => pokemon.id === id)
    pokemon.name = req.body.name,
        pokemon.type = req.body.type,
        pokemon.base = req.body.base,
        res.status(200).json(pokemon)
})

// la méthode DELETE permet de supprimer un pokemon du pokedex par le bief de son ID
app.delete('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let pokemon = pokedex.find(pokemon => pokemon.id === id)
    pokedex.splice(pokedex.indexOf(pokemon), 1)
    res.status(200).json(pokedex)
})

