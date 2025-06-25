import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';


import { ContainerTematico, ViewTematica, TextoTematico } from '../components/ComponentesTematicos'; 
import { Colors } from '../theme'; 

export default function AlteracaoScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [paciente, setPaciente] = useState(null);

  const handleBuscar = async () => {
    if (!cpf) {
      Alert.alert('Erro', 'Por favor, informe o CPF do paciente');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.get(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/Pacientes'
      );
      
      const pacienteEncontrado = response.data.find(p => p.cpf === cpf);
      
      setLoading(false);
      
      if (pacienteEncontrado) {
        setPaciente(pacienteEncontrado);
      } else {
        Alert.alert('Aviso', 'Nenhum paciente encontrado com este CPF');
        setPaciente(null);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao buscar paciente. Tente novamente.');
      console.error('Erro ao buscar:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ContainerTematico style={styles.container}>
        <ViewTematica style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <TextoTematico style={styles.backButtonText}>← Voltar</TextoTematico>
          </TouchableOpacity>
          <TextoTematico style={styles.title}>Alterar Cadastro de Paciente</TextoTematico>
        </ViewTematica>
        
        <ViewTematica style={styles.searchContainer}>
          <TextoTematico style={styles.label}>CPF do Paciente</TextoTematico>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            placeholderTextColor={Colors.text}
            keyboardType="numeric"
          />
          
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleBuscar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <TextoTematico style={styles.searchButtonText}>Buscar</TextoTematico>
            )}
          </TouchableOpacity>
        </ViewTematica>
        
        {paciente && (
          <ViewTematica style={styles.resultContainer}>
            <TextoTematico style={styles.resultTitle}>Dados do Paciente</TextoTematico>
            
            <ViewTematica style={styles.tableRow}>
              <TextoTematico style={styles.tableCell}>Nome</TextoTematico>
              <TextoTematico style={styles.tableCell}>{paciente.nome}</TextoTematico>
            </ViewTematica>
            
            <ViewTematica style={styles.tableRow}>
              <TextoTematico style={styles.tableCell}>CPF</TextoTematico>
              <TextoTematico style={styles.tableCell}>{paciente.cpf}</TextoTematico>
            </ViewTematica>
            
            <ViewTematica style={styles.tableRow}>
              <TextoTematico style={styles.tableCell}>Email</TextoTematico>
              <TextoTematico style={styles.tableCell}>{paciente.email}</TextoTematico>
            </ViewTematica>
            
            <ViewTematica style={styles.tableRow}>
              <TextoTematico style={styles.tableCell}>Telefone</TextoTematico>
              <TextoTematico style={styles.tableCell}>{paciente.telefone}</TextoTematico>
            </ViewTematica>
            
            <ViewTematica style={styles.tableRow}>
              <TextoTematico style={styles.tableCell}>Endereço</TextoTematico>
              <TextoTematico style={styles.tableCell}>{paciente.endereco}</TextoTematico>
            </ViewTematica>
          </ViewTematica>
        )}
      </ContainerTematico>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primaryButton,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  searchContainer: {
    borderRadius: 10,
    padding: 20,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.text,
  },
  searchButton: {
    backgroundColor: Colors.primaryButton,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    borderRadius: 10,
    padding: 20,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },

  tableCell: {
    flex: 1,
    padding: 10,
  },
});