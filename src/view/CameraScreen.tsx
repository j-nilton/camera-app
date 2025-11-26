import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LocationModel } from '../model/location';
import { MyPhoto } from '../viewmodel/photo';

interface Props {
  onPhotoCaptured: (photo: MyPhoto) => void;
  onNavigateToList: () => void;
}

export function CameraScreen({ onPhotoCaptured, onNavigateToList }: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const granted = await LocationModel.requestPermission();
      setLocationGranted(granted);
    })();
  }, []);

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function capturePhoto() {
    if (!cameraRef.current) return;
    
    const result = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    if (!result?.uri) return;

    let coords = { latitude: null as number | null, longitude: null as number | null };

    if (locationGranted) {
      const location = await LocationModel.getCurrentLocation();
      if (location) coords = location;
    }

    const newPhoto: MyPhoto = {
      uri: result.uri,
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now(),
    };

    onPhotoCaptured(newPhoto);
  }

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.message}>Precisamos de acesso à câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      
      <TouchableOpacity style={styles.navButtonTop} onPress={onNavigateToList}>
        <Text style={styles.navButtonText}>Galeria ➜</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Virar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.captureBtn]} onPress={capturePhoto}>
          <Text style={styles.text}>Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  message: { textAlign: 'center', marginBottom: 10 },
  camera: { flex: 1 },
  navButtonTop: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  navButtonText: { color: '#fff', fontWeight: 'bold' },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
  captureBtn: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: 'white', fontWeight: 'bold' },
});