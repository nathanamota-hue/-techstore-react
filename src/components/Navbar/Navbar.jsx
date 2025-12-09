import { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const styles = `
  /* Reset básico para evitar margens indesejadas */
  * {
    box-sizing: border-box;
  }

  .navbar {
    /* Layout e Tamanho Compacto */
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    
    /* Estilo "Glassmorphism" Moderno */
    background-color: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(8px);
    color: white;
    
    /* Fixação no topo */
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #333;
  }

  /* Logo Otimizada */
  .logo h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #646cff;
    letter-spacing: -0.5px;
    margin: 0; /* Remove a margem padrão que causava a barra gigante */
    line-height: 1;
    cursor: pointer;
    text-decoration: none;
  }
  
  .logo a {
    text-decoration: none;
  }

  /* Links de Navegação */
  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: #a1a1aa;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .nav-links a:hover {
    color: #646cff;
    text-shadow: 0 0 8px rgba(100, 108, 255, 0.4);
  }

  /* Área de Ações */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* Barra de Busca Animada */
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box input {
    padding: 0.5rem 1rem;
    height: 36px;
    border-radius: 99px;
    border: 1px solid #444;
    background-color: #27272a;
    color: white;
    font-size: 0.875rem;
    outline: none;
    width: 180px;
    transition: all 0.3s ease;
  }

  .search-box input:focus {
    width: 240px;
    border-color: #646cff;
    background-color: #18181b;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }

  .search-box input::placeholder {
    color: #71717a;
  }

  /* Botões de Ícone */
  .icon-btn {
    background: none;
    border: none;
    color: #e4e4e7;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background-color 0.2s, color 0.2s;
  }

  .icon-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #646cff;
  }

  /* Badge do Carrinho */
  .cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ef4444;
    color: white;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border: 2px solid #1a1a1a;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav-links, .search-box {
      display: none;
    }
    .navbar {
      padding: 0 1rem;
    }
  }
`;

function Navbar({ itensNoCarrinho = 0 }) {
  const [termoBusca, setTermoBusca] = useState('');

  const handleBusca = (e) => {
    setTermoBusca(e.target.value);
    console.log('Buscando por:', e.target.value);
  };

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        {/* 1. Logo */}
        <div className="logo">
          <Link to="/">
            <h1>TechStore</h1>
          </Link>
        </div>

        {/* 2. Links */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
        </ul>

        {/* 3. Ações */}
        <div className="nav-actions">
          {/* Barra de Busca */}
          <div className="search-box">
            <input
              type="text"
              placeholder="O que você procura?"
              value={termoBusca}
              onChange={handleBusca}
            />
          </div>

          {/* Ícone de Usuário */}
          <button className="icon-btn" title="Minha Conta">
            <User size={22} />
          </button>

          {/* Ícone de Carrinho */}
          <Link to="/carrinho" style={{ textDecoration: 'none' }}>
            <button className="icon-btn" title="Carrinho">
              <ShoppingCart size={22} />
              {itensNoCarrinho > 0 && (
                <span className="cart-badge">{itensNoCarrinho}</span>
              )}
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;