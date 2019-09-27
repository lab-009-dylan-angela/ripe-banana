const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

describe('reviews api', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const data = {
    rating: 5,
    reviewer: new mongoose.Types.ObjectId,
    review: 'Tim Burton when he still had original ideas.', 
    film: new mongoose.Types.ObjectId
  };

  function postReview(review) {
    return request
      .post('/api/reviews')
      .send(review)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(data)
      .then(review => {
        expect(review).toEqual({
          _id: expect.any(String),
          __v: 0,
          rating: 5,
          reviewer: expect.any(String),
          review: 'Tim Burton when he still had original ideas.', 
          film: expect.any(String)
        });
      });
  });

  it('gets review by id', () => {
    return postReview(data)
      .then(review => {
        return request.get(`/api/reviews/${review._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(review);
          });
      });
  });

  it('deletes a review', () => {
    return postReview(data)
      .then(review => {
        return request
          .delete(`/api/reviews/${review._id}`)
          .expect(200);
      });
  });
});