import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavBar } from '../../components/BottomNavBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

function InspectionTypeCard({ title, subtitle, icon, selected, onPress }: { title: string, subtitle: string, icon: string, selected?: boolean, onPress?: () => void }) {
  return (
    <TouchableOpacity style={[styles.card, selected && styles.cardSelected]} onPress={onPress}>
      <View style={styles.cardTop}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name={icon as any} size={20} color="#1C2B36" />
        </View>
        {selected && (
          <View style={styles.checkWrap}>
            <MaterialCommunityIcons name="check" size={16} color="#fff" />
          </View>
        )}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export function NewInspectionScreen() {
  const navigation = useNavigation<any>();
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: '#EBEAE5' }}>
      <AppHeader title={t('fabricInspection')} subtitle="4-Point System" />
      
      <View style={styles.content}>
        <View style={styles.headerArea}>
          <Text style={styles.mainTitle}>{t('newInspection')}</Text>
          <Text style={styles.mainSubtitle}>{t('chooseInspectionType')}</Text>
        </View>

        <View style={styles.grid}>
          <InspectionTypeCard 
            title={t('fabricInspection')} 
            subtitle="4-Point System roll-by-roll fabric QC." 
            icon="clipboard-text-outline"
            selected
            onPress={() => {}}
          />
          <InspectionTypeCard 
            title={language === 'en' ? "Daily Check" : "每日检查"} 
            subtitle="Daily follow-up production check." 
            icon="refresh"
          />
          <InspectionTypeCard 
            title={language === 'en' ? "Inline Inspection" : "在线检验"} 
            subtitle="Mid-production line inspection." 
            icon="refresh"
          />
          <InspectionTypeCard 
            title={language === 'en' ? "Final Inspection" : "最终检验"} 
            subtitle="Pre-shipment final inspection." 
            icon="file-check-outline"
          />
          <InspectionTypeCard 
            title={language === 'en' ? "Spot Check" : "抽检"} 
            subtitle="Quick spot-check inspection." 
            icon="format-list-bulleted"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextBtn}
            onPress={() => navigation.navigate('FabricInspectionStack', { screen: 'FabricInspectionForm' })}
          >
            <Text style={styles.nextBtnText}>Next</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavBar active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 24, paddingBottom: 40 },
  headerArea: { marginBottom: 24 },
  mainTitle: { fontSize: 20, fontWeight: '700', color: '#1C2B36' },
  mainSubtitle: { fontSize: 13, color: '#6A7185', marginTop: 4 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: {
    width: '32%',
    minWidth: 280,
    backgroundColor: '#FDFDFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E6F0',
  },
  cardSelected: {
    backgroundColor: '#EBEAE5',
    borderColor: '#1C2B36',
    borderWidth: 1.5,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  iconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E2E6F0', alignItems: 'center', justifyContent: 'center' },
  checkWrap: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#1C2B36', alignItems: 'center', justifyContent: 'center' },
  
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1C2B36', marginBottom: 8 },
  cardSubtitle: { fontSize: 12, color: '#6A7185' },
  
  footer: { marginTop: 'auto', alignItems: 'flex-end', paddingTop: 24 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2B36',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  nextBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
