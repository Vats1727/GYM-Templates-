import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('dark');
  const [font, setFont] = useState('impact');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font', font);
  }, [font]);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} font={font} setFont={setFont} />
      <Home />
      <Footer />
    </>
  );
}

export default App;
