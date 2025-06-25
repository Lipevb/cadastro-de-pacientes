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


import { ContainerTematico, ViewTematica, TextoTematico } from '../components/ComponentesTematicos'; // ATUALIZADO
import { Colors } from '../theme'; 

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  const validarCampos = () => {
    if (!nome || !cpf || !email || !telefone || !endereco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return false;
    }
    
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Use o formato: 000.000.000-00');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validarCampos()) return;
    
    setLoading(true);
    
    try {
      const existingPatientsResponse = await axios.get(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/Pacientes'
      );
      const existingPatients = existingPatientsResponse.data;
      const cpfExists = existingPatients.some(patient => patient.cpf === cpf);

      if (cpfExists) {
        Alert.alert(
          'Atenção', 
          'CPF já cadastrado, por favor verique se ele foi digitado corretamente.', 
          [{ text: 'OK' }]
        );
        setLoading(false); 
        return; 
      }

      const response = await axios.post(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/Pacientes',
        {
          nome,
          cpf,
          email,
          telefone,
          endereco
        }
      );
      
      setLoading(false);
      
      if (response.status === 201 || response.status === 200) {
        Alert.alert(
          'Sucesso', 
          'Paciente cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        setNome('');
        setCpf('');
        setEmail('');
        setTelefone('');
        setEndereco('');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao cadastrar paciente. Tente novamente.');
      console.error('Erro ao cadastrar:', error);
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
          <TextoTematico style={styles.title}>Cadastro de Paciente</TextoTematico>
        </ViewTematica>
        
        <ViewTematica style={styles.form}>
          <TextoTematico style={styles.label}>Nome</TextoTematico>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
            placeholderTextColor={Colors.text}
          />
          
          <TextoTematico style={styles.label}>CPF</TextoTematico>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            placeholderTextColor={Colors.text}
            keyboardType="numeric"
          />
          
          <TextoTematico style={styles.label}>Email</TextoTematico>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="exemplo@email.com"
            placeholderTextColor={Colors.text}
            keyboardType="email-address"
          />
          
          <TextoTematico style={styles.label}>Telefone</TextoTematico>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="(00) 00000-0000"
            placeholderTextColor={Colors.text}
            keyboardType="phone-pad"
          />
          
          <TextoTematico style={styles.label}>Endereço</TextoTematico>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Endereço completo"
            placeholderTextColor={Colors.text}
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <TextoTematico style={styles.submitButtonText}>Enviar</TextoTematico>
            )}
          </TouchableOpacity>
        </ViewTematica>
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
  form: {
    borderRadius: 10,
    padding: 20,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  submitButton: {
    backgroundColor: Colors.primaryButton,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});