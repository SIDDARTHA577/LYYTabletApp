import React from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['accessories'];

export function Section6Accessories({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();
  
  const ACCESSORIES = [
    { key: 'zipper', label: language === 'en' ? 'ZIPPER' : '拉链' },
    { key: 'price_ticket', label: language === 'en' ? 'PRICE TICKET' : '价格标' },
    { key: 'belts', label: language === 'en' ? 'BELTS' : '腰带' },
    { key: 'lining', label: language === 'en' ? 'LINING' : '里衬' },
    { key: 'interlining', label: language === 'en' ? 'INTERLINING' : '粘合衬' },
    { key: 'elastic', label: language === 'en' ? 'ELASTIC' : '松紧带' },
    { key: 'polybag', label: language === 'en' ? 'POLYBAG' : '胶袋' },
    { key: 'shoulder_pads', label: language === 'en' ? 'SHOULDER PADS' : '垫肩' },
    { key: 'threads', label: language === 'en' ? 'THREADS' : '缝纫线' },
    { key: 'packaging', label: language === 'en' ? 'PACKAGING' : '包装' },
    { key: 'care_label', label: language === 'en' ? 'CARE/CONTENT LABEL' : '成分/洗涤标' },
    { key: 'buttons', label: language === 'en' ? 'BUTTONS' : '纽扣' },
    { key: 'hang_tag', label: language === 'en' ? 'HANG TAG' : '吊牌' },
    { key: 'factory_id', label: language === 'en' ? 'FACTORY ID LABEL' : '工厂识别标' },
    { key: 'main_label', label: language === 'en' ? 'MAIN LABEL' : '主标' },
  ];

  return (
    <View>
      <SectionCard title={language === 'en' ? 'Accessories' : '配件'} subtitle={language === 'en' ? 'Select all accessories present / applicable' : '选择所有存在/适用的配件'}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {ACCESSORIES.map((item) => (
            <View key={item.key} className="flex-row items-center min-w-[200px]">
              <Checkbox.Android
                status={data[item.key as keyof Data] ? 'checked' : 'unchecked'}
                onPress={() => onChange({ [item.key]: !data[item.key as keyof Data] })}
              />
              <Text className="text-body text-textPrimary ml-2">{item.label}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </View>
  );
}
