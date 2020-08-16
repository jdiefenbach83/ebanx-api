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
    expect(response.text).toEqual('0');
  });
});

describe('POST /event {"type":"deposit", "destination":"100", "amount":10}', () => {
  it('Create account with initial balance', async () => {
    const req = { type: 'deposit', destination: '100', amount: 10 };
    const res = { destination: { id: '100', balance: 10 } };

    const response = await request(url).post('/event').send(req);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(res);
  });
});

describe('POST /event {"type":"deposit", "destination":"100", "amount":10}', () => {
  it('Deposit into existing account', async () => {
    const req = { type: 'deposit', destination: '100', amount: 10 };
    const res = { destination: { id: '100', balance: 20 } };

    const response = await request(url).post('/event').send(req);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(res);
  });
});

describe('GET /balance?account_id=100', () => {
  it('Get balance for existing account', async () => {
    const response = await request(url).get('/balance?account_id=100');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('20');
  });
});
