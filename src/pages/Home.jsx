import { useState, useEffect } from 'react';
import CardProduto from '../components/CardProduto/CardProduto'; // Ajuste o caminho se necessário

// 1. RECEBA a prop 'adicionarAoCarrinho' aqui (que vem do App.jsx)
function Home({ adicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      try {
        // Mantive sua lógica de fetch e formatação que estava ótima
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        const produtosFormatados = data.products.map((p) => ({
          id: p.id,
          nome: p.title,
          preco: p.price * 5.5, // Conversão dólar
          imagem: p.thumbnail,
          categoria: p.category,
        }));

        setProdutos(produtosFormatados);
      } catch (erro) {
        console.error('Erro:', erro);
      } finally {
        setLoading(false);
      }
    }
    buscarDados();
  }, []);

  if (loading) return <p>Carregando Vitrine...</p>;

  return (
    <div className="produtos-grid">
      {produtos.map((produto) => (
        <CardProduto
          key={produto.id}
          produto={produto}
          // 2. REPASSE a função real para o Card (antes estava um alert fixo)
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      ))}
    </div>
  );
}

export default Home;
