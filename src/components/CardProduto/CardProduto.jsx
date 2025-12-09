import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import './CardProduto.css';
import { Link } from 'react-router-dom';
// REMOVA ESTA LINHA: import App from '../../App.jsx';

// Adicione 'adicionarAoCarrinho' na desestruturação das props
function CardProduto({ produto, adicionarAoCarrinho }) {
  const [favorito, setFavorito] = useState(false);

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  function mudarFavorito() {
    setFavorito(!favorito);
  }

  return (
    <div className="card">
      <div className="card-content">
        <Link to={`/produto/${produto.id}`}>
          <div className="card-img-wrapper">
            <img src={produto.imagem} alt={produto.nome} />
          </div>
          <span className="card-category">{produto.categoria}</span>
          <h3 className="card-title">{produto.nome}</h3>
          <p className="card-price">{precoFormatado}</p>
        </Link>

        <button
          className="btn-comprar"
          // USE A PROP DIRETAMENTE AQUI
          onClick={() => adicionarAoCarrinho(produto)}
        >
          <ShoppingBag size={18} />
          Adicionar
        </button>

        <button
          className="btn-favorito"
          onClick={mudarFavorito}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Heart
            size={25}
            color={favorito ? 'red' : 'gray'}
            fill={favorito ? 'red' : 'none'}
          />
        </button>
      </div>
    </div>
  );
}

export default CardProduto;
