/* eslint-disable new-cap */
const router = require('express').Router();
const Studio = require('../models/studio');
const Film = require('../models/film');

router

  .post('/', (req, res, next) => {
    
    Studio.create(req.body)
      .then(studio => {        
        res.json(studio);
      })
      .catch(next);
  })
    
  .get('/', (req, res, next) => {
    Studio.find()
      .select('_id name')
      .lean()
      .then(studios => res.json(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio.findById(req.params.id)
      .lean()
      .then(studios => res.json(studios))
      .catch(next);
  })
    
  .delete('/:id', (req, res, next) => {
    Film.find({ studio: res.params.id })
      .then(res => {
        if(res.length === 0) {
          Studio.findByIdAndRemove(req.params.id)
            .then(studio => res.json(studio));
        }
      })
      .catch(next);
  });

module.exports = router;
    