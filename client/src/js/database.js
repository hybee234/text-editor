import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {        
        upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
            console.log('JATE database already exists');
            return;
        }
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('JATE database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('PUT to the database');
    const jate = await openDB('jate', 1);
    const tx = jate.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({ id: 1, jate: content });
    console.log('IndexDB Updated:', content);
    
};

// TODO: Add logic for a method that gets all the content from the database
// Only the value needs to be returned to editor.js (ID isn't required)
export const getDb = async () => {
    console.log('GET all from IndexDB');
    const jate = await openDB('jate', 1);
    const tx = jate.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    // console.log (result.value)    
    return result.value;
};

initdb();
