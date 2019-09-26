const request = require('../request');
const db = require('../db');

describe('studios api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const data = {
    name: 'Warner Brothers',
    address: {
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    }
  };

  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a studio', () => {
    return postStudio(data)
      .then(studio => {
        expect(studio).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

  // it('gets studio by id', () => {
  //   return postStudio(data)
  //     .then(studio => {
  //       return request.get(`/api/studios/${studio._id}`)
  //         .expect(200)
  //         .then(({ body }) => {
  //           expect(body).toEqual(studio);
  //         });
  //     });
  // });
});