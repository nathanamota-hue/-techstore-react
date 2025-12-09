import {Link} from 'react-router-dom';

function NotFound() {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Página Não Encontrada</h1>
        <p>Clique no botão para voltar para home</p>
        <hr />
        <Link to="/">
        <button>Home</button>
        </Link>
      </div>
    );
  }
  
  export default NotFound;
