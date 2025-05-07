// src/components/List.js
import '../components/List.css';
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';
import Form from './Form';

const List = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
      setSelectedItem(null); // Limpa após salvar
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
    setSelectedItem(item);
  };

  return (
    <div className='listaCadastro'>
      <Form selectedItem={selectedItem} onSaved={loadItems} />
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
