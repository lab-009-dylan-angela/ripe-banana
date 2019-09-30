const Review = require('../review');
const mongoose = require('mongoose');

describe('review model', () => {
  
  it('validates all model properties', () => {
    const data = {
      rating: 5,
      reviewer: new mongoose.Types.ObjectId,
      review: 'Tim Burton when he still had original ideas.', 
      film: new mongoose.Types.ObjectId
    };

    const review = new Review(data);
    const errors = review.validateSync();
    expect(errors).toBeUndefined();

    const json = review.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
});