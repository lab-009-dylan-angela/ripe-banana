const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

const reviewer1 = {
  name: 'Gene Shalit',
  company: 'NBC'
};

function postReviewer(reviewer) {
  return request
    .post('/api/reviewers')
    .send(reviewer)
    .expect(200)
    .then(({ body }) => body);
}

const film1 = {
  title: 'Beetlejuice',
  studio: new mongoose.Types.ObjectId(),
  released: 1988,
  cast: [
    {
      role: 'Lydia Deetz',
      actor: new mongoose.Types.ObjectId()
    }
  ]
};

function postFilm(film) {
  return request
    .post('/api/films')
    .send(film)
    .expect(200)
    .then(({ body }) => body);
}

describe('reviews api', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const data = {
    rating: 5,
    reviewer: new mongoose.Types.ObjectId(),
    review: 'Tim Burton when he still had original ideas.',
    film: new mongoose.Types.ObjectId()
  };

  function postReview(review) {
    return request
      .post('/api/reviews')
      .send(review)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(data).then(review => {
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
    return postReviewer(reviewer1).then(postedReviewer => {
      data.reviewer = postedReviewer._id;
      return postFilm(film1).then(postedFilm => {
        data.film = postedFilm._id;
        return postReview(data).then(review => {
          console.log(review);

          return request
            .get(`/api/reviews/${review._id}`)
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchInlineSnapshot(
                {
                  _id: expect.any(String),
                  reviewer: {
                    _id: expect.any(String)
                  },
                  film: {
                    _id: expect.any(String)
                  }
                },
                `
                Object {
                  "__v": 0,
                  "_id": Any<String>,
                  "film": Object {
                    "_id": Any<String>,
                  },
                  "rating": 5,
                  "review": "Tim Burton when he still had original ideas.",
                  "reviewer": Object {
                    "_id": Any<String>,
                    "name": "Gene Shalit",
                  },
                }
              `
              );
            });
        });
      });
    });
  });

  it('deletes a review', () => {
    return postReview(data).then(review => {
      return request.delete(`/api/reviews/${review._id}`).expect(200);
    });
  });
});
