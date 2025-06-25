// context/ContextoTema.js
import React, { createContext, useContext } from 'react';
import { Colors } from '../theme'; 

// Cria o contexto com as cores padrão
const ThemeContext = createContext(Colors);

// Provedor do tema que envolverá seu aplicativo
export const ProvedorTema = ({ children }) => { // ATUALIZADO
  const theme = Colors; 

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para acessar o tema em qualquer componente
export const useTema = () => useContext(ThemeContext); // ATUALIZADO