import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './LoginScreen.module.css';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Login Screen</Text>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Go to Map" onPress={() => navigation.navigate('MapView')} />
      <Button title="Create Report" onPress={() => navigation.navigate('CreateReport')} />
      <Button title="My Reports" onPress={() => navigation.navigate('MyReports')} />
    </View>
  );
}
