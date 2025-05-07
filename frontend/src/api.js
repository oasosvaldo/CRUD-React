import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';
  // API do backend

export const getItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar itens:', (error));
    }
};

export const createItem = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar item:', error);
    }
};

export const updateItem = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir item:', error);
    }
};
