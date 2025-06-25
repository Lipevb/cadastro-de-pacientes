// components/CadastroUsuarioScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';

// Importe os componentes temáticos com o novo nome
import { ContainerTematico, ViewTematica, TextoTematico } from '../components/ComponentesTematicos'; // ATUALIZADO
import { Colors } from '../theme'; 

export default function CadastroUsuarioScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const existingUsersResponse = await axios.get(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/users'
      );
      const existingUsers = existingUsersResponse.data;
      const userExists = existingUsers.some(user => user.username === username);

      if (userExists) {
        Alert.alert('Erro', 'Nome de usuário já existe. Por favor, escolha outro.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/users',
        {
          username,
          password
        }
      );
      
      setLoading(false);
      
      if (response.status === 201 || response.status === 200) {
        Alert.alert(
          'Sucesso', 
          'Usuário cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }] 
        );
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao cadastrar usuário. Tente novamente.');
      console.error('Erro ao cadastrar usuário:', error);
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
          <TextoTematico style={styles.title}>Cadastro de Novo Usuário</TextoTematico>
        </ViewTematica>
        
        <ViewTematica style={styles.form}>
          <TextoTematico style={styles.label}>Nome de Usuário</TextoTematico>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Escolha um nome de usuário"
            placeholderTextColor={Colors.text}
            autoCapitalize="none"
          />
          
          <TextoTematico style={styles.label}>Senha</TextoTematico>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Defina uma senha"
            placeholderTextColor={Colors.text}
            secureTextEntry 
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <TextoTematico style={styles.submitButtonText}>Cadastrar</TextoTematico>
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