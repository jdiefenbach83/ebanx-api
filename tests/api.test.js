const request = require('supertest');
const url = 'http://localhost:3000/api';

describe('POST /reset', () => {
  it('Reset state before starting tests', async () => {
    const response = await request(url).post('/reset');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });
});

describe('GET /balance?account_id=1234', () => {
  it('Get balance for non-existing account', async () => {
    const response = await request(url).get('/balance?account_id=1234');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({});
  });
});
