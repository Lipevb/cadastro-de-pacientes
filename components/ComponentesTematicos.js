// components/ComponentesTematicos.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../context/ContextoTema'; // ATUALIZADO

// Componente para View com fundo temático (para containers)
export const ViewTematica = ({ style, children, ...rest }) => { // ATUALIZADO
  const theme = useTema(); // ATUALIZADO
  return (
    <View style={[{ backgroundColor: theme.cardBackground }, style]} {...rest}>
      {children}
    </View>
  );
};

// Componente para View que preenche a tela com fundo temático (para telas completas)
export const ContainerTematico = ({ style, children, ...rest }) => { // ATUALIZADO
  const theme = useTema(); // ATUALIZADO
  return (
    <View style={[{ flex: 1, backgroundColor: theme.background }, style]} {...rest}>
      {children}
    </View>
  );
};

// Componente para Text com cor de texto temático
export const TextoTematico = ({ style, children, ...rest }) => { // ATUALIZADO
  const theme = useTema(); // ATUALIZADO
  return (
    <Text style={[{ color: theme.text }, style]} {...rest}>
      {children}
    </Text>
  );
};