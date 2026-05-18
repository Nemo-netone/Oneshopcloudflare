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

type Question = { q: string; opts: string[] };
type Section = { name: string; questions: Question[] };

const SECTIONS: Section[] = [
  {
    name: "生活习惯",
    questions: [
      { q: "您平均每天睡眠时长是？", opts: ["7-9小时", "6-7小时", "5-6小时", "少于5小时"] },
      { q: "您熬夜（晚于23点）的频率？", opts: ["几乎不熬夜", "每周1-2次", "每周3-4次", "几乎每天"] },
      { q: "晨起后您常有疲劳感吗？", opts: ["精力充沛", "轻微疲倦", "明显困倦", "非常疲惫"] },
    ],
  },
  {
    name: "饮食营养",
    questions: [
      { q: "您每日饮水量大约是？", opts: ["≥2000ml", "1500-2000ml", "1000-1500ml", "＜1000ml"] },
      { q: "您每周吃外卖/快餐的频率？", opts: ["几乎不吃", "1-2次", "3-4次", "5次以上"] },
      { q: "您日常蔬菜摄入情况？", opts: ["每餐都有", "每天至少1次", "偶尔吃", "很少吃"] },
      { q: "您偏好高油脂、重口味饮食吗？", opts: ["很少", "偶尔", "经常", "几乎每天"] },
    ],
  },
  {
    name: "应酬饮酒",
    questions: [
      { q: "您平均每周饮酒次数？", opts: ["不喝酒", "1-2次", "3-4次", "5次以上"] },
      { q: "您曾有宿醉（次日头痛恶心）的经历？", opts: ["从未有", "极少有", "偶有发生", "经常发生"] },
      { q: "您的应酬/商务场合频率？", opts: ["几乎没有", "每月1-3次", "每周1-2次", "几乎每天"] },
    ],
  },
  {
    name: "运动压力",
    questions: [
      { q: "您每周规律运动的时长合计？", opts: ["≥150分钟", "60-150分钟", "30-60分钟", "＜30分钟"] },
      { q: "您的工作/生活压力感受？", opts: ["压力很小", "压力一般", "压力较大", "压力很大"] },
      { q: "您有情绪低落或焦虑的情况吗？", opts: ["从未有", "偶尔有", "经常有", "几乎每天"] },
    ],
  },
  {
    name: "身体信号",
    questions: [
      { q: "您是否有口干口苦的感觉？", opts: ["从不", "偶尔", "经常", "几乎每天"] },
      { q: "您的体重在近期有明显波动吗？", opts: ["稳定正常", "轻微波动", "明显波动", "大幅度变化"] },
      { q: "您的消化情况如何？", opts: ["消化良好", "轻微不适", "经常胀气", "明显消化不良"] },
      { q: "您有皮肤暗黄、眼白发黄的情况吗？", opts: ["没有", "轻微", "较明显", "明显"] },
    ],
  },
  {
    name: "保健意识",
    questions: [
      { q: "您每年进行体检的频率？", opts: ["每年2次以上", "每年1次", "2-3年1次", "从不体检"] },
      { q: "您有规律服用保健品的习惯吗？", opts: ["坚持服用", "偶尔服用", "很少服用", "从不服用"] },
      { q: "您对自己的健康状况评估？", opts: ["非常健康", "比较健康", "一般", "需要改善"] },
    ],
  },
];

const ALL_QUESTIONS: (Question & { section: string })[] = SECTIONS.flatMap((s) =>
  s.questions.map((q) => ({ ...q, section: s.name }))
);

const SECTION_COLORS = ["#2f6a52", "#4a8a6e", "#b8924b", "#c0392b", "#8e44ad", "#1a6896"];

export default function HealthAssessmentScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const total = ALL_QUESTIONS.length;
  const progress = current / total;
  const q = ALL_QUESTIONS[current];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (current + 1 >= total) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const score = answers.reduce((s, a) => s + (3 - a) * 5, 0);
  const maxScore = total * 15;
  const pct = Math.round((score / maxScore) * 100);
  const grade =
    pct >= 80 ? "优秀" : pct >= 65 ? "良好" : pct >= 50 ? "一般" : "需关注";
  const gradeColor =
    pct >= 80 ? "#2f6a52" : pct >= 65 ? "#4a8a6e" : pct >= 50 ? "#b8924b" : "#c0392b";

  const sectionScores = SECTIONS.map((s) => {
    const qs = ALL_QUESTIONS.filter((q) => q.section === s.name);
    const base = ALL_QUESTIONS.findIndex((q) => q.section === s.name);
    const sAnswers = qs.map((_, i) => answers[base + i] ?? 0);
    const sp = Math.round(
      (sAnswers.reduce((a, v) => a + (3 - v), 0) / (qs.length * 3)) * 100
    );
    return { name: s.name, score: sp };
  });

  const weakest = sectionScores.reduce((a, b) => (a.score < b.score ? a : b));
  const strongest = sectionScores.reduce((a, b) => (a.score > b.score ? a : b));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>健康画像测评</Text>
          <Text style={styles.headerSub}>
            {done ? "评测完成，查看您的健康报告" : `${total} 题快速评估 · 科学精准`}
          </Text>
        </View>
        <View style={{ width: 32 }} />
      </LinearGradient>

      {done ? (
        /* ── RESULT PAGE ── */
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 32, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Grade card */}
          <View style={[styles.gradeCard, { borderColor: gradeColor }]}>
            <LinearGradient
              colors={[gradeColor + "22", gradeColor + "08"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.gradeCircle, { borderColor: gradeColor }]}>
              <Text style={[styles.gradeNum, { color: gradeColor }]}>{pct}</Text>
              <Text style={[styles.gradeUnit, { color: gradeColor }]}>分</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={[styles.gradeLabel, { color: gradeColor }]}>健康等级：{grade}</Text>
              <Text style={[styles.gradeSub, { color: colors.mutedForeground }]}>
                综合评估您的健康指数得分
              </Text>
              <Text style={[styles.gradeDesc, { color: colors.foreground }]}>
                {pct >= 80
                  ? "您的整体健康状况优秀，继续保持良好生活习惯，坚持日常养护。"
                  : pct >= 65
                  ? "健康状况良好，局部维度有提升空间，建议针对性调理。"
                  : pct >= 50
                  ? "部分健康维度需要关注，建议及时调整生活方式并进行健康干预。"
                  : "多个健康维度存在明显风险，建议尽快进行专业健康管理。"}
              </Text>
            </View>
          </View>

          {/* Six-dimension radar */}
          <View style={[styles.card, { borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>六维健康画像</Text>
            {sectionScores.map((s, i) => (
              <View key={s.name} style={styles.dimRow}>
                <Text style={[styles.dimName, { color: colors.foreground }]}>{s.name}</Text>
                <View style={[styles.dimBarBg, { backgroundColor: colors.muted }]}>
                  <View
                    style={[
                      styles.dimBarFill,
                      {
                        width: `${s.score}%`,
                        backgroundColor:
                          s.score >= 80 ? "#2f6a52" : s.score >= 60 ? "#4a8a6e" : s.score >= 40 ? "#b8924b" : "#c0392b",
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.dimScore, { color: colors.mutedForeground }]}>{s.score}%</Text>
              </View>
            ))}
            <View style={styles.dimFooter}>
              <View style={[styles.dimTag, { backgroundColor: "#c0392b22", borderColor: "#c0392b" }]}>
                <Icon name="alert-circle" size={11} color="#c0392b" />
                <Text style={{ fontSize: 11, color: "#c0392b" }}>最需关注：{weakest.name}</Text>
              </View>
              <View style={[styles.dimTag, { backgroundColor: "#2f6a5222", borderColor: "#2f6a52" }]}>
                <Icon name="check-circle" size={11} color="#2f6a52" />
                <Text style={{ fontSize: 11, color: "#2f6a52" }}>表现最好：{strongest.name}</Text>
              </View>
            </View>
          </View>

          {/* Product recommendation */}
          <LinearGradient
            colors={[colors.accent, "#d9b97a"]}
            style={styles.recCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="star" size={14} color="#fff" />
            <Text style={styles.recLabel}>智能推荐</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.recTitle}>
                {weakest.name === "应酬饮酒" ? "护肝肽® 醒酒冲剂" : "护肝肽® 小分子肽口服液"}
              </Text>
              <Text style={styles.recSub}>根据您的【{weakest.name}】维度专项推荐</Text>
            </View>
            <Pressable
              onPress={() => router.push("/product/p1" as any)}
              style={styles.recBtn}
            >
              <Text style={styles.recBtnText}>查看详情</Text>
              <Icon name="chevron-right" size={12} color={colors.accent} />
            </Pressable>
          </LinearGradient>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => { setAnswers([]); setCurrent(0); setDone(false); }}
              style={[styles.actionBtn, { borderColor: colors.primary }]}
            >
              <Icon name="refresh-cw" size={14} color={colors.primary} />
              <Text style={[styles.actionBtnText, { color: colors.primary }]}>重新测评</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/category" as any)}
              style={[styles.actionBtn, { backgroundColor: colors.primary, borderColor: colors.primary }]}
            >
              <Icon name="shopping-bag" size={14} color="#fff" />
              <Text style={[styles.actionBtnText, { color: "#fff" }]}>去逛商城</Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        /* ── QUIZ PAGE ── */
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Progress */}
          <View style={styles.progressRow}>
            <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
              第 <Text style={{ color: colors.primary, fontWeight: "700" }}>{current + 1}</Text> / {total} 题
            </Text>
            <View style={[styles.sectionTag, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
              <Text style={[styles.sectionTagText, { color: colors.primary }]}>{q.section}</Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.muted }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%`, backgroundColor: colors.accent },
              ]}
            />
          </View>

          {/* Question */}
          <Text style={[styles.questionText, { color: colors.foreground }]}>{q.q}</Text>

          {/* Options */}
          <View style={{ gap: 12, marginTop: 24 }}>
            {q.opts.map((opt, i) => (
              <Pressable
                key={i}
                onPress={() => handleAnswer(i)}
                style={({ pressed }) => [
                  styles.optBtn,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View style={[styles.optIndex, { backgroundColor: colors.surfaceJade }]}>
                  <Text style={[styles.optIndexText, { color: colors.primary }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optText, { color: colors.foreground }]}>{opt}</Text>
                <Icon name="chevron-right" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
          </View>

          {/* Section dots */}
          <View style={styles.sectionsRow}>
            {SECTIONS.map((s, i) => {
              const sectionStart = ALL_QUESTIONS.findIndex((q) => q.section === s.name);
              const active = current >= sectionStart;
              return (
                <View key={s.name} style={styles.sectionDotWrap}>
                  <View
                    style={[
                      styles.sectionDot,
                      { backgroundColor: active ? SECTION_COLORS[i] : colors.muted },
                    ]}
                  />
                  <Text style={[styles.sectionDotLabel, { color: active ? colors.foreground : colors.mutedForeground }]}>
                    {s.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 },

  progressRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progressText: { fontSize: 13 },
  sectionTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, borderWidth: 1 },
  sectionTagText: { fontSize: 11, fontWeight: "600" },
  progressBar: { height: 4, borderRadius: 2, marginTop: 10, overflow: "hidden" },
  progressFill: { height: 4, borderRadius: 2 },
  questionText: { fontSize: 20, fontWeight: "700", lineHeight: 30, marginTop: 28 },

  optBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  optIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  optIndexText: { fontSize: 13, fontWeight: "700" },
  optText: { flex: 1, fontSize: 15 },

  sectionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    paddingHorizontal: 4,
  },
  sectionDotWrap: { alignItems: "center", gap: 4 },
  sectionDot: { width: 8, height: 8, borderRadius: 4 },
  sectionDotLabel: { fontSize: 9 },

  gradeCard: {
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  gradeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  gradeNum: { fontSize: 28, fontWeight: "800" },
  gradeUnit: { fontSize: 11, marginTop: -4 },
  gradeLabel: { fontSize: 16, fontWeight: "700" },
  gradeSub: { fontSize: 11, marginTop: 2 },
  gradeDesc: { fontSize: 12, lineHeight: 18, marginTop: 6 },

  card: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },

  dimRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 },
  dimName: { width: 64, fontSize: 11 },
  dimBarBg: { flex: 1, height: 7, borderRadius: 4, overflow: "hidden" },
  dimBarFill: { height: 7, borderRadius: 4 },
  dimScore: { width: 32, fontSize: 11, textAlign: "right" },
  dimFooter: { flexDirection: "row", gap: 8, marginTop: 8 },
  dimTag: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
  },

  recCard: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  recLabel: { color: "#fff", fontSize: 11, fontWeight: "600", marginLeft: 4 },
  recTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  recSub: { color: "rgba(255,255,255,0.85)", fontSize: 11, marginTop: 2 },
  recBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 2,
  },
  recBtnText: { fontSize: 11, fontWeight: "700", color: "#b8924b" },

  actionsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    gap: 8,
  },
  actionBtnText: { fontSize: 14, fontWeight: "700" },
});
