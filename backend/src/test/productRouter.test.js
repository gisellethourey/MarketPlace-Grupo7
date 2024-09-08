import request from 'supertest';
import app from '../../src/index.js'; // Asegúrate de que esté en el mismo directorio que el archivo server.spec.js
import { describe } from 'node:test';

const server = app.listen();

afterAll(() => server.close()); 

describe('GET /api/products', () => {
    it('should return 200', async () => {
        const response = await request(app).get('/api/products');
        expect(response.statusCode).toBe(200);
    });

    it('should return an array', async () => {
        const response = await request(app).get('/api/products');
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.body.length).toBeGreaterThan(0);
    });
});
