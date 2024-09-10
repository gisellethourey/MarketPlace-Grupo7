import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  deleteUser,
  updateUser,
} from "../model/userModel.js";

export const createUserController = async (req, res) => {
  const { username, email, phone_number, date_of_birth, password } = req.body;

  if (!username || !email || !phone_number || !date_of_birth || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser({
      username,
      email,
      phone_number,
      date_of_birth,
      password: hashedPassword,
    });

    return res.status(201).json({
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      phone_number: result.data.phone_number,
    });
  } catch (error) {
    console.error("Error creando el usuario:", error);
    return res.status(500).json({ message: "Error creando el usuario" });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Datos invalidos" });
  }

  try {
    const result = await getUserByEmail(email);
    if (!result) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const user = result;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      success: {
        status: 200,
        token: token,
        user: {
          id: user.id,
          email: user.email,
          phone_number: user.phone_number,
          picture: user.picture || "https://via.placeholder.com/150",
        },
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error en el login" });
  }
};


export const logoutUserController = (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({
      errors: {
        "400 Bad Request": "Invalid input",
      },
    });
  }

  try {
    jwt.verify(refresh_token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({
          errors: {
            "401 Unauthorized": "Invalid token",
          },
        });
      }

      return res.status(200).json({
        success: {
          status: 200,
          message: "Terminaste tu sesion",
        },
      });
    });
  } catch (error) {
    console.error("Error en el logout:", error);
    return res.status(500).json({ message: "Error en el logout" });
  }
};


export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error en el DELETE:', error);
    return res.status(500).json({ message: 'Error eliminando el usuario' });
  }
};


export const updateUserController = async (req, res) => {
  const user_id= req.user.id;
  const user_email = req.user.email;
  if (!user_id) {
    return res.status(400).json({ message: 'Usuario no autenticado' });
  }

  try {
 
  const { id } = req.params;
  const { username, phone_number, password } = req.body;

  if (!username || !phone_number || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos, excepto email y fecha de nacimiento' });
  }

  
  if (parseInt(id) !== parseInt(user_id)) {
    return res.status(401).json({ message: 'No tienes permiso para actualizar este usuario'});
  }


    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await updateUser(id, username, phone_number, hashedPassword);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en el UPDATE:', error);
    return res.status(500).json({ message: 'Error actualizando el usuario' });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const userEmail = req.user.email; 
    const user = await getUserByEmail(userEmail)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario:', error);
    res.status(500).json({ message: 'Error obteniendo el perfil del usuario' });
  }
};
