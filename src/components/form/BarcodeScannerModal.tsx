import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Scans a roll/lot label's barcode or QR code and hands the decoded string
// back to the caller (e.g. auto-filling Lot #). Self-contained: owns camera
// permission state and the modal chrome, so any field can become
// scan-capable just by rendering this + a trigger icon (see TextField's
// `scannable` prop).
export function BarcodeScannerModal({
  visible,
  onClose,
  onScanned,
}: {
  visible: boolean;
  onClose: () => void;
  onScanned: (value: string) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    if (visible) setHandled(false);
  }, [visible]);

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent={false}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scan barcode / QR code</Text>
          <IconButton icon="close" iconColor="#fff" onPress={onClose} />
        </View>

        {!permission ? (
          <View style={styles.centered} />
        ) : !permission.granted ? (
          <View style={styles.centered}>
            <Text style={styles.permissionText}>Camera access is needed to scan labels.</Text>
            <Button mode="contained" onPress={requestPermission} style={{ marginTop: 12 }}>
              Grant camera permission
            </Button>
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'code128', 'code39', 'ean13', 'ean8', 'upc_a', 'upc_e'] }}
            onBarcodeScanned={
              handled
                ? undefined
                : ({ data }) => {
                    setHandled(true);
                    onScanned(data);
                    onClose();
                  }
            }
          >
            <View style={styles.frame} />
            <Text style={styles.hint}>Align the barcode within the frame</Text>
          </CameraView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1017' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 48, paddingBottom: 8 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  camera: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: 240, height: 240, borderWidth: 2, borderColor: '#fff', borderRadius: 16, opacity: 0.85 },
  hint: { color: '#fff', marginTop: 16, opacity: 0.8 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  permissionText: { color: '#fff', textAlign: 'center' },
});
