/* eslint-disable new-cap */
const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film');

router

  .post('/', (req, res, next) => {
  
    Actor.create(req.body)
      .then(actor => {
        console.log(actor);
      
        res.json(actor);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor.find()
      .select('_id name')
      .lean()
      .then(actors => res.json(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .lean()
      .then(actors => res.json(actors))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film.find({ actor: res.params.id })
      .then(res => {
        if(res.length === 0) {
          Actor.findByIdAndRemove(req.params.id)
            .then(actor => res.json(actor));
        }
      })
      .catch(next);
  });

module.exports = router;