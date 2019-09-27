const Review = require('../review');

describe('review model', () => {
  
  it('validates all model properties', () => {
    const data = {
      rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5
      },
      reviewer: {
        review_id: {
          type: String,
          required: true
        }
      },
      review: {
        type: String,
        required: true,
        maxlength: 140
      }, 
      film: {
        type: String,
        require: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
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