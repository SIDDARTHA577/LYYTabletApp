import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['photo_journal'];

export function Section15PhotoJournal({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Photo Journal" subtitle="照片记录">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <PhotoSlot label="Approved Sample / 批准样" uri={data.photo_approved_sample} onChange={(uri) => onChange({ photo_approved_sample: uri })} />
          <PhotoSlot label="Bulk Fabric/Shade / 大货面料/色档" uri={data.photo_bulk_fabric} onChange={(uri) => onChange({ photo_bulk_fabric: uri })} />
          <PhotoSlot label="Trims & Labels / 辅料与标签" uri={data.photo_trims_labels} onChange={(uri) => onChange({ photo_trims_labels: uri })} />
          <PhotoSlot label="Critical Operation / 关键工序" uri={data.photo_critical_operation} onChange={(uri) => onChange({ photo_critical_operation: uri })} />
          <PhotoSlot label="Construction Detail / 工艺细节" uri={data.photo_construction_detail} onChange={(uri) => onChange({ photo_construction_detail: uri })} />
          <PhotoSlot label="Packing/Folding / 包装/折叠" uri={data.photo_packing_folding} onChange={(uri) => onChange({ photo_packing_folding: uri })} />
        </View>
      </SectionCard>
    </View>
  );
}
