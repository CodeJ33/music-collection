import React, { useState, useEffect, useRef } from 'react';
import './styles/main.scss';
import VinylCollection from './components/VinylCollection/vinylCollection';
import Header from './components/Header/Header';
import discogsService from "./services/discogsService";

function App() {
  const [username, setUsername] = useState('');
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  
  const errorRef = useRef(null);

  const changeUser = (event) => {
    const value = event.target.value;
    setUsername(value);

  
    if (value === '') {
      setCollection([]);
      setPage(1);
      setTotalPages(1);
    }
  };

  const getCollection = async (username, page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await discogsService.getCollection(username, page);
      setCollection(data.releases);
      setTotalPages(Math.ceil(data.pagination.items / data.pagination.per_page));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    getCollection(username, 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      getCollection(username, newPage);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      getCollection(username, newPage);
    }
  };

  
  useEffect(() => {
    if (error && errorRef.current) {
      setTimeout(() => {
        errorRef.current?.focus();
      }, 100);
    }
  }, [error]);

  return (
    <div className="App">
      <Header 
        username={username}
        changeUser={changeUser}
        handleSubmit={handleSubmit}
        loading={loading}
        hasCollection={collection.length > 0}
        headerClass={username === '' ? 'header-large' : 'header-small'} 
      />

      {error && (
        <div 
          ref={errorRef} 
          role="alert" 
          tabIndex="-1" 
          style={{
            color: 'red',
            backgroundColor: '#fdd',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid red',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <p>Erreur: {error.message || "Une erreur inconnue est survenue."}</p>
        </div>
      )}

      <VinylCollection 
        collection={collection}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default App;
