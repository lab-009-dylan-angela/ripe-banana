const Review = require('../review');
const { ObjectId } = require('mongoose').Types;

describe('review model', () => {
  
  it('validates all model properties', () => {
    const data = {
      rating: 5,
      reviewer: new ObjectId(),
      review: 'Tim Burton when he still had original ideas.', 
      film: new ObjectId()
    };

    const review = new Review(data);
    const errors = review.validateSync();
    expect(errors).toBeUndefined();

    const json = review.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      ...data.reviewer[0],
      _id: expect.any(Object),
      ...data.film[0]
    });
  });
});