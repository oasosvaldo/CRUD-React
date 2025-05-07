// src/components/Form.js
import '../components/Form.css';
import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../api';

const Form = ({ selectedItem, onSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Preenche o formulário ao selecionar um item para editar
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        email: selectedItem.email,
        phone: selectedItem.phone,
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        await updateItem(selectedItem.id, formData);
      } else {
        await createItem(formData);
      }
      setFormData({ name: '', email: '', phone: '' });
      onSaved(); // Atualiza lista
    } catch (error) {
      console.error('Erro ao salvar item:', error);
    }
  };

  return (
    <div className='formularioCadastro'>
      <form onSubmit={handleSubmit}>
        <h2>{selectedItem ? 'Editar Item' : 'Cadastrar Item'}</h2>
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
        <button type="submit">{selectedItem ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

    </div>
  );
};

export default Form;