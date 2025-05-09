import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import { getItems, deleteItem } from './api'; // 👈 adicione deleteItem

const App = () => {
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [items, setItems] = useState([]);

  const refreshList = async () => {
    const itemsFromServer = await getItems();
    setItems(itemsFromServer);
    setItemToUpdate(null);
  };

  useEffect(() => {
    refreshList();
  }, []);

  // 👇 Função para excluir item
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este item?');
    if (!confirmDelete) return;
  
    try {
      await deleteItem(id);
      refreshList();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };
  

  return (
    <div>
      <h1>CRUD App</h1>
      <Form itemToUpdate={itemToUpdate} refreshList={refreshList} />
      <List
        items={items}
        setItemToUpdate={setItemToUpdate}
        onDelete={handleDelete} // 👈 Passa função de exclusão
      />
    </div>
  );
};

export default App;
