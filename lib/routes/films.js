/* eslint-disable new-cap */
const router = require('express').Router();
const Film = require('../models/film');

router

  .post('/', (req, res, next) => {
    
    Film.create(req.body)
      .then(film => {
        res.json(film);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film.find()
      .select('_id title, released')
      .lean()
      .populate('studio', '_id name')
      .then(films => res.json(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film.findById(req.params.id)
      .select('title, released')
      .populate('studio', 'name')
      .populate({
        cast: '_id role',
        populate: { path: 'actor' }
      })
      .populate({
        reviews: 'id rating review',
        populate: { path: 'reviewer' }
      })
      .then(films => res.json(films))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Film.findByIdAndRemove(req.params.id)
      .then(film => res.json(film))
      .catch(next);
  });

module.exports = router;