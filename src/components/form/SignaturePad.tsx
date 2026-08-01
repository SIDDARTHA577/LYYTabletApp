import React, { useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button } from 'react-native-paper';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';

export interface SignatureValue {
  paths: string[]; // SVG path "d" strings, one per stroke
}

// Freehand signature capture (react-native-svg + PanResponder) for the
// Sign-off sections every template ends with. No native signature-pad
// dependency needed — this is ~60 lines and avoids an extra WebView-backed
// library for something this simple.
export function SignaturePad({
  label,
  labelCn,
  required,
  value,
  onChange,
  error,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value: SignatureValue | null;
  onChange: (v: SignatureValue | null) => void;
  error?: string;
}) {
  const [currentPath, setCurrentPath] = useState('');
  const paths = useRef<string[]>(value?.paths ?? []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath(`M${locationX.toFixed(1)},${locationY.toFixed(1)}`);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath((prev) => `${prev} L${locationX.toFixed(1)},${locationY.toFixed(1)}`);
      },
      onPanResponderRelease: () => {
        setCurrentPath((prev) => {
          if (prev) {
            paths.current = [...paths.current, prev];
            onChange({ paths: paths.current });
          }
          return '';
        });
      },
    })
  ).current;

  const clear = () => {
    paths.current = [];
    setCurrentPath('');
    onChange(null);
  };

  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width="100%">
      <View
        className="items-center justify-center rounded-md border border-dashed"
        style={[{ height: 140, borderColor: tokens.color.border, backgroundColor: tokens.color.surface }]}
        {...panResponder.panHandlers}
      >
        <Svg style={StyleSheet.absoluteFill}>
          {paths.current.map((d, i) => (
            <Path key={i} d={d} stroke={tokens.color.textPrimary} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {currentPath ? (
            <Path d={currentPath} stroke={tokens.color.textPrimary} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}
        </Svg>
        {paths.current.length === 0 && !currentPath && <Text className="text-textMuted">Sign here</Text>}
      </View>
      <Button compact mode="text" onPress={clear} style={{ alignSelf: 'flex-start' }}>
        Clear signature
      </Button>
    </FieldShell>
  );
}
