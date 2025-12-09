import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import './App.css';

function App() {
  // 1. Estado Global do Carrinho (Array de objetos)
  const [carrinho, setCarrinho] = useState([]);

  // 2. Função para adicionar produtos
  const adicionarAoCarrinho = (produto) => {
    // Cria um novo array copiando o anterior (...) + o novo produto
    setCarrinho([...carrinho, produto]);
    alert(`Produto ${produto.nome} adicionado!`);
  };

const removerDoCarrinho = (indexParaRemover) => {
    const novoCarrinho = carrinho.filter((_, index) => index !== indexParaRemover);
    setCarrinho(novoCarrinho);
  };

  return (
    <BrowserRouter>
      {/* Navbar fica FORA das Routes para aparecer em todas as páginas */}
      <Navbar />

      <div className="container-principal">
        <Routes>
          {/* Caminho "/" carrega a Home */}
          <Route
            path="/"
            element={<Home adicionarAoCarrinho={adicionarAoCarrinho} />}
          />

          {/* Caminho "/carrinho" carrega o Carrinho */}
          <Route path="/carrinho" element={<Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho}/>} />

          <Route path="/sobre" element={<Sobre />} />

          <Route path="/contato" element={<Contato />} />

          {/* O :id é o segredo da rota dinâmica! */}
          <Route
            path="/produto/:id"
            element={
              <ProdutoDetalhe adicionarAoCarrinho={adicionarAoCarrinho} />
            }
          />

          {/* Rota de erro 404 (Opcional, mas legal de mostrar) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;