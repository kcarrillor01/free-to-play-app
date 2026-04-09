# TEMAS CLAVE

Este proyecto fue realizado con React, TypeScript, Bootstrap, Zustand y React-router, 
realizado por:

KEVIN FELIPE CARRILLO ROMERO
ALLAN SAMIR BARRETO ARTUNDUAGA

## Sistema de Autenticación

La aplicación incluye un sistema completo de autenticación con las siguientes características:

### Funcionalidades

- **Registro de usuarios**: Creación de nuevas cuentas con encriptamiento de contraseñas
- **Inicio de sesión**: Validación de credenciales con encriptamiento
- **Perfil de usuario**: Vista protegida con información del usuario autenticado
- **Rutas protegidas**: Sistema de protección de rutas basado en autenticación
- **Estado persistente**: Sesión persistente usando Zustand con localStorage

### Componentes

- `Login.tsx`: Formulario de inicio de sesión
- `Register.tsx`: Formulario de registro de usuarios
- `UserProfile.tsx`: Página de perfil de usuario protegida
- `ProtectedRoute.tsx`: Componente de protección de rutas

### Encriptamiento

- Utiliza un método básico de encriptamiento para demostración
- Las contraseñas se encriptan antes de almacenarlas
- Validación segura durante el inicio de sesión

### Flujo de Usuario

1. **Registro**: Usuario se registra en `/register`
2. **Login**: Inicia sesión en `/login`
3. **Acceso**: Redirección automática a `/profile`
4. **Navegación**: Navbar muestra información del usuario
5. **Logout**: Cierre de sesión desde Navbar o perfil

### Rutas

- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/profile` - Perfil de usuario (protegido)

### Estado de Autenticación

El estado se maneja con Zustand y persiste en localStorage:
- `isAuthenticated`: Estado de autenticación
- `user`: Información del usuario
- `token`: Token de sesión
- `usersRegistered`: Lista de usuarios registrados

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
