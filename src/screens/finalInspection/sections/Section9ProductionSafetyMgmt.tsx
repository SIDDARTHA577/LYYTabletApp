import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { List, SegmentedButtons } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { FileUploadRow } from '../../../components/form/FileUploadRow';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';

type Data = FinalInspectionData['production_safety_mgmt'];

function YesNoQuestion({ 
  label, 
  valueObj, 
  onChange,
  nested = false
}: { 
  label: string; 
  valueObj: { answer?: 'YES' | 'NO'; file?: string };
  onChange: (next: { answer?: 'YES' | 'NO'; file?: string }) => void;
  nested?: boolean;
}) {
  return (
    <View className={`mb-4 ${nested ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <Text className="text-body text-textPrimary mb-2 font-medium">{label}</Text>
      <View className="flex-row items-center gap-3">
        <SegmentedButtons
          value={valueObj?.answer || ''}
          onValueChange={(v) => onChange({ ...valueObj, answer: v as 'YES' | 'NO' })}
          buttons={[
            { value: 'YES', label: 'YES' },
            { value: 'NO', label: 'NO' },
          ]}
          style={{ maxWidth: 200 }}
        />
        {valueObj?.answer === 'YES' && (
          <View className="flex-1 rounded-md border border-border bg-background p-2">
            <FileUploadRow
              label="Supporting Document"
              fileName={valueObj.file ? valueObj.file.split('/').pop() || valueObj.file : null}
              onChange={(file) => onChange({ ...valueObj, file: file?.uri || '' })}
            />
          </View>
        )}
      </View>
    </View>
  );
}

function SharpObjectGroup({
  label,
  dataKey,
  data,
  onChange
}: {
  label: string;
  dataKey: string;
  data: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
}) {
  const groupData = data[dataKey] || {};
  return (
    <View className="mb-6 border-b border-border pb-4">
      <YesNoQuestion 
        label={`Are sharp objects - ${label} tied to workstation?`}
        valueObj={groupData.tied || {}}
        onChange={(v) => onChange({ ...data, [dataKey]: { ...groupData, tied: v } })}
      />
      {groupData.tied?.answer === 'YES' && (
        <>
          <YesNoQuestion 
            label="Whether have in-out record?"
            valueObj={groupData.in_out || {}}
            onChange={(v) => onChange({ ...data, [dataKey]: { ...groupData, in_out: v } })}
            nested
          />
          <YesNoQuestion 
            label="Whether have damage tool record?"
            valueObj={groupData.damage || {}}
            onChange={(v) => onChange({ ...data, [dataKey]: { ...groupData, damage: v } })}
            nested
          />
        </>
      )}
    </View>
  );
}

export function Section9ProductionSafetyMgmt({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const needle = data.needle_control || {};
  const sharp = data.sharp_object_management || {};
  const metal = data.metal_detection_management || {};

  return (
    <View>
      <SectionCard title="Production Safety Management Checklist" subtitle="Safety checks with supporting documents">
        <List.AccordionGroup>
          
          <List.Accordion id="1" title="1. Needle Control" titleStyle={{ fontWeight: 'bold' }}>
            <View className="p-4 bg-surface">
              <View className="mb-4">
                <DropdownField 
                  label="Needle Type" 
                  value={needle.needle_type} 
                  options={[
                    { label: 'Garment factory Sewing Machine Needles', value: 'Garment' },
                    { label: 'Knitting Seamless factory Knitting Machine Needles', value: 'Knitting Seamless' },
                    { label: 'Sweater factory Kniting Machine Needles', value: 'Sweater' },
                    { label: 'Embroidery Factory Embroidery Needles', value: 'Embroidery' },
                    { label: 'Hand Sewing Needles', value: 'Hand Sewing' }
                  ]}
                  onChangeValue={(v) => onChange({ needle_control: { ...needle, needle_type: v } })} 
                />
              </View>
              <YesNoQuestion label="Whether have Use Needle Control Log?" valueObj={needle.log || {}} onChange={(v) => onChange({ needle_control: { ...needle, log: v } })} />
              <YesNoQuestion label="Whether there is a special box for needle transfer?" valueObj={needle.box || {}} onChange={(v) => onChange({ needle_control: { ...needle, box: v } })} />
              <YesNoQuestion label="Whether have broken needle record?" valueObj={needle.broken || {}} onChange={(v) => onChange({ needle_control: { ...needle, broken: v } })} />
            </View>
          </List.Accordion>

          <List.Accordion id="2" title="2. Sharp Object Management" titleStyle={{ fontWeight: 'bold' }}>
            <View className="p-4 bg-surface">
              <SharpObjectGroup label="Knives 刀具" dataKey="knives" data={sharp} onChange={(v) => onChange({ sharp_object_management: v })} />
              <SharpObjectGroup label="Blades 刀片" dataKey="blades" data={sharp} onChange={(v) => onChange({ sharp_object_management: v })} />
              <SharpObjectGroup label="Snippers 剪刀" dataKey="snippers" data={sharp} onChange={(v) => onChange({ sharp_object_management: v })} />
              <SharpObjectGroup label="Box Cutters 裁纸刀" dataKey="box_cutters" data={sharp} onChange={(v) => onChange({ sharp_object_management: v })} />
              <SharpObjectGroup label="Plastic Pick 塑料锥" dataKey="plastic_pick" data={sharp} onChange={(v) => onChange({ sharp_object_management: v })} />
            </View>
          </List.Accordion>

          <List.Accordion id="3" title="3. Metal Detection Management" titleStyle={{ fontWeight: 'bold' }}>
            <View className="p-4 bg-surface">
              <YesNoQuestion label="Whether all production have 100% be performed metal detection before flow into packing area?" valueObj={metal.detection_100 || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, detection_100: v } })} />
              <YesNoQuestion label="Whether have metal detection record?" valueObj={metal.record || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, record: v } })} />
              <YesNoQuestion label="Whether have metal detection calibration record?" valueObj={metal.calibration || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, calibration: v } })} />
              <YesNoQuestion label="Whether a metal free zone be maintained on the packing side of the metal detector?" valueObj={metal.zone || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, zone: v } })} />
              <YesNoQuestion label="Whether have SHARP OBJECTS (such as metal tools, blades, knives, scissors, snippers, box cutters) at metal free zone?" valueObj={metal.sharp_objects || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, sharp_objects: v } })} />
              <YesNoQuestion label="Finished products metal detection exception report" valueObj={metal.exception || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, exception: v } })} />
              {metal.exception?.answer === 'YES' && (
                <YesNoQuestion label="Is there a detailed record in the finished products metal detection exception report including the matter which be detected?" valueObj={metal.detailed_record || {}} onChange={(v) => onChange({ metal_detection_management: { ...metal, detailed_record: v } })} nested />
              )}
            </View>
          </List.Accordion>

        </List.AccordionGroup>
      </SectionCard>
    </View>
  );
}
