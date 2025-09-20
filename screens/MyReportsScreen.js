

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useReports } from './ReportsContext';


export default function MyReportsScreen() {
  const { reports } = useReports();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reports</Text>
      <ScrollView style={styles.scrollView}>
        {reports.length === 0 ? (
          <Text style={styles.emptyText}>No reports submitted yet.</Text>
        ) : (
          reports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <Text style={styles.reportDescription}>{report.description}</Text>
              <Text style={styles.reportStatus}>Status: {report.status}</Text>
              <Text style={styles.reportDate}>Created: {new Date(report.createdAt).toLocaleString()}</Text>
              {report.location && (
                <Text style={styles.reportLocation}>Location: {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
    color: '#222',
  },
  scrollView: {
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 32,
  },
  reportCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportDescription: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  reportStatus: {
    color: '#007bff',
    marginBottom: 2,
    fontSize: 15,
  },
  reportDate: {
    color: '#555',
    fontSize: 13,
    marginBottom: 2,
  },
  reportLocation: {
    color: '#888',
    fontSize: 13,
  },
});
