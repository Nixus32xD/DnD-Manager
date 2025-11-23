import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Homepage';
import CharactersPage from './pages/CharactersPage';
import SpellsPage from './pages/SpellsPage';

// Placeholder para páginas que aún no creaste
const Placeholder = ({ title }) => (
  <div className="text-center py-20 text-slate-500 font-serif text-xl">
    🚧 {title} en construcción...
  </div>
);

function App() {
  return (
    <Routes>
      {/* El Layout envuelve a todas las rutas para mantener el menú fijo */}
      <Route path="/" element={<MainLayout />}>

        {/* Ruta Raíz (La Portada) */}
        <Route index element={<HomePage />} />

        {/* Rutas de Personajes */}
        <Route path="characters" element={<CharactersPage />} />
        <Route path="characters/create" element={<Placeholder title="Crear Personaje" />} />

        {/* Rutas de Conjuros */}
        <Route path="spells" element={< SpellsPage/>} />

        {/* Ruta 404 */}
        <Route path="*" element={<Placeholder title="404 - Página no encontrada" />} />

      </Route>
    </Routes>
  );
}

export default App;