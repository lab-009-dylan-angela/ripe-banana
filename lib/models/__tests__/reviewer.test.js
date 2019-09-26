const Reviewer = require('../reviewer');

describe('reviewer model', () => {
  
  it('validates all model properties', () => {
    const data = {
      name: 'Gene Shalit',
      company: 'NBC'
    };

    const reviewer = new Reviewer(data);
    const errors = reviewer.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewer.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
});