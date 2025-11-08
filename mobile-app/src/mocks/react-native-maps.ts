// Mock for react-native-maps on web platform
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MapViewProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  children?: React.ReactNode;
}

const MapView: React.FC<MapViewProps> = ({ style, initialRegion, children }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>🗺️ Map View</Text>
        <Text style={styles.coordinates}>
          {initialRegion && (
            <>
              Lat: {initialRegion.latitude.toFixed(4)}, 
              Lng: {initialRegion.longitude.toFixed(4)}
            </>
          )}
        </Text>
        <Text style={styles.note}>
          Map view is available on native platforms
        </Text>
      </View>
      {children}
    </View>
  );
};

interface MarkerProps {
  coordinate?: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  children?: React.ReactNode;
}

const Marker: React.FC<MarkerProps> = ({ coordinate, title, children }) => {
  return (
    <View style={styles.marker}>
      <Text style={styles.markerText}>📍 {title || 'Marker'}</Text>
      {coordinate && (
        <Text style={styles.markerCoords}>
          {coordinate.latitude.toFixed(4)}, {coordinate.longitude.toFixed(4)}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  placeholder: {
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 24,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  marker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  markerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  markerCoords: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
});

export default MapView;
export { Marker };

