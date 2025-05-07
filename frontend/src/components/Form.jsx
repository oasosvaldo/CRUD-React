import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../api';

const Form = ({ itemToUpdate, refreshList }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Preenche o formulário ao selecionar um item para editar
  useEffect(() => {
    if (itemToUpdate) {
      setFormData({
        name: itemToUpdate.name,
        email: itemToUpdate.email,
        phone: itemToUpdate.phone,
      });
    } else {
      setFormData({ name: '', email: '', phone: '' }); // Limpa quando não há item para editar
    }
  }, [itemToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToUpdate) {
        await updateItem(itemToUpdate.id, formData);
      } else {
        await createItem(formData);
      }
      refreshList(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao salvar item:', error);
    }
  };

  return (
    <div className='formularioCadastro'>
      <form onSubmit={handleSubmit}>
        <h2>{itemToUpdate ? 'Editar Item' : 'Cadastrar Item'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">{itemToUpdate ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
};

export default Form;
