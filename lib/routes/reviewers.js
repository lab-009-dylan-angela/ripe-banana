/* eslint-disable new-cap */
const router = require('express').Router();
const Reviewer = require('../models/reviewer');

router

  .post('/', (req, res, next) => {
    
    Reviewer.create(req.body)
      .then(reviewer => {
        res.json(reviewer);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer.find()
      .select('_id name company')
      .lean()
      .then(reviewers => res.json(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer.findById(req.params.id)
      .lean()
      .then(reviewers => res.json(reviewers))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Reviewer.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.json(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer.findByIdAndRemove(req.params.id)
      .then(reviewer => res.json(reviewer))
      .catch(next);
  });

module.exports = router;