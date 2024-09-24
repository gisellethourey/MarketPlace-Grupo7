import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Form from './Form';
import InputField from './InputField';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateDateOfBirth = (dateOfBirth) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    return dateRegex.test(dateOfBirth);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !phoneNumber || !dateOfBirth || !password) {
      setError('Todos los campos son requeridos.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Formato de email inválido.');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Formato de número de teléfono inválido.');
      return;
    }
    if (!validateDateOfBirth(dateOfBirth)) {
      setError('Formato de fecha de nacimiento inválido. Usa dd/mm/yyyy.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone_number: phoneNumber, date_of_birth: dateOfBirth, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registro fallido. Por favor verifica tus datos e intenta de nuevo.');
      }

      const data = await response.json();
      if (data.token) {
        await register(data.token); // Asegúrate de que `register` maneje el token correctamente
        setError('');
        navigate('/productos');
      } else {
        throw new Error('No se recibió el token de autenticación.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="">
      <InputField type="text" placeholder="Nombre Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="text" placeholder="+569XXXXXXXX" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <InputField type="text" placeholder=" (dd/mm/yyyy)" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      <InputField type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
        type="submit"
        className="w-full rounded-full bg-red-600 p-3 text-white transition hover:bg-opacity-90"
      >
        Registrate
      </button>
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};

export default Register;