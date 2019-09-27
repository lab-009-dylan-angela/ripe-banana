const Film = require('../film');
const mongoose = require('mongoose');

describe('film model', () => {
  
  it('validates all model properties', () => {
    const data = {
      title: 'Beetlejuice',
      studio: new mongoose.Types.ObjectId,
      released: 1988,
      cast: [{
        role: 'Lydia Deetz',
        actor: new mongoose.Types.ObjectId
      }]
    };

    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON();

    expect(json).toEqual({
      title: 'Beetlejuice',
      studio: expect.any(Object),
      released: 1988,
      cast: [{
        role: 'Lydia Deetz',
        actor: expect.any(Object),
        _id: expect.any(Object)
      }],
      _id: expect.any(Object)
    });
  });
});