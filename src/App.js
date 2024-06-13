import React from'react';
import './styles/main.scss';
import VinylCollection from './vinylCollection';
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
        <VinylCollection />
    </div>
  );
}

export default App;
