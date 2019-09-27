const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

describe('films api', () => {
  beforeEach(() => {
    return db.dropCollection('films');
  });

  const data = {
    title: 'Beetlejuice',
    studio: new mongoose.Types.ObjectId,
    released: 1988,
    cast: [{
      role: 'Lydia Deetz',
      actor: new mongoose.Types.ObjectId
    }]
  };

  function postFilm(film) {
    return request
      .post('/api/films')
      .send(film)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a film', () => {
    return postFilm(data)
      .then(film => {
        expect(film).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'Beetlejuice',
          studio: expect.any(String),
          released: 1988,
          cast: [{
            role: 'Lydia Deetz',
            actor: expect.any(String),
            _id: expect.any(String)
          }]
        });
      });
  });

  it('gets film by id', () => {
    return postFilm(data)
      .then(film => {
        return request.get(`/api/films/${film._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(film);
          });
      });
  });

  it('deletes a film', () => {
    return postFilm(data)
      .then(film => {
        return request
          .delete(`/api/films/${film._id}`)
          .expect(200);
      });
  });
});