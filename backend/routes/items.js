const express = require('express');
const router = express.Router();
const fs = require('fs');

const readFile = () => {
    const content = fs.readFileSync('./data/items.json', 'utf-8');
    return JSON.parse(content);
};

const writeFile = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./data/items.json', updateFile, 'utf-8');
};

// Rota para listar itens
router.get('/', (req, res) => {
    const content = readFile();
    res.json(content);
});

// Rota para criar um novo item
router.post('/', (req, res) => {
    const { name, email, phone } = req.body;
    const currentContent = readFile();
    const id = Math.random().toString(32).substring(2, 9);
    currentContent.push({ id, name, email, phone });
    writeFile(currentContent);
    res.json({ id, name, email, phone });
});

// Rota para atualizar um item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const currentContent = readFile();
    const selectItem = currentContent.findIndex(item => item.id === id);

    if (selectItem === -1) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    const { id: cId, name: cName, email: cEmail, phone: cPhone } = currentContent[selectItem];
    const newObject = {
        id: cId,
        name: name || cName,
        email: email || cEmail,
        phone: phone || cPhone,
    };

    currentContent[selectItem] = newObject;
    writeFile(currentContent);
    res.json(newObject);
});

// Rota para excluir um item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const currentContent = readFile();
    const selectItem = currentContent.findIndex(item => item.id === id);

    if (selectItem === -1) {
        return res.status(404).json({ error: 'ID não encontrado' });
    }

    currentContent.splice(selectItem, 1);
    writeFile(currentContent);
    res.json({ message: 'Item excluído com sucesso!' });
});

module.exports = router;
