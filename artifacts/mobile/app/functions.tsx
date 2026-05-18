import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const FUNCTIONS = [
  {
    icon: "🛡️",
    label: "护肝修复",
    tagline: "补充支链氨基酸 · 修复肝损伤",
    people: "熬夜人群 / 应酬饮酒人士 / 肝病患者",
    dose: "每日2次，早晚各1次",
    cycle: "建议连续使用3个月以上",
    effects: [
      "补充支链氨基酸（BCAA），降低芳香族氨基酸毒性",
      "辅助修复肝损伤，改善肝性脑病",
      "促进肝细胞再生与解毒功能恢复",
      "适配熬夜、应酬、慢性肝病等高风险人群",
    ],
    products: ["肽润肝清® 护肝醒酒冲剂", "珀珀肝宁® 高F值口服液"],
  },
  {
    icon: "⚡",
    label: "抗疲劳增效",
    tagline: "快速供能 · 减少肌肉分解 · 提升耐力",
    people: "健身人群 / 高强度工作者 / 体力劳动者",
    dose: "运动前30分钟或高强度工作前服用",
    cycle: "按需使用，长期规律服用效果更佳",
    effects: [
      "快速供能，小分子肽直接入血吸收",
      "减少肌肉分解，加速运动后恢复",
      "提升耐力，支持高强度持续工作",
      "满足健身、体力劳动者的高营养需求",
    ],
    products: ["小麦低聚肽营养粉", "能量饮料剂型"],
  },
  {
    icon: "🌿",
    label: "肠道协同",
    tagline: "小分子易吸收 · 调节肠道菌群",
    people: "消化功能弱 / 代谢异常 / 术后恢复人群",
    dose: "每日1-2次，餐前或空腹服用",
    cycle: "建议持续使用4-8周感受肠道改善",
    effects: [
      "小分子肽无需消化酶直接吸收，减轻肠道负担",
      "调节肠道菌群，改善肠道微生态平衡",
      "减轻肝脏解毒压力，协同肝肠健康",
      "适配消化功能弱、代谢异常人群日常调理",
    ],
    products: ["肽润肝清® 护肝醒酒冲剂", "珀珀肝宁® 高F值口服液"],
  },
];

const DOSE_FORMS = [
  { icon: "☕", name: "营养冲剂", scene: "日常保健 / 饮酒护肝", desc: "温水即溶，便携独立装，随时随地补充" },
  { icon: "🥤", name: "能量饮料", scene: "运动补给 / 高强度工作", desc: "液态直饮，快速供能，运动前后均适用" },
  { icon: "🌾", name: "营养粉", scene: "OEM定制 / 企业采购", desc: "原料级高纯度粉末，支持多行业应用" },
  { icon: "💊", name: "口服液", scene: "术后营养 / 肝病养护", desc: "液态高吸收，15分钟入血，高效修复" },
];

const BRANDS = [
  { name: "国泰民安·肽护中华", fValue: 45.2, purity: 97, mw: "＜1000Da", color: "#b8924b" },
  { name: "行业主流产品", fValue: 28.0, purity: 75, mw: "1000-3000Da", color: "#aaa" },
  { name: "同类产品A", fValue: 24.6, purity: 68, mw: "2000-5000Da", color: "#aaa" },
  { name: "同类产品B", fValue: 21.3, purity: 61, mw: "3000-8000Da", color: "#aaa" },
];

const QA = [
  { q: "产品F值是多少？与行业相比有何优势？", a: "本品F值为45.2，行业主流产品通常仅在20-30之间。更高的F值意味着支链氨基酸比例更高、芳香族氨基酸毒性更低，护肝修复效果显著领先。" },
  { q: "可以与其他保健品一起服用吗？", a: "本品为天然食品原料制成，一般不与常见保健品产生冲突。建议间隔30分钟以上与其他保健品服用。如正在服用处方药，请咨询医生。" },
  { q: "一般需要服用多久才能见效？", a: "抗疲劳效果通常在1-2周内感受到改善；肝功能指标的改善建议连续服用3个月后进行对比检测；肠道调节效果通常4-8周后明显。" },
  { q: "孕妇和哺乳期女性可以服用吗？", a: "出于安全考虑，孕妇及哺乳期女性建议在医生指导下使用。本品主要成分为小麦低聚肽，属于天然食品原料，特殊人群应遵医嘱。" },
];

export default function FunctionsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const [fnIdx, setFnIdx] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fn = FUNCTIONS[fnIdx];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>产品功能</Text>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>

        {/* F Value hero */}
        <LinearGradient colors={[colors.accent, "#d9b97a", colors.accent]} style={styles.fHero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={styles.fHeroMain}>F 值 = 45.2</Text>
          <Text style={styles.fHeroSub}>行业主流产品仅 20-30，本品领先 2 倍以上</Text>
          <View style={styles.fBarWrap}>
            <View style={[styles.fBarFill, { backgroundColor: "rgba(255,255,255,0.9)" }]} />
          </View>
          <Text style={styles.fHeroNote}>* F 值越高，支链氨基酸比例越高，护肝修复效果越显著</Text>
        </LinearGradient>

        {/* Function tabs */}
        <View style={styles.sceneTabs}>
          {FUNCTIONS.map((f, i) => (
            <Pressable
              key={i}
              onPress={() => setFnIdx(i)}
              style={[
                styles.sceneTab,
                {
                  backgroundColor: fnIdx === i ? colors.accent : "transparent",
                  borderColor: colors.accent,
                },
              ]}
            >
              <Text style={[styles.sceneTabText, { color: fnIdx === i ? "#fff" : colors.accent }]}>
                {f.icon} {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Function detail card */}
        <View style={[styles.sceneCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sceneTagline, { color: colors.primary }]}>{fn.tagline}</Text>
          <View style={styles.sceneGrid}>
            <View style={[styles.sceneGridCell, { backgroundColor: colors.surfaceCream }]}>
              <Text style={[styles.sceneGridLabel, { color: colors.mutedForeground }]}>适宜人群</Text>
              <Text style={[styles.sceneGridValue, { color: colors.foreground }]}>{fn.people}</Text>
            </View>
            <View style={[styles.sceneGridCell, { backgroundColor: colors.surfaceCream }]}>
              <Text style={[styles.sceneGridLabel, { color: colors.mutedForeground }]}>建议用法</Text>
              <Text style={[styles.sceneGridValue, { color: colors.foreground }]}>{fn.dose}</Text>
            </View>
          </View>
          <View style={[styles.sceneCycleRow, { backgroundColor: colors.surfaceJade }]}>
            <Icon name="clock" size={13} color={colors.primary} />
            <Text style={[styles.sceneCycleText, { color: colors.primary }]}>使用周期：{fn.cycle}</Text>
          </View>
          <Text style={[styles.effectsTitle, { color: colors.foreground }]}>功能效果</Text>
          {fn.effects.map((e, i) => (
            <View key={i} style={styles.effectRow}>
              <View style={[styles.effectDot, { backgroundColor: colors.accent }]}>
                <Text style={styles.effectDotText}>{i + 1}</Text>
              </View>
              <Text style={[styles.effectText, { color: colors.foreground }]}>{e}</Text>
            </View>
          ))}
          <View style={[styles.productsRow, { borderTopColor: colors.border }]}>
            <Icon name="package" size={13} color={colors.primary} />
            <Text style={[styles.productsLabel, { color: colors.primary }]}>推荐产品：</Text>
            <Text style={[styles.productsVal, { color: colors.foreground }]}>{fn.products.join(" / ")}</Text>
          </View>
        </View>

        {/* Dose forms */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>四大剂型 · 覆盖全场景</Text>
          <View style={styles.doseGrid}>
            {DOSE_FORMS.map((d) => (
              <View key={d.name} style={[styles.doseCell, { backgroundColor: colors.surfaceCream, borderColor: colors.border }]}>
                <Text style={styles.doseIcon}>{d.icon}</Text>
                <Text style={[styles.doseName, { color: colors.foreground }]}>{d.name}</Text>
                <Text style={[styles.doseScene, { color: colors.accent }]}>{d.scene}</Text>
                <Text style={[styles.doseDesc, { color: colors.mutedForeground }]}>{d.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Brand comparison */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>F 值竞品对比</Text>
          {BRANDS.map((b, i) => (
            <View key={b.name} style={styles.brandRow}>
              <Text style={[styles.brandName, { color: i === 0 ? colors.foreground : colors.mutedForeground, fontWeight: i === 0 ? "700" : "400" }]} numberOfLines={1}>
                {b.name}
              </Text>
              <View style={styles.brandBarArea}>
                <View style={[styles.brandBarBg, { backgroundColor: colors.muted }]}>
                  <View style={[styles.brandBarFill, { width: `${(b.fValue / 50) * 100}%`, backgroundColor: b.color }]} />
                </View>
                <Text style={[styles.brandBarVal, { color: b.color }]}>{b.fValue}</Text>
              </View>
              <Text style={[styles.brandSub, { color: colors.mutedForeground }]}>{b.purity}% · {b.mw}</Text>
            </View>
          ))}
          <Text style={[styles.dataNote, { color: colors.mutedForeground }]}>* 数据来源：第三方检测机构报告，2024年</Text>
        </View>

        {/* Specs table */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>核心规格参数</Text>
          {[
            ["F值", "45.2（行业主流 20-30）"],
            ["肽纯度", "≥97%"],
            ["分子量", "＜1000Da（主要200-1000Da）"],
            ["剂型", "营养冲剂 / 能量饮料 / 营养粉 / 口服液"],
            ["适用场景", "日常保健 / 运动补给 / 酒后修护 / 术后营养"],
            ["保质期", "24个月"],
          ].map(([k, v]) => (
            <View key={k} style={[styles.specRow, { borderBottomColor: colors.border }]}>
              <Text style={[styles.specKey, { color: colors.mutedForeground }]}>{k}</Text>
              <Text style={[styles.specVal, { color: k === "F值" ? colors.accent : colors.foreground, fontWeight: k === "F值" ? "700" : "400" }]}>{v}</Text>
            </View>
          ))}
        </View>

        {/* QA */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>常见问答</Text>
          {QA.map((qa, i) => (
            <View key={i}>
              <Pressable
                onPress={() => setExpanded(expanded === i ? null : i)}
                style={[styles.qaRow, { borderTopColor: colors.border }]}
              >
                <View style={[styles.qaQ, { backgroundColor: colors.surfaceJade }]}>
                  <Text style={[styles.qaQText, { color: colors.primary }]}>Q</Text>
                </View>
                <Text style={[styles.qaQuestion, { color: colors.foreground }]}>{qa.q}</Text>
                <Icon name={expanded === i ? "chevron-up" : "chevron-down"} size={16} color={colors.mutedForeground} />
              </Pressable>
              {expanded === i && (
                <View style={[styles.qaAnswer, { backgroundColor: colors.surfaceCream }]}>
                  <Text style={[styles.qaAnswerText, { color: colors.foreground }]}>{qa.a}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 18 },
  backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
  fHero: { margin: 16, borderRadius: 16, padding: 20 },
  fHeroMain: { color: "#fff", fontSize: 32, fontWeight: "800", letterSpacing: 2 },
  fHeroSub: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 6 },
  fBarWrap: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.3)", marginTop: 14, overflow: "hidden" },
  fBarFill: { height: 6, width: "90%", borderRadius: 3 },
  fHeroNote: { color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 8 },
  sceneTabs: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 8 },
  sceneTab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  sceneTabText: { fontSize: 12, fontWeight: "600" },
  sceneCard: { margin: 16, padding: 16, borderRadius: 16, borderWidth: 1 },
  sceneTagline: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  sceneGrid: { flexDirection: "row", gap: 10, marginBottom: 12 },
  sceneGridCell: { flex: 1, padding: 12, borderRadius: 10 },
  sceneGridLabel: { fontSize: 10, marginBottom: 4 },
  sceneGridValue: { fontSize: 12, fontWeight: "600", lineHeight: 18 },
  sceneCycleRow: { flexDirection: "row", alignItems: "center", gap: 6, padding: 10, borderRadius: 8, marginBottom: 16 },
  sceneCycleText: { fontSize: 12, fontWeight: "500" },
  effectsTitle: { fontSize: 13, fontWeight: "700", marginBottom: 8 },
  effectRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  effectDot: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  effectDotText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  effectText: { flex: 1, fontSize: 13 },
  productsRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, paddingTop: 14, borderTopWidth: 1, marginTop: 8, flexWrap: "wrap" },
  productsLabel: { fontSize: 12, fontWeight: "700" },
  productsVal: { flex: 1, fontSize: 12, lineHeight: 18 },
  doseGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  doseCell: { width: "47%", padding: 12, borderRadius: 12, borderWidth: 1 },
  doseIcon: { fontSize: 22, marginBottom: 6 },
  doseName: { fontSize: 13, fontWeight: "700", marginBottom: 2 },
  doseScene: { fontSize: 10, fontWeight: "600", marginBottom: 4 },
  doseDesc: { fontSize: 11, lineHeight: 16 },
  card: { marginHorizontal: 16, marginTop: 14, padding: 16, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },
  brandRow: { marginBottom: 12 },
  brandName: { fontSize: 13, marginBottom: 6 },
  brandBarArea: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandBarBg: { flex: 1, height: 10, borderRadius: 5, overflow: "hidden" },
  brandBarFill: { height: 10, borderRadius: 5 },
  brandBarVal: { width: 36, fontSize: 12, fontWeight: "700" },
  brandSub: { fontSize: 10, marginTop: 2 },
  dataNote: { fontSize: 10, marginTop: 8 },
  specRow: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1 },
  specKey: { width: 90, fontSize: 13 },
  specVal: { flex: 1, fontSize: 13 },
  qaRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderTopWidth: 1, gap: 10 },
  qaQ: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  qaQText: { fontSize: 11, fontWeight: "800" },
  qaQuestion: { flex: 1, fontSize: 13, fontWeight: "500" },
  qaAnswer: { padding: 12, borderRadius: 8, marginBottom: 4 },
  qaAnswerText: { fontSize: 13, lineHeight: 20 },
});
