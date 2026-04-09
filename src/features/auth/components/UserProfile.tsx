import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Navigate } from 'react-router';

const UserProfile: React.FC = () => {
  const { user, token, isAuthenticated, setIsAuthenticated, setUser, setToken } = useAuthStore();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Perfil de Usuario</h3>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '100px', height: '100px', fontSize: '36px' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <p className="form-control-plaintext">{user?.name}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email:</label>
                <p className="form-control-plaintext">{user?.email}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">ID de Usuario:</label>
                <p className="form-control-plaintext text-muted">{user?.id}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Token:</label>
                <p className="form-control-plaintext text-muted small">
                  {token?.substring(0, 20)}...
                </p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Estado:</label>
                <span className="badge bg-success">Autenticado</span>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
