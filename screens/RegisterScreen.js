
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Loader from './Loader';
import { register } from './services/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'Please enter all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await register(name, email, password);
      if (res.message && res.message.includes('success')) {
        Alert.alert('Success', 'Registration successful! Please login.');
        navigation.replace('Login');
      } else {
        Alert.alert('Registration failed', res.message || 'Error registering user');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to register.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <Loader message="Registering..." />}
      <Text style={styles.title}>Register</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <Button title="Register" onPress={handleRegister} />
        <Button title="Go to Login" onPress={() => navigation.replace('Login')} />
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
    color: '#222',
    marginBottom: 16,
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
