
import React, { useState } from 'react';
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './MapViewScreen.module.css';
import { useReports } from './ReportsContext';

export default function MapViewScreen() {
  const [selectedReport, setSelectedReport] = useState(null);
  const { reports } = useReports();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={report.location}
            title={report.description}
            onPress={() => setSelectedReport(report)}
          />
        ))}
      </MapView>
      <Modal visible={!!selectedReport} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Report Details</Text>
            <Text>Description: {selectedReport?.description}</Text>
            <Text>Status: {selectedReport?.status}</Text>
            <Text>Location: {selectedReport?.location.latitude.toFixed(4)}, {selectedReport?.location.longitude.toFixed(4)}</Text>
            {selectedReport?.photo && (
              <Image source={{ uri: selectedReport.photo }} style={{ width: 200, height: 150, marginVertical: 10 }} />
            )}
            <TouchableOpacity onPress={() => setSelectedReport(null)} style={{ marginTop: 10 }}>
              <Text style={{ color: 'blue' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
