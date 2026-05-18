import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandSeal } from "@/components/Brand";
import { TrustBadges } from "@/components/TrustBadges";
import { FEATURE_CARDS, HERO_BANNER } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const NAV_ITEMS: {
  id: string;
  title: string;
  icon: string;
  route: string;
  bg: string;
  iconColor: string;
}[] = [
  { id: "n1", title: "健康评测", icon: "activity",  route: "/health-assessment", bg: "#e0f0ea", iconColor: "#1d4d3a" },
  { id: "n2", title: "护肝知识", icon: "book-open",  route: "/knowledge",         bg: "#fdf6e7", iconColor: "#b8924b" },
  { id: "n3", title: "产品功能", icon: "box",         route: "/functions",         bg: "#e8efe7", iconColor: "#2f6a52" },
  { id: "n4", title: "企业简介", icon: "info",        route: "/company",           bg: "#f4ede0", iconColor: "#8B6040" },
  { id: "n5", title: "首创技术", icon: "cpu",         route: "/tech",              bg: "#eaf3fb", iconColor: "#1a6896" },
  { id: "n6", title: "爱心助农", icon: "heart",       route: "/charity",           bg: "#fdecea", iconColor: "#c0392b" },
];

const CARD_ROUTES: Record<string, string | null> = {
  fc1: "/category",
  fc2: null,
  fc3: null,
  fc4: "/(tabs)/profile",
};

const STATS = [
  { val: "12+", label: "专利技术" },
  { val: "5K+", label: "用户选择" },
  { val: "97%", label: "好评率" },
  { val: "15Y", label: "研发经验" },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const bottomInset = Platform.OS === "web" ? 110 : insets.bottom + 70;

  return (
    <View style={{ flex: 1, backgroundColor: "#f2ede0" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <ImageBackground
        source={HERO_BANNER}
        style={[styles.hero, { paddingTop: topInset + 8 }]}
        resizeMode="cover"
      >
        {/* Lighter top overlay so more of the image shows */}
        <LinearGradient
          colors={[
            "rgba(255,252,245,0.95)",
            "rgba(255,252,245,0.70)",
            "rgba(255,252,245,0.10)",
            "rgba(15,51,37,0.25)",
          ]}
          locations={[0, 0.3, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top bar */}
        <View style={styles.topBar}>
          <BrandSeal size={40} />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Text style={[styles.brandTitle, { color: colors.primaryDark }]}>
              国肽民安·肽护中华
            </Text>
          </View>
          <Pressable
            style={[styles.searchPill, { backgroundColor: "rgba(255,255,255,0.88)", borderColor: colors.border }]}
          >
            <Icon name="search" size={13} color={colors.mutedForeground} />
            <Text style={[styles.searchText, { color: colors.mutedForeground }]}>
              搜索商品、品牌、功效
            </Text>
          </Pressable>
        </View>

        {/* Hero body */}
        <View style={styles.heroBody}>
          {/* Decorative chip */}
          <View style={[styles.heroChip, { backgroundColor: colors.accent, opacity: 0.92 }]}>
            <Icon name="feather" size={10} color="#fff" />
            <Text style={styles.heroChipText}>高F值低聚肽 · 科学护肝</Text>
          </View>

          <Text style={[styles.heroTitle, { color: colors.primaryDark }]}>国泰民安</Text>
          {/* Decorative underline */}
          <View style={styles.heroTitleUnderline}>
            <View style={[styles.heroLine, { backgroundColor: colors.accent }]} />
            <View style={[styles.heroLineThin, { backgroundColor: colors.accent }]} />
          </View>
          <Text style={[styles.heroSub, { color: colors.primary }]}>
            肝安人安 · 肽养身心
          </Text>

          <Pressable
            style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/category" as any)}
          >
            <Text style={styles.exploreBtnText}>探索健康之道</Text>
            <Icon name="chevron-right" size={14} color="#fff" />
          </Pressable>
        </View>
      </ImageBackground>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stats strip ──────────────────────────────────────── */}
        <View style={[styles.statsStrip, { backgroundColor: colors.primaryDark }]}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <View style={styles.statCell}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < STATS.length - 1 && (
                <View style={styles.statDivider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* ── Feature cards ───────────────────────────────────── */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>精选专区</Text>
          </View>
          <View style={styles.featureGrid}>
            {FEATURE_CARDS.map((f) => {
              const dest = CARD_ROUTES[f.id];
              return (
                <Pressable
                  key={f.id}
                  onPress={() => dest ? router.push(dest as any) : undefined}
                  style={({ pressed }) => [
                    styles.featureCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: pressed && dest ? 0.88 : 1,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["rgba(248,244,236,0)", "rgba(232,239,231,0.60)"]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={styles.featureCardLeft}>
                    <Text style={[styles.featureTitle, { color: colors.foreground }]}>
                      {f.title}
                    </Text>
                    <Text style={[styles.featureSub, { color: colors.mutedForeground }]}>
                      {f.subtitle}
                    </Text>
                    <View style={[styles.featureCta, { borderColor: colors.primary }]}>
                      <Text style={[styles.featureCtaText, { color: colors.primary }]}>
                        {f.cta}
                      </Text>
                      <Icon name="chevron-right" size={11} color={colors.primary} />
                    </View>
                  </View>
                  <Image source={f.image} style={styles.featureImg} resizeMode="cover" />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── Quick nav icons ─────────────────────────────────── */}
        <View style={[styles.navSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.navSectionHeader}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>快捷导航</Text>
          </View>
          <View style={styles.iconGrid}>
            {NAV_ITEMS.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => router.push(c.route as any)}
                style={({ pressed }) => [styles.iconCell, { opacity: pressed ? 0.7 : 1 }]}
              >
                <View style={[styles.iconCircle, { backgroundColor: c.bg }]}>
                  <Icon name={c.icon} size={22} color={c.iconColor} />
                </View>
                <Text style={[styles.iconLabel, { color: colors.foreground }]}>{c.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ── Brand science banner ────────────────────────────── */}
        <View style={styles.scienceWrap}>
          <View style={[styles.scienceCard, { backgroundColor: colors.primaryDark }]}>
            <ImageBackground
              source={HERO_BANNER}
              style={StyleSheet.absoluteFill}
              imageStyle={{ opacity: 0.15, borderRadius: 18 }}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.scienceChip}>
                <Icon name="award" size={11} color={colors.accentLight} />
                <Text style={styles.scienceChipText}>肽科技 · 生命力</Text>
              </View>
              <Text style={styles.scienceTitle}>科学配比 · 激活健康因子</Text>
              <Text style={styles.scienceSub}>小麦谷朊粉酶解 · F值≥45.3 · 精准护肝</Text>
              <Pressable style={styles.scienceBtn}>
                <Text style={styles.scienceBtnText}>了解更多</Text>
                <Icon name="chevron-right" size={12} color="#fff" />
              </Pressable>
            </View>
            {/* Stats column */}
            <View style={styles.scienceStats}>
              {[
                { n: "45.3", u: "F值" },
                { n: "97%", u: "纯度" },
                { n: "200Da", u: "分子量" },
              ].map((s) => (
                <View key={s.u} style={styles.scienceStat}>
                  <Text style={styles.scienceStatNum}>{s.n}</Text>
                  <Text style={styles.scienceStatUnit}>{s.u}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Trust badges ────────────────────────────────────── */}
        <TrustBadges />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },
  searchPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchText: { flex: 1, fontSize: 12 },

  heroBody: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  heroChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  heroChipText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 58,
    fontWeight: "900",
    letterSpacing: 8,
    lineHeight: 64,
  },
  heroTitleUnderline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  heroLine: {
    width: 60,
    height: 3,
    borderRadius: 2,
  },
  heroLineThin: {
    width: 20,
    height: 3,
    borderRadius: 2,
    opacity: 0.4,
  },
  heroSub: {
    fontSize: 16,
    letterSpacing: 3,
    fontWeight: "600",
    marginBottom: 20,
  },
  exploreBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 14,
    height: 40,
    borderRadius: 20,
    gap: 4,
    shadowColor: "#0f3325",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  exploreBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  statsStrip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  statCell: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statVal: {
    color: "#d9b97a",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  sectionWrap: {
    paddingTop: 18,
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionAccent: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureCard: {
    width: "48.5%",
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    overflow: "hidden",
    minHeight: 108,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  featureCardLeft: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 4,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  featureSub: {
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
  featureCta: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    gap: 2,
  },
  featureCtaText: {
    fontSize: 10,
    fontWeight: "700",
  },
  featureImg: {
    width: 64,
    height: 78,
    borderRadius: 12,
    alignSelf: "center",
  },

  navSection: {
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  navSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 12,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
  },
  iconCell: {
    width: "33.33%",
    alignItems: "center",
    gap: 7,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  scienceWrap: {
    paddingHorizontal: 14,
    marginTop: 14,
  },
  scienceCard: {
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 140,
  },
  scienceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  scienceChipText: {
    color: "#d9b97a",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  scienceTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
    lineHeight: 24,
  },
  scienceSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 4,
    lineHeight: 16,
  },
  scienceBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  scienceBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  scienceStats: {
    gap: 10,
    alignItems: "flex-end",
    paddingLeft: 16,
  },
  scienceStat: {
    alignItems: "center",
    gap: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 68,
  },
  scienceStatNum: {
    color: "#d9b97a",
    fontSize: 15,
    fontWeight: "800",
  },
  scienceStatUnit: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
  },
});
