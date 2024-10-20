import React, { createContext, useState, useEffect, useContext } from 'react';

const IndexedDBContext = createContext();

export const IndexedDBProvider = ({ children, dbName, storeName }) => {
    const [db, setDb] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const openRequest = indexedDB.open(dbName, 1);

        openRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        };

        openRequest.onsuccess = (event) => {
            const database = event.target.result;
            setDb(database);
            fetchData(database);
        };

        openRequest.onerror = () => {
            console.error('Error opening IndexedDB');
        };
    }, [dbName, storeName]);

    const fetchData = (database) => {
        const transaction = database.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => {
            console.log(request.result)
            setTasks(request.result); 
        };
    };

    const addData = (data) => {
        if (!db) return;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        request.onsuccess = () => {
            fetchData(db);
        };
    };

    const updateData = (id, updatedData) => {
        if (!db) return;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                const updatedRecord = { ...data, ...updatedData };
                const updateRequest = store.put(updatedRecord);

                updateRequest.onsuccess = () => {
                    fetchData(db);
                };
            }
        };

        getRequest.onerror = () => {
            console.error('Error updating data');
        };
    };

    const deleteData = (id) => {
        if (!db) return;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => {
            fetchData(db);
        };
    };

    return (
        <IndexedDBContext.Provider value={{ tasks, addData, updateData, deleteData }}>
            {children}
        </IndexedDBContext.Provider>
    );
};

export const useIndexedDBContext = () => useContext(IndexedDBContext);
