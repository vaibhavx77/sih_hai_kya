

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Loader from './Loader';
export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs');
    }, 1200); // Simulate login delay
  };

  return (
    <View style={styles.container}>
      {loading && <Loader message="Logging in..." />}
      <Text style={styles.title}>Login Screen</Text>
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
  buttonGroup: {
    width: '90%',
    gap: 12,
  },
});
