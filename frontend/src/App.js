import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import { getItems } from './api'; // Para pegar a lista de itens

const App = () => {
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [items, setItems] = useState([]);

  // Função para atualizar a lista de itens após salvar/editar um item
  const refreshList = async () => {
    const itemsFromServer = await getItems();
    setItems(itemsFromServer);
    setItemToUpdate(null); // Limpa o item que estava sendo editado
  };

  // Carregar a lista de itens ao iniciar o app
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div>
      <h1>CRUD App</h1>
      
      {/* Formulário de cadastro/edição */}
      <Form itemToUpdate={itemToUpdate} refreshList={refreshList} />

      {/* Lista de itens */}
      <List items={items} setItemToUpdate={setItemToUpdate} />
    </div>
  );
};

export default App;
