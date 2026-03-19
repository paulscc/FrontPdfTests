import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Generator from './pages/Generator';
import Documents from './pages/Documents';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">Docs Inteligentes</div>
          <div className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Generador
            </NavLink>
            <NavLink 
              to="/documents" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Registros
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
