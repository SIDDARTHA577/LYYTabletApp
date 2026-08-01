import React, { useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { IconButton, Button, Text } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';

export function WebCameraModal({ visible, onDismiss, onCapture }: { visible: boolean; onDismiss: () => void; onCapture: (uri: string) => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!visible) return null;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} onRequestClose={onDismiss} transparent>
        <View style={styles.container}>
          <View style={styles.prompt}>
            <Text style={styles.text}>We need your permission to use the camera</Text>
            <Button mode="contained" onPress={requestPermission} style={{ marginBottom: 12 }}>Grant Permission</Button>
            <Button mode="outlined" onPress={onDismiss}>Cancel</Button>
          </View>
        </View>
      </Modal>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          onCapture(photo.uri);
          onDismiss();
        }
      } catch (err) {
        console.error('Failed to take picture', err);
      }
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent>
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} facing="back">
          <View style={styles.buttonContainer}>
            <IconButton icon="close" size={32} iconColor="white" style={styles.closeBtn} onPress={onDismiss} />
            <IconButton icon="camera-iris" size={64} iconColor="white" style={styles.captureBtn} onPress={takePicture} />
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center' },
  prompt: { backgroundColor: 'white', padding: 24, margin: 24, borderRadius: 12 },
  camera: { flex: 1, width: '100%' },
  text: { textAlign: 'center', marginBottom: 20, color: 'black' },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'column' },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
  captureBtn: { position: 'absolute', bottom: 40, alignSelf: 'center' },
});
