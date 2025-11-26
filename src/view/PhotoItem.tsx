import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MyPhoto } from '../viewmodel/photo';

interface Props {
  data: MyPhoto;
}

export function PhotoItem({ data }: Props) {
  return (
    <View style={styles.itemRow}>
      <Image source={{ uri: data.uri }} style={styles.thumb} />
      <View style={styles.itemTextBlock}>
        <Text style={styles.itemTitle}>
          {new Date(data.timestamp).toLocaleTimeString()}
        </Text>
        <Text style={styles.itemDate}>
          {new Date(data.timestamp).toLocaleDateString()}
        </Text>
        <Text style={styles.itemCoords}>
          {data.latitude != null && data.longitude != null
            ? `Lat: ${data.latitude.toFixed(5)}\nLon: ${data.longitude.toFixed(5)}`
            : 'Sem GPS'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 14,
  },
  itemTextBlock: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemDate: { fontSize: 12, color: '#888', marginBottom: 4 },
  itemCoords: { fontSize: 12, color: '#555' },
});