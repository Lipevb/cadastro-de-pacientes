// theme/TemaNavegacao.js
import { DarkTheme } from '@react-navigation/native';
import { Colors } from './index'; 

export const MeuTemaNavegacao = { // ATUALIZADO
  ...DarkTheme, 
  colors: {
    ...DarkTheme.colors,
    primary: Colors.text,       
    background: Colors.background, 
    card: Colors.cardBackground,    
    text: Colors.text,          
    border: Colors.inputBorder,  
    notification: Colors.text,  
  },
};