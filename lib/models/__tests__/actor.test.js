const Actor = require('../actor');

describe('actors model', () => {
  
  it('validates all model properties', () => {
    const data = {
      name: 'Winona Ryder',
      dob: 1971,
      pob: 'Winona, Minnesota'
    };

    const actor = new Actor(data);
    const errors = actor.validateSync();
    expect(errors).toBeUndefined();

    const json = actor.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
});
