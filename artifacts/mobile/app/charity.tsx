import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HERO_BANNER } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const ACTIONS = [
  { icon: "book", color: "#2f6a52", title: "种植技术培训", detail: "联合农科院专家，每季度深入合作基地开展规范化种植技术培训，提升小麦品质与亩产量。" },
  { icon: "shield", color: "#b8924b", title: "保底收购", detail: "签署保底价格协议，每年预付定金，农户即便面对市场价格波动也能保障基本收益。" },
  { icon: "book-open", color: "#c0392b", title: "助学计划", detail: "每年拨出专项基金，为合作农户的子女提供助学金，已累计资助学生超过600名。" },
  { icon: "users", color: "#1a6896", title: "脱贫户优先合作", detail: "优先与建档立卡脱贫户签约，并提供免费技术辅导和种子化肥，帮助其实现持续增收。" },
];

const PROVINCES = [
  { name: "河南", cities: "南阳·许昌·驻马店", count: 42 },
  { name: "山东", cities: "菏泽·聊城·德州", count: 31 },
  { name: "安徽", cities: "宿州·亳州·阜阳", count: 24 },
  { name: "陕西", cities: "渭南·咸阳·宝鸡", count: 18 },
  { name: "其他省份", cities: "湖北·河北·江苏等", count: 13 },
];

const FARMERS = [
  { name: "赵大伯", years: 5, area: "河南·南阳 · 30亩", color: "#2f6a52", story: "以前小麦一斤就卖个块把钱，心里总是没底。现在和国泰民安合作，技术有人教、价格有保底，今年多收了3000斤，娃儿的学费再也不愁了。" },
  { name: "李翠芬", years: 3, area: "山东·菏泽 · 18亩", color: "#b8924b", story: "他们的人定期来给我们讲如何控制氮肥、怎么防病虫害，以前从来没人管过我们这些事。品质上去了，收购价比市场价还高，真心感谢。" },
  { name: "陈大军", years: 4, area: "安徽·宿州 · 45亩", color: "#1a6896", story: "我家是建档立卡户，前几年日子很难。加入合作社后，第一年他们就免费给了种子和有机肥，现在年收入增加了一万多，生活越来越好了。" },
];

export default function CharityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const PROGRESS = 0.768;
  const CURRENT = 3840;
  const TARGET = 5000;

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
          <Text style={styles.headerTitle}>爱心助农</Text>
          <Text style={styles.headerSub}>科技赋能农业 · 助力乡村振兴</Text>
        </View>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>

        {/* Banner */}
        <LinearGradient colors={[colors.primary, "#2f6a52"]} style={styles.banner}>
          <Text style={styles.bannerTitle}>科技赋能农业</Text>
          <Text style={styles.bannerTitle}>助力乡村振兴</Text>
          <Text style={styles.bannerSub}>用科技守护麦田，让农民共享健康产业红利</Text>
          <View style={styles.bannerTagRow}>
            {["128个合作基地", "¥4200农户年均增收", "6年深耕农业"].map((t) => (
              <View key={t} style={styles.bannerTag}>
                <Icon name="check-circle" size={11} color="#d9b97a" />
                <Text style={styles.bannerTagText}>{t}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Stats grid */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>助农数据概览</Text>
          <View style={styles.statsGrid}>
            {[
              { v: "1.5亿吨", l: "年大麦产量", icon: "package" },
              { v: "2400万公顷", l: "种植面积", icon: "map" },
              { v: "¥4200/年", l: "农户平均增收", icon: "trending-up" },
              { v: "128个", l: "合作基地", icon: "home" },
            ].map((s) => (
              <View key={s.l} style={[styles.statCell, { backgroundColor: colors.surfaceCream }]}>
                <Icon name={s.icon as any} size={18} color={colors.primary} />
                <Text style={[styles.statV, { color: colors.foreground }]}>{s.v}</Text>
                <Text style={[styles.statL, { color: colors.mutedForeground }]}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Wheat intro */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Image source={HERO_BANNER} style={styles.wheatImg} resizeMode="cover" />
          <Text style={[styles.wheatTitle, { color: colors.foreground }]}>优质冬小麦原料基地</Text>
          <Text style={[styles.wheatDesc, { color: colors.mutedForeground }]}>
            我们严选河南南阳GAP认证基地的优质冬小麦作为核心原料来源。该地区四季分明，土壤富含有机质，小麦蛋白质含量可达14%以上，是国内最优质的小麦蛋白肽原料产区之一。所有原料从种植到收购全程可追溯，确保最高标准的食品安全。
          </Text>
        </View>

        {/* Actions */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>助农行动</Text>
          {ACTIONS.map((a) => (
            <View key={a.title} style={[styles.actionRow, { borderTopColor: colors.border }]}>
              <View style={[styles.actionIcon, { backgroundColor: a.color + "20" }]}>
                <Icon name={a.icon as any} size={18} color={a.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.actionTitle, { color: colors.foreground }]}>{a.title}</Text>
                <Text style={[styles.actionDetail, { color: colors.mutedForeground }]}>{a.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Province distribution */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>合作基地分布</Text>
          {PROVINCES.map((p) => (
            <View key={p.name} style={[styles.provinceRow, { borderTopColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.provinceName, { color: colors.foreground }]}>{p.name}</Text>
                <Text style={[styles.provinceCities, { color: colors.mutedForeground }]}>{p.cities}</Text>
              </View>
              <Text style={[styles.provinceCount, { color: colors.accent }]}>{p.count}</Text>
              <Text style={[styles.provinceUnit, { color: colors.mutedForeground }]}>个</Text>
            </View>
          ))}
        </View>

        {/* Monthly progress */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>本月助农进度</Text>
            <Text style={[styles.progressFraction, { color: colors.accent }]}>{CURRENT.toLocaleString()} / {TARGET.toLocaleString()}份</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.muted }]}>
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={[styles.progressFill, { width: `${PROGRESS * 100}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={[styles.progressNote, { color: colors.mutedForeground }]}>
            距本月目标还差 {(TARGET - CURRENT).toLocaleString()} 份，每笔订单均纳入助农统计
          </Text>
          <View style={styles.progressStats}>
            {[
              { v: "3,840份", l: "营养餐" },
              { v: "12间", l: "图书角" },
              { v: "¥38,400", l: "助学金" },
            ].map((s) => (
              <View key={s.l} style={[styles.progressStat, { backgroundColor: colors.surfaceCream }]}>
                <Text style={[styles.progressStatV, { color: colors.primary }]}>{s.v}</Text>
                <Text style={[styles.progressStatL, { color: colors.mutedForeground }]}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Farmer stories */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>来自麦农的故事</Text>
          {FARMERS.map((f) => (
            <View key={f.name} style={[styles.farmerBlock, { borderTopColor: colors.border }]}>
              <View style={styles.farmerHeader}>
                <View style={[styles.farmerAvatar, { borderColor: f.color, backgroundColor: f.color + "20" }]}>
                  <Text style={[styles.farmerAvatarText, { color: f.color }]}>{f.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.farmerNameRow}>
                    <Text style={[styles.farmerName, { color: colors.foreground }]}>{f.name}</Text>
                    <View style={[styles.yearsBadge, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
                      <Text style={[styles.yearsBadgeText, { color: colors.primary }]}>合作{f.years}年</Text>
                    </View>
                  </View>
                  <Text style={[styles.farmerArea, { color: colors.mutedForeground }]}>{f.area}</Text>
                </View>
              </View>
              <View style={[styles.storyBubble, { backgroundColor: colors.surfaceCream }]}>
                <Text style={[styles.quoteIcon, { color: colors.accent }]}>"</Text>
                <Text style={[styles.storyText, { color: colors.foreground }]}>{f.story}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Warm footer */}
        <View style={[styles.warmFooter, { backgroundColor: "#fce8e8", borderColor: "#f5c6c6" }]}>
          <Icon name="heart" size={16} color="#c0392b" />
          <Text style={[styles.warmText, { color: "#c0392b" }]}>
            每一笔订单，都是您对中国农业的一份温柔助力
          </Text>
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
  bannerTitle: { color: "#fff", fontSize: 24, fontWeight: "800", letterSpacing: 2 },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 8, lineHeight: 18 },
  bannerTagRow: { marginTop: 14, gap: 8 },
  bannerTag: { flexDirection: "row", alignItems: "center", gap: 6 },
  bannerTagText: { color: "rgba(255,255,255,0.9)", fontSize: 12 },
  card: { marginHorizontal: 16, marginTop: 14, padding: 16, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  statCell: { width: "47%", padding: 14, borderRadius: 12, alignItems: "center", gap: 6 },
  statV: { fontSize: 16, fontWeight: "800" },
  statL: { fontSize: 11 },
  wheatImg: { width: "100%", height: 150, borderRadius: 12, marginBottom: 12 },
  wheatTitle: { fontSize: 15, fontWeight: "700", marginBottom: 6 },
  wheatDesc: { fontSize: 13, lineHeight: 22 },
  actionRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 14, borderTopWidth: 1 },
  actionIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  actionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 4 },
  actionDetail: { fontSize: 12, lineHeight: 18 },
  provinceRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderTopWidth: 1 },
  provinceName: { fontSize: 14, fontWeight: "700" },
  provinceCities: { fontSize: 11, marginTop: 2 },
  provinceCount: { fontSize: 26, fontWeight: "800", marginLeft: 8 },
  provinceUnit: { fontSize: 11, alignSelf: "flex-end", marginBottom: 3, marginLeft: 2 },
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  progressFraction: { fontSize: 14, fontWeight: "700" },
  progressBar: { height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: 10, borderRadius: 5 },
  progressNote: { fontSize: 11, marginBottom: 14 },
  progressStats: { flexDirection: "row", gap: 8 },
  progressStat: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center" },
  progressStatV: { fontSize: 14, fontWeight: "700" },
  progressStatL: { fontSize: 11, marginTop: 2 },
  farmerBlock: { paddingTop: 16, borderTopWidth: 1, marginBottom: 4 },
  farmerHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  farmerAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  farmerAvatarText: { fontSize: 20, fontWeight: "700" },
  farmerNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  farmerName: { fontSize: 16, fontWeight: "700" },
  yearsBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1 },
  yearsBadgeText: { fontSize: 11, fontWeight: "600" },
  farmerArea: { fontSize: 11, marginTop: 3 },
  storyBubble: { padding: 14, borderRadius: 12 },
  quoteIcon: { fontSize: 24, fontWeight: "800", lineHeight: 24, marginBottom: 4 },
  storyText: { fontSize: 13, lineHeight: 22 },
  warmFooter: { flexDirection: "row", alignItems: "center", margin: 16, padding: 16, borderRadius: 14, borderWidth: 1, gap: 10 },
  warmText: { flex: 1, fontSize: 13, fontWeight: "600", lineHeight: 20 },
});
