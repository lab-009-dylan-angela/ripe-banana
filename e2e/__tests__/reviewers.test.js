const request = require('../request');
const db = require('../db');

describe('reviewers api', () => {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });

  const data = {
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

  it('posts a reviewer', () => {
    return postReviewer(data)
      .then(reviewer => {
        expect(reviewer).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

  it('gets reviewer by id', () => {
    return postReviewer(data)
      .then(reviewer => {
        return request.get(`/api/reviewers/${reviewer._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(reviewer);
          });
      });
  });

  it('deletes a reviewer', () => {
    return postReviewer(data)
      .then(reviewer => {
        return request
          .delete(`/api/reviewers/${reviewer._id}`)
          .expect(200);
      });
  });
});