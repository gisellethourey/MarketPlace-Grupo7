import pool from '../config/db.js';

// Crear un nuevo usuario
export const createNewUser = async ({ username, email, password, phone_number, date_of_birth }) => {
  const query = `
    INSERT INTO users (username, email, password, phone_number, date_of_birth)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const values = [username, email, password, phone_number, date_of_birth];
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error creando usuario:', error);
    return { success: false, message: 'Error creando usuario' };
  }
};

// Obtener un usuario por email
export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  try {
    const result = await pool.query(query, [email]);
    return result.rows.length ? { success: true, data: result.rows[0] } : null;
  } catch (error) {
    console.error('Error obteniendo el usuario:', error);
    return { success: false, error: 'Error obteniendo el usuario' };
  }
};

// Actualizar un usuario
export const updateExistingUser = async (id, userData) => {
  const { username, email, password, phone_number, date_of_birth } = userData;
  const query = `
    UPDATE users
    SET name = $1, email = $2, password = $3, phone_number = $4, date_of_birth = $5
    WHERE id = $6 RETURNING *;
  `;
  const values = [username, email, password, phone_number, date_of_birth, id];
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return { success: false, message: 'Error actualizando usuario' };
  }
};

// Eliminar un usuario
export const deleteExistingUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING id;';
  try {
    const result = await pool.query(query, [id]);
    return result.rows.length ? true : false;
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return false;
  }
};
