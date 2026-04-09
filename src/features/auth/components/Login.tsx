import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { hashPassword } from '../../../shared/utils/crypto';
import type { LoginData } from '../../types';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { usersRegistered, setIsAuthenticated, setUser, setToken } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = usersRegistered.find(u => u.email === formData.email);
      
      if (!user) {
        setError('Usuario no encontrado');
        return;
      }

      const hashedPassword = hashPassword(formData.password);
      
      if (user.password !== hashedPassword) {
        setError('Contraseña incorrecta');
        return;
      }

      // Login exitoso
      const token = btoa(user.email + Date.now());
      setToken(token);
      setUser({
        id: user.email,
        name: user.name,
        email: user.email
      });
      setIsAuthenticated(true);
      
      alert('Login exitoso');
      navigate('/profile');
    } catch (err) {
      setError('Error al iniciar sesión');
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
              <h3 className="text-center">Iniciar Sesión</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
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
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </form>
              
              <div className="text-center mt-3">
                <span className="text-muted">¿No tienes cuenta? </span>
                <Link 
                  to="/register" 
                  className="text-decoration-none fw-semibold"
                >
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
