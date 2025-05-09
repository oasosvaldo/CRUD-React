import React from 'react';
import '../components/List.css';

const List = ({ items, setItemToUpdate, onDelete }) => {
  return (
    <div className="listaCadastro">
      <h2>Lista de Itens Cadastrados</h2>
      {items.length === 0 ? (
        <p>Nenhum item encontrado.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>Nome:</strong> {item.name} <br />
              <strong>Email:</strong> {item.email} <br />
              <strong>Telefone:</strong> {item.phone} <br />
              <button onClick={() => setItemToUpdate(item)}>Editar</button>
              <button onClick={() => onDelete(item.id)}>Excluir</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
