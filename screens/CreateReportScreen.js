
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import styles from './CreateReportScreen.module.css';
import { useReports } from './ReportsContext';

export default function CreateReportScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const { reports, setReports } = useReports();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const handleSubmit = () => {
    if (!photo || !description || !location) {
      Alert.alert('Missing info', 'Please add photo, description, and location.');
      return;
    }
    const newReport = {
      id: Date.now(),
      photo,
      description,
      location,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    setReports([...reports, newReport]);
    Alert.alert('Report submitted!', 'Your issue has been reported.');
    setPhoto(null);
    setDescription('');
    setLocation(null);
    navigation.navigate('MapView');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Report a Civic Issue</Text>
      <Button title="Pick Photo" onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 150, margin: 10 }} />}
      <Button title="Detect Location" onPress={getLocation} />
      {location && (
        <Text>Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</Text>
      )}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, margin: 10, width: '80%' }}
        placeholder="Describe the issue..."
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit Report" onPress={handleSubmit} />
    </View>
  );
}
