import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Veiculo from './components/Veiculo';
import Sobre from './components/Sobre';
import './App.css';  

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Veiculo" element={<Veiculo />} />
          <Route path="/Sobre" element={<Sobre />} />
        </Routes>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Veiculo">Veiculo</Link>
            </li>
            <li>
              <Link to="/Sobre">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
