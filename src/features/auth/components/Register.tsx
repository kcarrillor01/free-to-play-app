import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { hashPassword } from '../../../shared/utils/crypto';
import type { RegisterData } from '../../types';
import { useNavigate } from 'react-router';

const Register: React.FC = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { usersRegistered, setUsersRegistered } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const existingUser = usersRegistered.find(u => u.email === formData.email);
      
      if (existingUser) {
        setError('El email ya está registrado');
        return;
      }

      const hashedPassword = hashPassword(formData.password);
      
      const newUser: RegisterData = {
        name: formData.name,
        email: formData.email,
        password: hashedPassword
      };

      const updatedUsers = [...usersRegistered, newUser];
      setUsersRegistered(updatedUsers);

      setSuccess('Usuario registrado exitosamente');
      
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Registrarse</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <div className="form-text">
                    Mínimo 6 caracteres
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Registrarse'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
