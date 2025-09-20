

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReports } from './ReportsContext';

export default function CreateReportScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const { reports, setReports } = useReports();

  const pickImage = async () => {
    setLoadingPhoto(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setLoadingPhoto(false);
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const getLocation = async () => {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      setLoadingLocation(false);
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    setLoadingLocation(false);
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
      <View style={styles.card}>
        <Text style={styles.title}>Report a Civic Issue</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Photo</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={pickImage} activeOpacity={0.8}>
            <MaterialCommunityIcons name="camera-plus" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>Pick Photo</Text>
          </TouchableOpacity>
          {loadingPhoto && <ActivityIndicator size="small" color="#007bff" style={{ marginTop: 8 }} />}
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={getLocation} activeOpacity={0.8}>
            <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>Detect Location</Text>
          </TouchableOpacity>
          {loadingLocation && <ActivityIndicator size="small" color="#007bff" style={{ marginTop: 8 }} />}
          {location && (
            <Text style={styles.locationText}>Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <MaterialCommunityIcons name="send" size={22} color="#fff" />
          <Text style={styles.submitBtnText}>Submit Report</Text>
        </TouchableOpacity>
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
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 18,
    color: '#222',
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    color: '#007bff',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  image: {
    width: 220,
    height: 150,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  locationText: {
    marginTop: 8,
    color: '#555',
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

