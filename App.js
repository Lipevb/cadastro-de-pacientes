// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe o ProvedorTema e o MeuTemaNavegacao
import { ProvedorTema } from './context/ContextoTema'; // ATUALIZADO
import { MeuTemaNavegacao } from './theme/TemaNavegacao'; // ATUALIZADO

// Importe todas as suas telas com os novos nomes
import TelaLogin from './components/TelaLogin'; // ATUALIZADO
import TelaInicial from './components/TelaInicial'; // ATUALIZADO
import CadastroScreen from './components/CadastroScreen';
import AlteracaoScreen from './components/AlteracaoScreen';
import CadastroUsuarioScreen from './components/CadastroUsuarioScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProvedorTema>
      <NavigationContainer theme={MeuTemaNavegacao}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Home" component={TelaInicial} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Alteracao" component={AlteracaoScreen} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProvedorTema>
  );
}