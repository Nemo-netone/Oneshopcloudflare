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

const TECHS = [
  {
    name: "微生物发酵\n动态预处理技术",
    icon: "activity",
    intro: "打破小麦蛋白二硫键结构，酶解效率提升30%，酶制剂用量节约40%，无化学残留，实现绿色低成本量产。",
    maturity: 92,
    highlights: ["酶解效率提升 30%", "酶制剂用量节约 40%", "零化学残留", "绿色低成本量产"],
    detail: "通过微生物发酵对小麦蛋白进行动态预处理，精准打破蛋白质的二硫键空间结构，使蛋白质链充分展开，大幅提升后续酶解反应的效率与底物可及性。相比传统工艺，酶制剂用量减少40%，酶解时间显著缩短，且全程无化学试剂介入，实现从源头的绿色清洁生产。",
  },
  {
    name: "分子对接+靶向\n酶解技术",
    icon: "zap",
    intro: "精准识别并切割芳香族氨基酸，将产品F值提升至45.2（行业主流仅20-30），活性与功效显著领先。",
    maturity: 98,
    highlights: ["F值达 45.2", "行业主流仅 20-30", "精准切割芳香族氨基酸", "功效领先行业 2 倍+"],
    detail: "采用分子对接技术结合数据库比对，建立蛋白质切割位点的精准预测模型，靶向识别并定向切割芳香族氨基酸（苯丙氨酸、酪氨酸、色氨酸），同时最大限度保留支链氨基酸（BCAA）。最终使产品F值稳定达到45.2，远超行业主流产品20-30的水平，护肝修复活性显著领先。",
  },
  {
    name: "膜分离\n纯化技术",
    icon: "filter",
    intro: "高效去除杂质与冗余氨基酸，保障肽纯度与稳定性，已获发明专利2项、实用新型专利2项，国内领先。",
    maturity: 95,
    highlights: ["肽纯度 ≥97%", "发明专利 2 项", "实用新型专利 2 项", "河南省科学院查新国内领先"],
    detail: "采用多级膜分离纯化工艺，高效去除酶解液中的杂质、游离氨基酸及大分子残留蛋白，精准富集目标活性肽组分，最终产品肽纯度可达97%以上。该技术已获国家发明专利2项、实用新型专利2项，经河南省科学院科技查新认定为国内领先水平。",
  },
];

const FLOW_STEPS = ["小麦蛋白原料", "微生物发酵预处理", "靶向酶解反应", "膜分离纯化", "干燥制粒", "质量检测出厂"];

const PATENTS = [
  { type: "发明专利", title: "微生物发酵动态预处理小麦蛋白的制备方法", no: "ZL2021XXXXXXXX.X", year: 2021 },
  { type: "发明专利", title: "高F值小麦低聚肽的靶向酶解纯化工艺", no: "ZL2022XXXXXXXX.X", year: 2022 },
  { type: "实用新型", title: "小麦低聚肽膜分离纯化装置", no: "ZL2023XXXXXXXX.X", year: 2023 },
  { type: "实用新型", title: "高F值低聚肽连续化生产系统", no: "ZL2023XXXXXXXX.X", year: 2023 },
];

const PARTNERS = [
  { name: "河南省科学院", dir: "科技查新认定：国内领先水平", color: "#b8924b" },
  { name: "江南大学", dir: "酶工程与发酵技术联合研发", color: "#1a6896" },
  { name: "中国农业科学院", dir: "小麦品种筛选与GAP基地建设", color: "#2f6a52" },
  { name: "郑州大学第一附属医院", dir: "临床护肝效果验证与医学研究", color: "#8e44ad" },
];

export default function TechScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const [techIdx, setTechIdx] = useState(1);

  const tech = TECHS[techIdx];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>首创技术</Text>
          <Text style={styles.headerSub}>三大核心技术 · 科技护肝壁垒</Text>
        </View>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>

        {/* Banner */}
        <LinearGradient colors={[colors.accent, "#d9b97a"]} style={styles.banner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={styles.bannerTitle}>三大核心技术</Text>
          <Text style={styles.bannerSub}>专利驱动 · 构建国内领先的肽护肝技术体系</Text>
          <View style={styles.bannerStats}>
            {[{ v: "12", l: "项专利" }, { v: "8.6%", l: "研发占比" }, { v: "26人", l: "研发团队" }].map((s) => (
              <View key={s.l} style={styles.bannerStat}>
                <Text style={styles.bannerStatV}>{s.v}</Text>
                <Text style={styles.bannerStatL}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Tech selector */}
        <View style={styles.techTabs}>
          {TECHS.map((t, i) => (
            <Pressable
              key={i}
              onPress={() => setTechIdx(i)}
              style={[
                styles.techTab,
                {
                  backgroundColor: techIdx === i ? colors.accent : "#fff",
                  borderColor: colors.accent,
                },
              ]}
            >
              <Text style={[styles.techTabText, { color: techIdx === i ? "#fff" : colors.accent }]} numberOfLines={2}>
                {t.name}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tech detail card */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.techCardHeader}>
            <View style={[styles.techIconBox, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
              <Icon name={tech.icon as any} size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.techName, { color: colors.foreground }]}>{tech.name}</Text>
              <Text style={[styles.techIntro, { color: colors.mutedForeground }]}>{tech.intro}</Text>
            </View>
          </View>
          {/* Highlight pills */}
          <View style={styles.highlightRow}>
            {tech.highlights.map((h) => (
              <View key={h} style={[styles.highlightPill, { backgroundColor: colors.accent + "18", borderColor: colors.accent + "55" }]}>
                <Icon name="check-circle" size={10} color={colors.accent} />
                <Text style={[styles.highlightText, { color: colors.accent }]}>{h}</Text>
              </View>
            ))}
          </View>
          <View style={styles.maturityRow}>
            <Text style={[styles.maturityLabel, { color: colors.mutedForeground }]}>技术成熟度</Text>
            <Text style={[styles.maturityVal, { color: colors.accent }]}>{tech.maturity}%</Text>
          </View>
          <View style={[styles.maturityBar, { backgroundColor: colors.muted }]}>
            <LinearGradient
              colors={[colors.accent, "#d9b97a"]}
              style={[styles.maturityFill, { width: `${tech.maturity}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <View style={[styles.detailBox, { backgroundColor: colors.surfaceCream }]}>
            <Text style={[styles.detailText, { color: colors.foreground }]}>{tech.detail}</Text>
          </View>
        </View>

        {/* Production flow */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>生产工艺流程</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flowRow}>
            {FLOW_STEPS.map((s, i) => (
              <View key={s} style={styles.flowItem}>
                <View style={[styles.flowNode, { backgroundColor: colors.primary }]}>
                  <Text style={styles.flowNodeText}>{i + 1}</Text>
                </View>
                <Text style={[styles.flowLabel, { color: colors.foreground }]}>{s}</Text>
                {i < FLOW_STEPS.length - 1 && (
                  <View style={[styles.flowArrow, { borderTopColor: colors.accent }]} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Key indicators table */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>关键技术指标</Text>
          {[
            { k: "F值", v: "45.2（行业主流仅20-30）", highlight: true },
            { k: "肽纯度", v: "≥97%" },
            { k: "分子量分布", v: "主要300-500Da" },
            { k: "重金属（铅）", v: "≤0.05mg/kg" },
            { k: "微生物", v: "符合GB/T国标" },
          ].map(({ k, v, highlight }) => (
            <View key={k} style={[styles.indRow, { borderBottomColor: colors.border }]}>
              <Text style={[styles.indKey, { color: colors.mutedForeground }]}>{k}</Text>
              <Text style={[styles.indVal, { color: highlight ? colors.accent : colors.foreground, fontWeight: highlight ? "800" : "400", fontSize: highlight ? 16 : 14 }]}>{v}</Text>
              {highlight && <Icon name="star" size={14} color={colors.accent} style={{ marginLeft: 4 }} />}
            </View>
          ))}
        </View>

        {/* Patents */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>核心专利与论文</Text>
          {PATENTS.map((p, i) => (
            <View key={i} style={[styles.patentRow, { borderTopColor: colors.border }]}>
              <View style={[styles.patentBadge, { backgroundColor: colors.accent }]}>
                <Text style={styles.patentBadgeText}>{p.type}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.patentTitle, { color: colors.foreground }]}>{p.title}</Text>
                <Text style={[styles.patentMeta, { color: colors.mutedForeground }]}>{p.no} · {p.year}年</Text>
              </View>
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2 },
  banner: { margin: 16, borderRadius: 16, padding: 20 },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  bannerSub: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 6 },
  bannerStats: { flexDirection: "row", marginTop: 16, gap: 24 },
  bannerStat: { alignItems: "center" },
  bannerStatV: { color: "#fff", fontSize: 22, fontWeight: "800" },
  bannerStatL: { color: "rgba(255,255,255,0.85)", fontSize: 11, marginTop: 2 },
  techTabs: { flexDirection: "row", paddingHorizontal: 16, gap: 8 },
  techTab: { flex: 1, padding: 10, borderRadius: 12, borderWidth: 1.5, alignItems: "center" },
  techTabText: { fontSize: 11, fontWeight: "600", textAlign: "center" },
  card: { marginHorizontal: 16, marginTop: 14, padding: 16, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },
  techCardHeader: { flexDirection: "row", gap: 12, marginBottom: 10 },
  highlightRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 14 },
  highlightPill: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  highlightText: { fontSize: 11, fontWeight: "600" },
  techIconBox: { width: 52, height: 52, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  techName: { fontSize: 15, fontWeight: "700" },
  techIntro: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  maturityRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  maturityLabel: { fontSize: 12 },
  maturityVal: { fontSize: 14, fontWeight: "700" },
  maturityBar: { height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 14 },
  maturityFill: { height: 8, borderRadius: 4 },
  detailBox: { padding: 14, borderRadius: 10 },
  detailText: { fontSize: 13, lineHeight: 22 },
  flowRow: { gap: 0, paddingVertical: 8, alignItems: "center" },
  flowItem: { alignItems: "center", position: "relative", width: 70 },
  flowNode: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  flowNodeText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  flowLabel: { fontSize: 10, marginTop: 6, textAlign: "center" },
  flowArrow: { position: "absolute", right: -6, top: 17, width: 12, height: 2, borderTopWidth: 2 },
  indRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1 },
  indKey: { width: 100, fontSize: 13 },
  indVal: { flex: 1, fontSize: 14 },
  patentRow: { flexDirection: "row", gap: 10, paddingVertical: 12, borderTopWidth: 1, alignItems: "flex-start" },
  patentBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
  patentBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  patentTitle: { fontSize: 13, fontWeight: "500" },
  patentMeta: { fontSize: 11, marginTop: 3 },
  partnerRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderTopWidth: 1 },
  partnerDot: { width: 10, height: 10, borderRadius: 5 },
  partnerName: { fontSize: 14, fontWeight: "700" },
  partnerDir: { fontSize: 12, marginTop: 2 },
});
