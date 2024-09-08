import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, deleteUser, updateUser } from '../model/userModel.js';

export const createUserController = async (req, res) => {
  const { username, email, phone_number, date_of_birth, password } = req.body;

  if (!username || !email || !phone_number || !date_of_birth || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser({
      username,
      email,
      phone_number,
      date_of_birth,
      password: hashedPassword
    });

    return res.status(201).json({
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      phone_number: result.data.phone_number
    });
  } catch (error) {
    console.error('Error creando el usuario:', error);
    return res.status(500).json({ message: 'Error creando el usuario' });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Datos invalidos' });
  }

  try {
    const result = await getUserByEmail(email);
    if (!result) {
      return res.status(401).json({ message: 'Credenciales invalidas' });
    }

    const user = result;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales invalidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: {
        status: 200,
        token: token,
        user: {
          id: user.id,
          email: user.email,
          phone_number: user.phone_number,
          picture: user.picture || 'https://via.placeholder.com/150'
        }
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error en el login' });
  }
};

// Controlador para logout
export const logoutUserController = (req, res) => {
    const { refresh_token } = req.body;
  
    if (!refresh_token) {
      return res.status(400).json({
        errors: {
          "400 Bad Request": "Invalid input"
        }
      });
    }
  
    try {
      jwt.verify(refresh_token, process.env.JWT_SECRET, (err) => {
        if (err) {
          return res.status(401).json({
            errors: {
              "401 Unauthorized": "Invalid token"
            }
          });
        }
  
        return res.status(200).json({
          success: {
            status: 200,
            message: 'Terminaste tu sesion'
          }
        });
      });
    } catch (error) {
      console.error('Error en el logout:', error);
      return res.status(500).json({ message: 'Error en el logout' });
    }
  };

  // delete usuario
  export const deleteUserController = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteUser(id);
      res.send("Se ha eliminado el post");
    } catch (error) {
      console.log("Error en el DELETE", { message: error.message });
    }
  };

  // update user
  export const updateUserController = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, phone_number, date_of_birth, password } = req.body;
      const result = await updateUser(id, username, email, phone_number, date_of_birth, password);

      res.send(result);
    } catch (error) {
      console.log("Error en el UPDATE", { message: error.message });
    }
  };
