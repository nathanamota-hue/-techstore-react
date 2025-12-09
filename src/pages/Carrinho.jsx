import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Frown } from 'lucide-react';

const styles = `
  .carrinho-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
    color: #e0e0e0;
    font-family: 'Inter', sans-serif;
  }

  .carrinho-titulo {
    font-size: 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* Layout de Grid: Lista vs Resumo */
  .carrinho-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  /* Lista de Itens */
  .lista-itens {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item-card {
    display: flex;
    align-items: center;
    background-color: #242424;
    padding: 1rem;
    border-radius: 8px;
    gap: 1rem;
    border: 1px solid #333;
    transition: transform 0.2s;
  }

  .item-card:hover {
    border-color: #646cff;
  }

  .item-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    background: #fff;
  }

  .item-info {
    flex: 1;
  }

  .item-nome {
    font-weight: bold;
    font-size: 1.1rem;
    color: #fff;
    margin-bottom: 0.2rem;
  }

  .item-cat {
    font-size: 0.8rem;
    color: #a1a1aa;
    text-transform: uppercase;
  }

  .item-preco {
    font-weight: bold;
    color: #646cff;
    margin-top: 0.5rem;
  }

  .btn-remover {
    background: transparent;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .btn-remover:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  /* Resumo do Pedido */
  .resumo-box {
    background-color: #2a2a2a;
    padding: 2rem;
    border-radius: 12px;
    position: sticky;
    top: 2rem;
    border: 1px solid #333;
  }

  .resumo-linha {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #d4d4d8;
  }

  .resumo-total {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #444;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }

  .btn-finalizar {
    width: 100%;
    background-color: #646cff;
    color: white;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background 0.2s;
  }

  .btn-finalizar:hover {
    background-color: #535bf2;
  }

  /* Empty State */
  .carrinho-vazio {
    text-align: center;
    padding: 4rem 0;
    color: #a1a1aa;
  }

  .btn-voltar {
    display: inline-block;
    margin-top: 1rem;
    color: #646cff;
    text-decoration: none;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .carrinho-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function Carrinho({ carrinho, removerDoCarrinho }) {
  // Calcula o total somando o preço de todos os itens
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className="carrinho-container">
      <style>{styles}</style>

      <h1 className="carrinho-titulo">
        <ShoppingBag size={32} />
        Meu Carrinho
      </h1>

      {carrinho.length === 0 ? (
        <div className="carrinho-vazio">
          <Frown size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h2>Seu carrinho está vazio</h2>
          <p>Que tal dar uma olhada nas nossas ofertas?</p>
          <Link to="/" className="btn-voltar">
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div className="carrinho-grid">
          {/* Esquerda: Lista de Itens */}
          <div className="lista-itens">
            {carrinho.map((item, index) => (
              <div key={index} className="item-card">
                <img src={item.imagem} alt={item.nome} className="item-img" />
                
                <div className="item-info">
                  <div className="item-nome">{item.nome}</div>
                  <div className="item-cat">{item.categoria}</div>
                  <div className="item-preco">{formatarPreco(item.preco)}</div>
                </div>

                <button 
                  className="btn-remover"
                  onClick={() => removerDoCarrinho(index)}
                  title="Remover item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Direita: Resumo */}
          <div className="resumo-box">
            <h3>Resumo do Pedido</h3>
            
            <div className="resumo-linha">
              <span>Subtotal ({carrinho.length} itens)</span>
              <span>{formatarPreco(total)}</span>
            </div>
            
            <div className="resumo-linha">
              <span>Frete</span>
              <span style={{ color: '#4ade80' }}>Grátis</span>
            </div>

            <div className="resumo-total">
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>

            <button 
              className="btn-finalizar"
              onClick={() => alert('Indo para o pagamento...')}
            >
              Finalizar Compra
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;

