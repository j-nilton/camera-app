import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { CameraScreen } from './src/view/CameraScreen';
import { PhotoListScreen } from './src/view/PhotoListScreen';
import { usePhotoViewModel } from './src/viewmodel/photo';

type ScreenType = 'camera' | 'list';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('camera');
  
  // Instanciando o ViewModel
  const { addPhoto, getSortedPhotos } = usePhotoViewModel();

  const handlePhotoCaptured = (photo: any) => {
    addPhoto(photo);
    Alert.alert('Sucesso', 'Foto capturada!');
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {currentScreen === 'camera' ? (
        <CameraScreen
          onPhotoCaptured={handlePhotoCaptured}
          onNavigateToList={() => setCurrentScreen('list')}
        />
      ) : (
        <PhotoListScreen
          photos={getSortedPhotos()}
          onNavigateToCamera={() => setCurrentScreen('camera')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
});