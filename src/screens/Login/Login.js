// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';

import api from '../../services/api';
import logo from '../../assets/logo/logo.png'

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('AUTH').then(async auth => {
      const oAuth = JSON.parse(auth)
      if (oAuth) {
        handlerLogin(oAuth.email, oAuth.password)
      }
    })
  }, [])

  async function handlerLogin(email, password) {
    try {
      const auth = { email, password }
      const { status, data } = await api.post('/login', { ...auth });

      if (status === 202) {
        Alert.alert('Atenção', data.message)
      }

      if (status === 200) {
        await AsyncStorage.setItem('AUTH', JSON.stringify(auth))
        AsyncStorage.setItem('TOKEN', data.token, async () => {
          navigation.navigate('Inicio', { user: data.user });
        })
      }

    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <Image style={styles.image} source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Seu e-mail..."
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        autoCorrect={false}
        style={styles.input}
        placeholder="Sua senha..."
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => handlerLogin(email, password)} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  image: {
    width: 300,
    height: 300,
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#624cab',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})