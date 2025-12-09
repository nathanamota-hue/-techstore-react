import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

// Estilos CSS integrados
const styles = `
  /* ... (MANTIVE SEUS ESTILOS INALTERADOS) ... */
  .produto-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; color: #e0e0e0; font-family: 'Inter', sans-serif; }
  .btn-voltar { display: inline-flex; align-items: center; gap: 0.5rem; color: #a1a1aa; text-decoration: none; margin-bottom: 2rem; transition: color 0.2s; }
  .btn-voltar:hover { color: #646cff; }
  .produto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background-color: #242424; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
  .galeria-container { display: flex; flex-direction: column; gap: 1rem; }
  .imagem-principal-wrapper { width: 100%; height: 400px; background-color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .imagem-principal { max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s ease; }
  .imagem-principal:hover { transform: scale(1.05); }
  .thumbnails-lista { display: flex; gap: 0.8rem; overflow-x: auto; padding-bottom: 0.5rem; }
  .thumb-btn { width: 70px; height: 70px; border: 2px solid transparent; border-radius: 6px; background-color: #fff; cursor: pointer; padding: 2px; transition: all 0.2s; }
  .thumb-btn.ativo { border-color: #646cff; opacity: 1; }
  .thumb-btn:hover { opacity: 0.8; }
  .thumb-img { width: 100%; height: 100%; object-fit: contain; }
  .info-container { display: flex; flex-direction: column; gap: 1.5rem; }
  .produto-marca { text-transform: uppercase; color: #646cff; font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; }
  .produto-titulo { font-size: 2rem; font-weight: 700; color: #fff; line-height: 1.1; margin: 0; }
  .avaliacao-box { display: flex; align-items: center; gap: 0.5rem; color: #fbbf24; }
  .nota-texto { color: #a1a1aa; font-size: 0.9rem; }
  .preco-box { background-color: #2a2a2a; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; }
  .preco-antigo { text-decoration: line-through; color: #71717a; font-size: 1rem; }
  .preco-atual { font-size: 2.5rem; font-weight: 800; color: #fff; display: block; }
  .parcelamento { display: block; margin-top: 0.5rem; color: #a1a1aa; font-size: 0.9rem; }
  .desconto-badge { background-color: #ef4444; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; vertical-align: middle; margin-left: 0.5rem; }
  .descricao { line-height: 1.6; color: #d4d4d8; }
  .btn-comprar { background-color: #646cff; color: white; border: none; padding: 1rem; font-size: 1.1rem; font-weight: 700; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: background-color 0.2s, transform 0.1s; width: 100%; margin-top: 1rem; }
  .btn-comprar:hover { background-color: #535bf2; }
  .btn-comprar:active { transform: scale(0.98); }
  .badges-confianca { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .badge-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background-color: #1f1f1f; border-radius: 6px; border: 1px solid #333; }
  .badge-texto strong { display: block; color: #fff; font-size: 0.9rem; }
  .badge-texto span { font-size: 0.8rem; color: #a1a1aa; }
  .loading-container, .erro-container { text-align: center; padding: 4rem; font-size: 1.2rem; color: #a1a1aa; }
  .erro-container { color: #ef4444; }
  @media (max-width: 768px) { .produto-grid { grid-template-columns: 1fr; padding: 1.5rem; } .imagem-principal-wrapper { height: 300px; } .produto-titulo { font-size: 1.5rem; } }
`;

// 1. RECEBENDO A PROP AQUI
function ProdutoDetalhe({ adicionarAoCarrinho }) {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState('');

  const safeId = id || '1';

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${safeId}`);

        if (!res.ok) throw new Error('Falha ao buscar produto');

        const data = await res.json();

        const produtoFormatado = {
          ...data,
          precoBrl: data.price * 5.5,
          precoAntigoBrl: data.price * 5.5 * 1.2,
          imagens: data.images || [data.thumbnail],
        };

        setProduto(produtoFormatado);
        setImagemAtiva(data.thumbnail);
      } catch (err) {
        setErro('Produto não encontrado ou erro na conexão.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
    window.scrollTo(0, 0);
  }, [safeId]);

  // Função auxiliar para padronizar o objeto antes de enviar pro carrinho
  const handleAdicionar = () => {
    const itemParaCarrinho = {
      id: produto.id,
      nome: produto.title, // Padronizando para 'nome'
      preco: produto.precoBrl, // Padronizando para o preço em Reais
      imagem: produto.thumbnail, // Padronizando para 'imagem'
      categoria: produto.category,
    };

    adicionarAoCarrinho(itemParaCarrinho);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-container">
          <p>Carregando detalhes do produto...</p>
        </div>
      </>
    );
  }

  if (erro || !produto) {
    return (
      <>
        <style>{styles}</style>
        <div className="erro-container">
          <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
          <h2>Ops! Algo deu errado.</h2>
          <p>{erro}</p>
          <Link
            to="/"
            className="btn-voltar"
            style={{ justifyContent: 'center', marginTop: '1rem' }}
          >
            Voltar para a loja
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="produto-container">
      <style>{styles}</style>

      <Link to="/" className="btn-voltar">
        <ArrowLeft size={20} />
        Voltar para a vitrine
      </Link>

      <div className="produto-grid">
        {/* COLUNA 1: Galeria */}
        <div className="galeria-container">
          <div className="imagem-principal-wrapper">
            <img
              src={imagemAtiva}
              alt={produto.title}
              className="imagem-principal"
            />
          </div>

          <div className="thumbnails-lista">
            {produto.imagens.map((img, index) => (
              <button
                key={index}
                className={`thumb-btn ${imagemAtiva === img ? 'ativo' : ''}`}
                onClick={() => setImagemAtiva(img)}
                onMouseEnter={() => setImagemAtiva(img)}
              >
                <img src={img} alt={`Vista ${index}`} className="thumb-img" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA 2: Informações */}
        <div className="info-container">
          <div>
            <span className="produto-marca">
              {produto.brand || produto.category}
            </span>
            <h1 className="produto-titulo">{produto.title}</h1>

            <div className="avaliacao-box">
              <Star fill="#fbbf24" stroke="none" size={20} />
              <span style={{ fontWeight: 'bold', color: 'white' }}>
                {produto.rating}
              </span>
              <span className="nota-texto">(128 avaliações)</span>
            </div>
          </div>

          <div className="preco-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="preco-antigo">
                {produto.precoAntigoBrl.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span className="desconto-badge">20% OFF</span>
            </div>

            <span className="preco-atual">
              {produto.precoBrl.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>

            <span className="parcelamento">
              em até 12x de{' '}
              {(produto.precoBrl / 12).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}{' '}
              sem juros
            </span>
          </div>

          <div className="descricao-box">
            <p className="descricao">{produto.description}</p>
          </div>

          {/* 2. BOTÃO COM A CHAMADA CORRETA */}
          <button className="btn-comprar" onClick={handleAdicionar}>
            <ShoppingCart size={24} />
            ADICIONAR AO CARRINHO
          </button>

          <div className="badges-confianca">
            <div className="badge-item">
              <Truck size={24} color="#646cff" />
              <div className="badge-texto">
                <strong>Frete Grátis</strong>
                <span>Para todo o Brasil</span>
              </div>
            </div>
            <div className="badge-item">
              <ShieldCheck size={24} color="#646cff" />
              <div className="badge-texto">
                <strong>Garantia Total</strong>
                <span>30 dias para devolução</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoDetalhe;

