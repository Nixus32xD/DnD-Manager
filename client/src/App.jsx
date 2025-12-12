import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Homepage';

import SpellsPage from './pages/SpellsPage';
import RulesPage from './pages/RulesPage';
import FeatsPage from './pages/FeatsPage';
import ItemsPage from './pages/ItemsPage';
import BackgroundsPage from './pages/BackgroundsPage';
import SpeciesPage from './pages/SpeciesPage';
import ClassPage from './pages/ClassPage';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


import CharactersPage from './pages/CharactersPage';
import CreateCharacterPage from './pages/CreateCharactersPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';

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
        <Route path="characters/create" element={<CreateCharacterPage />} />
        <Route path="characters/:id" element={<CharacterDetailsPage />} />

        {/* Rutas de Reglas */}
        <Route path="rules" element={< RulesPage />} />

        {/* Rutas de Conjuros */}
        <Route path="rules/spells" element={< SpellsPage />} />
        {/* Rutas de Dotes */}
        <Route path="rules/feats" element={< FeatsPage />} />
        {/* Rutas de Obejtos y Equipo */}
        <Route path="rules/items" element={< ItemsPage />} />
        {/* Rutas de Transfondo */}
        <Route path="rules/backgrounds" element={< BackgroundsPage />} />
        {/* Rutas de Especies */}
        <Route path="rules/species" element={< SpeciesPage />} />
        {/* Rutas de Clases */}
        <Route path="rules/classes/:classId" element={< ClassPage />} />
        <Route path="rules/classes" element={< ClassPage />} />

        <Route path="/login" element={< LoginPage />} />
        <Route path="/register" element={< RegisterPage />} />

        {/* Ruta 404 */}
        <Route path="*" element={<Placeholder title="404 - Página no encontrada" />} />

      </Route>
    </Routes>
  );
}

export default App;