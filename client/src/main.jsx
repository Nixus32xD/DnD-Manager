import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Importamos Router
import { AuthProvider } from './context/AuthContext' // 2. Importamos tu Contexto de Auth
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* El Router va primero (o segundo, el orden entre estos dos no es crítico, 
        pero es buena práctica que el Auth pueda usar hooks de navegación si lo necesita) */}
    <BrowserRouter>
      
      {/* El AuthProvider va ADENTRO del Router o envolviéndolo. 
          Si el AuthProvider usa 'useNavigate', tiene que estar ADENTRO del BrowserRouter.
          En nuestro caso simple, el orden estándar es este: */}
      
      <AuthProvider>
        <App />
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>,
)