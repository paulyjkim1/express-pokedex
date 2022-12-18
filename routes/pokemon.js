const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from  the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    res.render('pokemon/index.ejs' ,{
      allFaves: allFaves,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('api error')
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  console.log(req.body)
  try{
    const returnArray = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      }
    })

    res.redirect('/pokemon')
  }catch (err) {
    console.log(err)
    res.status(500).send('api error')
  }
});


router.get('/:name', async (req, res) => {
  try{
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
    // Use request to call the API
    let response = await axios.get(pokemonUrl)
    res.render('show.ejs', {
      poke: response.data
    })
  }catch (err) {
    console.log(err)
    res.status(500).send('api error')
  }
})

module.exports = router;
