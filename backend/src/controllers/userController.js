import {
  createNewUser,
  findUserByEmail,
  updateExistingUser,
  deleteExistingUser
} from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Crear usuario
export const createUserController = async (req, res) => {
  const { username, email, password, phone_number, date_of_birth } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createNewUser({ username, email, password: hashedPassword, phone_number, date_of_birth });
    const token = jwt.sign({ id: result.data.id, email: result.data.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creando usuario', error: error.message });
  }
};

// Login usuario
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.data.password);
    if (!validPassword) {
      return res.status(403).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.data.id, email: user.data.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error durante el inicio de sesión', error: error.message });
  }
};

// Obtener perfil de usuario
export const getUserProfileController = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await findUserByEmail(email);
    if (!user || !user.success) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const { password, ...userData } = user.data; 
    res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
  }
};

// Actualizar usuario
export const updateUserController = async (req, res) => {
  const { id } = req.user;
  const { username, email, password, phone_number, date_of_birth } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updateData = {
      username,
      email,
      password: hashedPassword || undefined,
      phone_number,
      date_of_birth,
    };

    const result = await updateExistingUser(id, updateData);

    return res.status(200).json({
      message: 'Usuario actualizado exitosamente',
      user: result.data,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error actualizando usuario', error: error.message });
  }
};

// Eliminar usuario
export const deleteUserController = async (req, res) => {
  const { id } = req.user;

  try {
    const success = await deleteExistingUser(id);
    if (success) {
      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error eliminando usuario', error: error.message });
  }
};