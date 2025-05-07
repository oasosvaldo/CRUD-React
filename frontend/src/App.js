import React, { useState } from 'react';
import Form from './components/Form';
import List from './components/List';

const App = () => {
    const [itemToUpdate, setItemToUpdate] = useState(null);

    const refreshList = () => {
        setItemToUpdate(null);
    };

    return (
        <>
        <div>
            <h1>CRUD App</h1>
            <Form itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} refreshList={refreshList} />
            <List setItemToUpdate={setItemToUpdate} />
        </div>
        
        </>
    );
};

export default App;
