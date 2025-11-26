import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { MyPhoto } from '../viewmodel/photo';
import { PhotoItem } from './PhotoItem';

interface Props {
  photos: MyPhoto[];
  onNavigateToCamera: () => void;
}

export function PhotoListScreen({ photos, onNavigateToCamera }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateToCamera}>
          <Text style={styles.backButtonText}>⬅ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Fotos</Text>
      </View>

      <View style={styles.listSection}>
        <FlatList
          data={photos}
          keyExtractor={(item) => `${item.timestamp}-${item.uri}`}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <PhotoItem data={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma foto encontrada.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backButtonText: { color: '#007AFF', fontSize: 16 },
  listSection: { flex: 1, backgroundColor: '#f2f2f2' },
  listContent: { padding: 15 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
});