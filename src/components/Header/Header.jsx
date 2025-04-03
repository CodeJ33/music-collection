import React, { useEffect, useState } from "react";

const Header = ({ username, changeUser, handleSubmit, loading, hasCollection }) => {
  const [headerHeight, setHeaderHeight] = useState("100vh");
  const [inputError, setInputError] = useState(false); 

  useEffect(() => {
    if (loading) {
      setHeaderHeight("100vh");
    } else if (hasCollection) {
      setHeaderHeight("70vh");
    } else {
      setHeaderHeight("100vh");
    }
  }, [loading, hasCollection]);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);
    handleSubmit(event);
  };

  return (
    <header className="headerContainer" style={{ height: headerHeight }}>
      <h1 className="headerContainer__title">BROWSE YOUR COLLECTION</h1>

      <form onSubmit={handleFormSubmit} className="searchForm">
        <label className="searchForm__label">
          <p className="searchForm__label__p">Discogs Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              changeUser(e);
              setInputError(false); 
            }}
            className={`searchForm__input ${inputError ? "input-error" : ""}`}
          />
        </label>
        <button type="submit" className="searchForm__button">
          Search
        </button>
      </form>

      
      {inputError && <p className="error-message">Veuillez entrer un nom d'utilisateur</p>}
    </header>
  );
};

export default Header;
