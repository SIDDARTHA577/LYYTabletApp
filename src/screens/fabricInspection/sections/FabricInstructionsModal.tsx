import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

export function FabricInstructionsModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: tokens.color.surface,
          margin: 20,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          maxHeight: '90%',
          maxWidth: 600,
          alignSelf: 'center',
          width: '100%',
        }}
      >
        <View className="border-b border-border p-5" style={{ backgroundColor: tokens.color.background }}>
          <Text className="mb-1 text-cardTitle font-bold text-textPrimary">FABRIC INSPECTION TEMPLATE (4-POINT SYSTEM) — INSTRUCTIONS</Text>
          <Text className="text-label text-textSecondary">面料检验模板(四分制) — 使用说明</Text>
        </View>
        <ScrollView className="p-5">
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">Purpose 用途:</Text>
            <Text className="text-label leading-5 text-textSecondary">Standard LYY incoming-fabric inspection using the 4-Point System, completed roll by roll before cutting. 大货裁剪前按卷进行的标准来料面料检验，采用四分制。</Text>
          </View>
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">How to fill 填写方式:</Text>
            <Text className="text-label leading-5 text-textSecondary">Blue text = example/auto value. Pale cells = fill in. Yellow cells auto-calculate or are dropdowns. 蓝色文字为示例/自动值；浅色单元格为填写项；黄色单元格为自动计算或下拉。</Text>
          </View>
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">4-Point scale 四分制:</Text>
            <Text className="text-label leading-5 text-textSecondary">1 pt = defect {"<"}3in.  2 pt = 3–6in.  3 pt = 6–9in.  4 pt = {">"}9in.  Max 4 points per single defect and per linear yard. 1分=缺陷{"<"}3英寸；2分=3-6；3分=6-9；4分={">"}9；单个缺陷及每码最多4分。</Text>
          </View>
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">Result 判定:</Text>
            <Text className="text-label leading-5 text-textSecondary">Roll and shipment = Pass / Screen / Reject against the points-per-100-yd² threshold. 单卷与整批=通过/筛查/拒收，依据每100平方码评分阈值。</Text>
          </View>
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">Defect codes 缺陷代码:</Text>
            <Text className="text-label leading-5 text-textSecondary">See the 'Defect Codes' tab — Woven/General and Knit lists. Use the set matching the fabric. 见缺陷代码页—梭织/通用与针织两套，按面料类型选用。</Text>
          </View>
          <View className="mb-4">
            <Text className="mb-1 text-label font-bold text-textPrimary">Photos & files 照片与文件:</Text>
            <Text className="text-label leading-5 text-textSecondary">Paste images into '📷' cells; attach lab reports in '📎 Upload file' cells. 照片粘贴至[📷]单元格；实验报告用[📎上传文件]单元格。</Text>
          </View>

          <View className="mb-4 mt-3">
            <Text className="mb-1 text-label font-bold text-textPrimary">Block index 模块索引:</Text>
            <Text className="text-label leading-5 text-textSecondary">1. Order & Fabric Info 订单与面料信息</Text>
            <Text className="text-label leading-5 text-textSecondary">2. Inspection Details 检验信息</Text>
            <Text className="text-label leading-5 text-textSecondary">3. 4-Point Criteria & Acceptance 四分制标准与接收</Text>
            <Text className="text-label leading-5 text-textSecondary">4. Roll-by-Roll Inspection 逐卷检验</Text>
            <Text className="text-label leading-5 text-textSecondary">5. Defect Log 缺陷记录</Text>
            <Text className="text-label leading-5 text-textSecondary">6. Defect Summary & Result 缺陷汇总与判定</Text>
            <Text className="text-label leading-5 text-textSecondary">7. Shade / Width / Physical Checks 色差/幅宽/物理检查</Text>
            <Text className="text-label leading-5 text-textSecondary">8. Lab / Physical Test Reports 实验室测试报告</Text>
            <Text className="text-label leading-5 text-textSecondary">9. Photo Journal 照片记录</Text>
            <Text className="text-label leading-5 text-textSecondary">10. Conclusion & Sign-off 结论与签核</Text>
          </View>
        </ScrollView>
        <View className="items-end border-t border-border bg-surface p-4">
          <Button mode="contained" onPress={onClose} style={{ borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Close' : '关闭'}</Button>
        </View>
      </Modal>
    </Portal>
  );
}
