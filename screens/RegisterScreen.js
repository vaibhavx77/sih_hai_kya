
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      {/* Add registration form fields here as needed */}
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
});
