

import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import Loader from './Loader';
import { login } from './services/api';
import { AuthContext } from '../App.js';
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.token) {
        setUser({ userId: res.user.id, token: res.token });
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Login failed', res.message || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to login.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <Loader message="Logging in..." />}
      <Text style={styles.title}>Login</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 24,
    color: '#222',
  },
  formGroup: {
    width: '90%',
    marginBottom: 18,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    width: '90%',
    gap: 12,
  },
});
