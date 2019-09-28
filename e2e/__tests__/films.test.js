const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

const actor1 = {
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

const studio1 = {
  name: 'Warner Brothers',
  address: {
    city: 'Burbank',
    state: 'California',
    country: 'USA'
  }
};

function postStudio(studio) {
  return request
    .post('/api/studios')
    .send(studio)
    .expect(200)
    .then(({ body }) => body);
}

describe('films api', () => {
  beforeEach(() => {
    return db.dropCollection('films');
  });

  const data = {
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

  it('posts a film', () => {
    return postFilm(data).then(film => {
      expect(film).toEqual({
        _id: expect.any(String),
        __v: 0,
        title: 'Beetlejuice',
        studio: expect.any(String),
        released: 1988,
        cast: [
          {
            role: 'Lydia Deetz',
            actor: expect.any(String),
            _id: expect.any(String)
          }
        ]
      });
    });
  });

  it('gets film by id', () => {
    return postActor(actor1).then(postedActor => {
      data.cast[0].actor = postedActor._id;
      return postStudio(studio1).then(postedStudio => {
        data.studio = postedStudio._id;
        return postFilm(data).then(film => {
          return request
            .get(`/api/films/${film._id}`)
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body).toMatchInlineSnapshot(
                {
                  _id: expect.any(String),
                  studio: {
                    _id: expect.any(String)
                  },
                  cast: [
                    {
                      _id: expect.any(String)
                    }
                  ]
                },
                `
                Object {
                  "__v": 0,
                  "_id": Any<String>,
                  "cast": Array [
                    Object {
                      "_id": Any<String>,
                      "actor": Object {
                        "_id": "5d8e9bc9a17d9a42d09959b0",
                        "name": "Winona Ryder",
                      },
                      "role": "Lydia Deetz",
                    },
                  ],
                  "released": 1988,
                  "studio": Object {
                    "_id": Any<String>,
                    "name": "Warner Brothers",
                  },
                  "title": "Beetlejuice",
                }
              `
              );
            });
        });
      });
    });
  });

  it('deletes a film', () => {
    return postFilm(data).then(film => {
      return request.delete(`/api/films/${film._id}`).expect(200);
    });
  });
});
