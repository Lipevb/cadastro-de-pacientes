// components/TelaLogin.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  Image 
} from 'react-native';
import axios from 'axios';

// Importe os componentes temáticos com o novo nome
import { ContainerTematico, ViewTematica, TextoTematico } from '../components/ComponentesTematicos'; // ATUALIZADO
import { Colors } from '../theme'; 

export default function TelaLogin({ navigation }) { // ATUALIZADO
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        'https://6851e5138612b47a2c0b8562.mockapi.io/api/cp/users'
      );
      
      const users = response.data;
      const userFound = users.find(
        user => user.username === username && user.password === password
      );

      if (userFound) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao conectar com o servidor. Tente novamente.');
      console.error('Erro de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerTematico style={styles.container}>
      <Image 
        source={require('../assets/logo3.png')} 
        style={styles.logo} 
      />
      
      <ViewTematica style={styles.form}>
        <TextoTematico style={styles.label}>Usuário</TextoTematico>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu usuário"
          placeholderTextColor={Colors.text} 
          autoCapitalize="none"
        />
        
        <TextoTematico style={styles.label}>Senha</TextoTematico>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          placeholderTextColor={Colors.text} 
          secureTextEntry 
        />
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <TextoTematico style={styles.loginButtonText}>Entrar</TextoTematico>
          )}
        </TouchableOpacity>
      </ViewTematica>
    </ContainerTematico>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: { 
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
    marginBottom: 40, 
  },
  form: {
    width: '100%',
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
  loginButton: {
    backgroundColor: Colors.primaryButton, 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: Colors.white, 
    fontSize: 18,
    fontWeight: 'bold',
  },
});