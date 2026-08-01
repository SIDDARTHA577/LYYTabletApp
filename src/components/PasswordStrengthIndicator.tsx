import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
  password?: string;
}

export function PasswordStrengthIndicator({ password = '' }: Props) {
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let strengthScore = 0;
  if (hasMinLength) strengthScore += 1;
  if (hasUpper) strengthScore += 1;
  if (hasNumber) strengthScore += 1;
  if (hasSpecial) strengthScore += 1;

  let strengthLabel = 'WEAK';
  let strengthColor = '#E0E0E0';
  if (strengthScore === 1) { strengthLabel = 'WEAK'; strengthColor = '#FF3B30'; }
  else if (strengthScore === 2) { strengthLabel = 'FAIR'; strengthColor = '#FF9500'; }
  else if (strengthScore === 3) { strengthLabel = 'GOOD'; strengthColor = '#34C759'; }
  else if (strengthScore === 4) { strengthLabel = 'STRONG'; strengthColor = '#00C753'; } // from the image

  const checkColor = (met: boolean) => (met ? '#00C753' : '#A0AABF');

  const CheckIcon = ({ met }: { met: boolean }) => (
    <View style={[styles.checkCircle, { borderColor: checkColor(met) }]}>
      {met && <View style={styles.checkMark} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Bars */}
      <View style={styles.barsContainer}>
        {[1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={[
              styles.bar,
              { backgroundColor: level <= strengthScore ? strengthColor : '#EBEBEB' },
            ]}
          />
        ))}
      </View>

      {/* Labels */}
      <View style={styles.labelsContainer}>
        <Text style={styles.strengthText}>PASSWORD STRENGTH</Text>
        <Text style={[styles.strengthValue, { color: strengthScore > 0 ? strengthColor : '#A0AABF' }]}>
          {strengthScore > 0 ? strengthLabel : ''}
        </Text>
      </View>

      {/* Checklist */}
      <View style={styles.checklistContainer}>
        <View style={styles.checkColumn}>
          <View style={styles.checkRow}>
            <CheckIcon met={hasMinLength} />
            <Text style={[styles.checkText, { color: checkColor(hasMinLength) }]}>8+ characters</Text>
          </View>
          <View style={styles.checkRow}>
            <CheckIcon met={hasNumber} />
            <Text style={[styles.checkText, { color: checkColor(hasNumber) }]}>Number</Text>
          </View>
        </View>
        <View style={styles.checkColumn}>
          <View style={styles.checkRow}>
            <CheckIcon met={hasUpper} />
            <Text style={[styles.checkText, { color: checkColor(hasUpper) }]}>Uppercase letter</Text>
          </View>
          <View style={styles.checkRow}>
            <CheckIcon met={hasSpecial} />
            <Text style={[styles.checkText, { color: checkColor(hasSpecial) }]}>Special character</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  barsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0AABF',
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  checklistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkColumn: {
    flex: 1,
    gap: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00C753',
  },
  checkText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
