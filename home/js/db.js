let db;

function openDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(CONFIG.dbName, 1)
    req.onupgradeneeded = () => {
      db = req.result
      if (!db.objectStoreNames.contains(CONFIG.storeName)) {
        db.createObjectStore(CONFIG.storeName, { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = () => {
      db = req.result
      resolve()
    }
  })
}

function saveFile(file) {
  return new Promise((resolve) => {
    const tx = db.transaction(CONFIG.storeName, 'readwrite')
    const store = tx.objectStore(CONFIG.storeName)
    store.add(file)
    tx.oncomplete = resolve
  })
}

function getFiles() {
  return new Promise((resolve) => {
    const tx = db.transaction(CONFIG.storeName, 'readonly')
    const store = tx.objectStore(CONFIG.storeName)
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
  })
}

function deleteFile(id) {
  return new Promise((resolve) => {
    const tx = db.transaction(CONFIG.storeName, 'readwrite')
    const store = tx.objectStore(CONFIG.storeName)
    store.delete(id)
    tx.oncomplete = resolve
  })
}