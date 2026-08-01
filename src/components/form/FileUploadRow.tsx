import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

// "📎 Upload file" cells (Lab/Physical Test Reports, Spec Sheets, etc.).
// Stores the picked file's local name/URI only — see PhotoSlot.tsx for the
// same note on the deferred object-storage upload pipeline.
export function FileUploadRow({
  label,
  fileName,
  onChange,
}: {
  label: string;
  fileName: string | null;
  onChange: (file: { name: string; uri: string } | null) => void;
}) {
  const pick = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: true });
    if (!result.canceled && result.assets?.[0]) {
      onChange({ name: result.assets[0].name, uri: result.assets[0].uri });
    }
  };

  return (
    <View className="flex-row items-center border-b border-border py-2">
      <Text className="basis-[45%] text-label text-textPrimary" numberOfLines={1}>
        {label}
      </Text>
      <View className="flex-1 flex-row items-center justify-end gap-2">
        {fileName ? (
          <>
            <Text className="shrink text-caption text-textSecondary" numberOfLines={1}>
              {fileName}
            </Text>
            <Button compact mode="text" onPress={() => onChange(null)}>
              Remove
            </Button>
          </>
        ) : (
          <Button compact mode="outlined" icon="paperclip" onPress={pick}>
            Upload file
          </Button>
        )}
      </View>
    </View>
  );
}
