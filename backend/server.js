const express = require('express');
const path = require('path');
const itemsRoutes = require('./routes/items');
const cors = require('cors');
//const fs = require('fs');

const server = express();

server.use(express.json());

// ✅ ATIVE O CORS AQUI
server.use(cors());

// Middleware JSON
server.use(express.json({ extended: true }));

// Roteamento das requisições de CRUD
server.use('/api/items', itemsRoutes);

// Serve arquivos estáticos do frontend (React)
server.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve a aplicação frontend
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

server.listen(5000, () => {
  console.log('Backend rodando na porta 5000');
});
