//Aca tuvimos un problema, ya que el proyecto lo hicimos con imports, por lo que jest no nos corre, buscamos como solucionarlo pero no hubo manera
//se dejan igual los test escritos para poder revisarlos en clase
import request from 'supertest';
import app from '../../index'; 

describe('Product API', () => {
  let token;

  beforeAll(async () => {
    
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });
    token = response.body.token;
  });

  it('debería crear un nuevo producto', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'Electronics',
        name: 'Smartphone',
        description: 'A new smartphone',
        image: 'image_url',
        price: 699
      });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('debería obtener un producto por ID', async () => {
    const response = await request(app)
      .get('/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('debería actualizar un producto', async () => {
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'Electronics',
        name: 'Updated Smartphone',
        description: 'An updated smartphone',
        image: 'updated_image_url',
        price: 799
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('debería eliminar un producto', async () => {
    const response = await request(app)
      .delete('/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('debería devolver 404 para un producto inexistente', async () => {
    const response = await request(app)
      .get('/products/9999')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});