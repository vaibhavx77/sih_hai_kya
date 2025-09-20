

import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import { useReports } from './ReportsContext';
import { getAllReports } from './services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from './Loader';

export default function MapViewScreen({ navigation }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show your position on the map.');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLoadingReports(true);
    getAllReports()
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to fetch reports from server.');
      })
      .finally(() => setLoadingReports(false));
  }, []);

  const handleFabPress = () => {
    navigation.navigate('CreateReport');
  };

  if (loading || loadingReports) {
    return <Loader message={loading ? 'Getting your location...' : 'Loading reports...'} />;
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          {reports.map((report) => (
            <Marker
              key={report._id}
              coordinate={report.location}
              title={report.description}
              onPress={() => setSelectedReport(report)}
            />
          ))}
        </MapView>
      )}
      <TouchableOpacity style={styles.fab} onPress={handleFabPress} activeOpacity={0.8}>
        <MaterialCommunityIcons name="plus" size={32} color="#fff" />
      </TouchableOpacity>
      <Modal visible={!!selectedReport} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Details</Text>
            <Text style={styles.modalText}>Description: {selectedReport?.description}</Text>
            <Text style={styles.modalText}>Status: {selectedReport?.status}</Text>
            <Text style={styles.modalText}>Location: {selectedReport?.location.latitude.toFixed(4)}, {selectedReport?.location.longitude.toFixed(4)}</Text>
            {selectedReport?.photoUrl && (
              <Image source={{ uri: selectedReport.photoUrl }} style={styles.modalImage} />
            )}
            <TouchableOpacity onPress={() => setSelectedReport(null)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  map: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#007bff',
    borderRadius: 32,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#222',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  modalImage: {
    width: 200,
    height: 150,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
