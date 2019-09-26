const request = require('../request');
const db = require('../db');

describe('actors api', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const data = {
    name: 'Winona Ryder',
    dob: 1971,
    pob: 'Winona, Minnesota'
  };

  function postActor(actor) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a actor', () => {
    return postActor(data)
      .then(actor => {
        expect(actor).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

  it('gets actor by id', () => {
    return postActor(data)
      .then(actor => {
        return request.get(`/api/actors/${actor._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(actor);
          });
      });
  });

  it('deletes a actor', () => {
    return postActor(data)
      .then(actor => {
        return request
          .delete(`/api/actors/${actor._id}`)
          .expect(200);
      });
  });
});