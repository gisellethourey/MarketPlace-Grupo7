import pool from '../config/db.js'; 

export const createUser = async (userData) => {
  const { username, email, phone_number, date_of_birth, password } = userData;

  const query = `
    INSERT INTO users (username, email, phone_number, date_of_birth, password)
    VALUES ($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5)
    RETURNING id, username, email, phone_number;
  `;

  const values = [username, email, phone_number, date_of_birth, password];
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return { success: false, message: 'Error al crear el usuario' };
  }
};

export const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return { success: false, message: 'Error al obtener el usuario' };
  }
};

export const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = $1`;
  const values = [id];
  
    const result = await pool.query(query, values);
    console.log('Error al eliminar el usuario:', error);
    return result;
  
  };

  export const updateUser = async (id, username, phone_number, password) => {
    try {
      const sql = "UPDATE users SET username = $1, phone_number = $2, password = $3 WHERE id = $4 RETURNING *";
      const values = [username, phone_number, password, id];
      const results = await pool.query(sql, values);
      if (results.rowCount > 0) {
        console.log('[UPDATE_USER]', results.rows[0]);
        return results.rows;
      }
    } catch (error) {
      console.log('error en archivo query.js', error.code, error.message);
    }
  }
