
import React from 'react';
import './_loader.scss'; 

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__one"></div>
      <p className="loaderText" aria-live="polite">Chargement de la collection...</p>
    </div>
  );
};

export default Loader;