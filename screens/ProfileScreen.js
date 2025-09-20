
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../App';


export default function ProfileScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await setUser(null); // This will clear AsyncStorage in AuthProvider
    // Optionally, navigate to LoginScreen if using navigation
    // if (navigation) navigation.replace('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
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
