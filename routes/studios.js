/* eslint-disable new-cap */
const router = require('express').Router();
const Studio = require('../lib/models/studio');

router
  .get('/', (req, res, next) => {
    Studio.find()
      .then(studios => res.json(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio.findById(req.params.id)
      .then(studios => res.json(studios))
      .catch(next);
  });

module.exports = router;