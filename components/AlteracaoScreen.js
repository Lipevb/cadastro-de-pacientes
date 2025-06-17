import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

export default function AlteracaoScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [paciente, setPaciente] = useState(null);

  const handleBuscar = async () => {
    if (!cpf) {
      alert('Por favor, informe o CPF do paciente');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.get(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/Pacientes'
      );
      
      // Filtrando pelo CPF informado
      const pacienteEncontrado = response.data.find(p => p.cpf === cpf);
      
      setLoading(false);
      
      if (pacienteEncontrado) {
        setPaciente(pacienteEncontrado);
      } else {
        alert('Nenhum paciente encontrado com este CPF');
        setPaciente(null);
      }
    } catch (error) {
      setLoading(false);
      alert('Falha ao buscar paciente. Tente novamente.');
      console.error('Erro ao buscar:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Alterar Cadastro de Paciente</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Text style={styles.label}>CPF do Paciente</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            keyboardType="numeric"
          />
          
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleBuscar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {paciente && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Dados do Paciente</Text>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Campo</Text>
              <Text style={styles.tableHeader}>Valor</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Nome</Text>
              <Text style={styles.tableCell}>{paciente.nome}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>CPF</Text>
              <Text style={styles.tableCell}>{paciente.cpf}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Email</Text>
              <Text style={styles.tableCell}>{paciente.email}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Telefone</Text>
              <Text style={styles.tableCell}>{paciente.telefone}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Endereço</Text>
              <Text style={styles.tableCell}>{paciente.endereco}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4a90e2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
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
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
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
    borderBottomColor: '#eee',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});