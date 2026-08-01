import React from 'react';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { WebCameraModal } from './WebCameraModal';
import tokens from '../../theme/tokens';

// One "📷 Attach photo here" cell from the Photo Journal sections. Captures
// to a local file URI only — the pre-signed-URL upload pipeline
// (docs/API_DESIGN.md POST /files/upload-url) is a later phase; for now the
// URI is stored directly in the inspection's local form state.
export function PhotoSlot({ label, uri, onChange }: { label: string; uri: string | null; onChange: (uri: string) => void }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [webCameraVisible, setWebCameraVisible] = React.useState(false);

  const takePhoto = async () => {
    setMenuVisible(false);
    if (Platform.OS === 'web') {
      setWebCameraVisible(true);
      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets?.[0]) {
      onChange(result.assets[0].uri);
    }
  };

  const chooseLibrary = async () => {
    setMenuVisible(false);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets?.[0]) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-3 mr-3 w-40">
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Pressable
            onPress={() => setMenuVisible(true)}
            className="h-[120px] items-center justify-center overflow-hidden rounded-md border border-dashed"
            style={{ borderColor: tokens.color.border, backgroundColor: tokens.color.background }}
          >
            {uri ? (
              <Image source={{ uri }} className="h-full w-full" />
            ) : (
              <>
                <IconButton icon="camera-plus-outline" size={28} iconColor={tokens.color.textSecondary} />
                <Text className="text-caption text-textMuted">Add photo</Text>
              </>
            )}
          </Pressable>
        }
      >
        <Menu.Item leadingIcon="camera" onPress={takePhoto} title="Take Photo" />
        <Menu.Item leadingIcon="image-multiple" onPress={chooseLibrary} title="Choose from Library" />
      </Menu>
      {uri && (
        <IconButton
          icon="close-circle"
          size={18}
          style={{ position: 'absolute', top: -8, right: -8 }}
          onPress={() => onChange('')}
        />
      )}
      <Text className="mt-1.5 text-center text-caption text-textSecondary" numberOfLines={1}>
        {label}
      </Text>

      {Platform.OS === 'web' && (
        <WebCameraModal
          visible={webCameraVisible}
          onDismiss={() => setWebCameraVisible(false)}
          onCapture={(photoUri) => onChange(photoUri)}
        />
      )}
    </View>
  );
}
