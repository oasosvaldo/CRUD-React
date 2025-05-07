// src/components/List.js
import '../components/List.css';
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';

const List = ({ setItemToUpdate }) => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      loadItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleEdit = (item) => {
    setItemToUpdate(item); // Passa o item para o App.js
  };

  return (
    <div className='listaCadastro'>
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
              <button onClick={() => handleEdit(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Excluir</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
