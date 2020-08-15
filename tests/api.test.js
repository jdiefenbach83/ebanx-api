const request = require('supertest');
const url = 'http://localhost:3000/api';

describe('POST /reset', () => {
  it('Reset state before starting tests', async () => {
    const response = await request(url).post('/reset');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });
});
