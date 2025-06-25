// components/TelaInicial.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'; 

// Importe os componentes temáticos com o novo nome
import { ContainerTematico, TextoTematico } from '../components/ComponentesTematicos'; // ATUALIZADO
import { Colors } from '../theme'; 

export default function TelaInicial({ navigation }) { // ATUALIZADO
  return (
    <ContainerTematico style={styles.container}>
      <TextoTematico style={styles.title}>Sistema de Cadastro de Pacientes</TextoTematico>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <TextoTematico style={styles.buttonText}>Cadastrar Paciente</TextoTematico>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Alteracao')}
      >
        <TextoTematico style={styles.buttonText}>Alterar Cadastro de Paciente</TextoTematico>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={() => navigation.navigate('CadastroUsuario')}
      >
        <TextoTematico style={styles.buttonText}>Cadastrar Usuário</TextoTematico>
      </TouchableOpacity>
    </ContainerTematico>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primaryButton, 
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white, 
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: { 
    backgroundColor: Colors.secondaryButton, 
  }
});