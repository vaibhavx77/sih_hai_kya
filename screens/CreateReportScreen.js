

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReports } from './ReportsContext';
import { createReport } from './services/api';
import Loader from './Loader';
import { AuthContext } from '../App.js';

export default function CreateReportScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const { reports, setReports } = useReports();

  const pickImage = async () => {
    setLoadingPhoto(true);
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log('Camera permission status:', status);
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera permission is required.');
      setLoadingPhoto(false);
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('Camera result:', result);
    setLoadingPhoto(false);
    if (!result.cancelled) {
      let photoUri = result.uri || (result.assets && result.assets[0] && result.assets[0].uri);
      setPhoto(photoUri);
      console.log('Photo URI set:', photoUri);
    } else {
      console.log('Camera cancelled');
    }
  };

  const getLocation = async () => {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Location permission status:', status);
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      setLoadingLocation(false);
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    console.log('Location result:', loc);
    setLocation(loc.coords);
    setLoadingLocation(false);
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Get userId and token from AuthContext
  const { user } = useContext(AuthContext);
  const userId = user?.userId;
  const token = user?.token;

  const handleSubmit = async () => {
    if (!photo || !description || !location) {
      Alert.alert('Missing info', 'Please add photo, description, and location.');
      console.log('Missing info:', { photo, description, location });
      return;
    }
    setLoadingSubmit(true);
    try {
      const reportData = {
        userId,
        photoUrl: photo, // In production, upload photo and use URL
        description,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        status: 'submitted',
      };
      console.log('Submitting report data:', reportData);
      const res = await createReport(reportData, token);
      console.log('API response:', res);
      if (res._id) {
        Alert.alert('Report submitted!', 'Your issue has been reported.');
        setPhoto(null);
        setDescription('');
        setLocation(null);
        navigation.navigate('MapView');
      } else {
        Alert.alert('Error', res.message || 'Failed to submit report.');
      }
    } catch (err) {
      console.log('Submit error:', err);
      Alert.alert('Error', 'Failed to submit report.');
    }
    setLoadingSubmit(false);
  };

  return (
    <View style={styles.container}>
      {(loadingSubmit || loadingPhoto || loadingLocation) && <Loader message={loadingSubmit ? 'Submitting report...' : loadingPhoto ? 'Picking photo...' : 'Detecting location...'} />}
      <View style={styles.card}>
        <Text style={styles.title}>Report a Civic Issue</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Photo</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={pickImage} activeOpacity={0.8}>
            <MaterialCommunityIcons name="camera-plus" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>Pick Photo</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={getLocation} activeOpacity={0.8}>
            <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>Detect Location</Text>
          </TouchableOpacity>
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

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8} disabled={loadingSubmit}>
          <MaterialCommunityIcons name="send" size={22} color="#fff" />
          <Text style={styles.submitBtnText}>{loadingSubmit ? 'Submitting...' : 'Submit Report'}</Text>
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

