import request from 'supertest';
import app from '../../src/index.js'; // Asegúrate de que esté en el mismo directorio que el archivo server.spec.js


const server = app.listen();


  describe('Users API', () => {
    describe('GET /api/users', () => {
      it('debe devolver una lista de usuarios', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
    });
  
    describe('POST /api/user', () => {
      it('debe crear un nuevo usuario', async () => {
        const userData = { name: 'John Doe', email: 'johndoe@example.com' };
        const response = await request(app).post('/users').send(userData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
      });
    });
  
    describe('GET /api/users/:id', () => {
      it('debe devolver un usuario específico', async () => {
        const userId = 1;
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
      });
    });
  
    describe('PUT /api/user/:id', () => {
      it('debe actualizar un usuario específico', async () => {
        const userId = 1;
        const userData = { name: 'Jane Doe', email: 'janedoe@example.com' };
        const response = await request(app).put(`/users/${userId}`).send(userData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
      });
    });
  
    describe('DELETE /api/user/:id', () => {
      it('debe eliminar un usuario específico', async () => {
        const userId = 1;
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(204);
      });
    });
  });