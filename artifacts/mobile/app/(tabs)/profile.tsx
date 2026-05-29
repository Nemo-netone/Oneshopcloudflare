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

import { TrustBadges } from "@/components/TrustBadges";
import {
  HERO_BANNER,
  ORDER_TABS,
  PROFILE_BG,
  PRODUCT_LIVER,
  SERVICE_ITEMS,
  VIP_BENEFITS,
} from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites } = useApp();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const bottomInset = Platform.OS === "web" ? 110 : insets.bottom + 70;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero header — pure gradient, no washed-out overlay */}
        <LinearGradient
          colors={[colors.primaryDark, colors.primary, "#2f6a52"]}
          locations={[0, 0.55, 1]}
          style={[styles.hero, { paddingTop: topInset + 12 }]}
        >
          {/* subtle image texture */}
          <Image
            source={PROFILE_BG}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            {...({ style: [StyleSheet.absoluteFill, { opacity: 0.08 }] } as any)}
          />

          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>国肽民安·肽护中华</Text>
              <Text style={styles.heroSub}>科学配比 · 肽养身心</Text>
            </View>
            <Pressable hitSlop={10} style={styles.gearBtn}>
              <Icon name="settings" size={20} color="rgba(255,255,255,0.85)" />
            </Pressable>
          </View>

          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <View style={styles.avatarInner}>
                <Icon name="user" size={32} color="rgba(255,255,255,0.9)" />
              </View>
              <View style={[styles.crownBadge, { backgroundColor: colors.accent }]}>
                <Icon name="award" size={10} color="#fff" />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>肽护健康</Text>
                <View style={[styles.vipPill, { backgroundColor: colors.accent }]}>
                  <Icon name="award" size={9} color="#fff" />
                  <Text style={styles.vipPillText}>VIP会员</Text>
                </View>
              </View>
              <View style={styles.editRow}>
                <Text style={styles.userBio}>国泰民安, 肽养身心</Text>
                <Icon name="edit-2" size={11} color="rgba(255,255,255,0.5)" />
              </View>
              <View style={styles.verifyPill}>
                <Icon name="shield" size={10} color="rgba(255,255,255,0.8)" />
                <Text style={styles.verifyText}>已实名认证</Text>
              </View>
            </View>
            <Pressable style={[styles.openVipBtn, { backgroundColor: colors.accent }]}>
              <Text style={styles.openVipText}>开通会员</Text>
              <Icon name="chevron-right" size={12} color="#fff" />
            </Pressable>
          </View>

          {/* Stats strip inside header */}
          <View style={styles.statsCard}>
            {[
              { v: "2688", l: "积分" },
              { v: "6", l: "优惠券" },
              { v: "VIP", l: "普通会员" },
              { v: "签到", l: "每日得积分" },
            ].map((s, i) => (
              <Pressable key={i} style={styles.statCell}>
                <Text style={styles.statValue}>{s.v}</Text>
                <Text style={styles.statLabel}>{s.l}</Text>
                {i < 3 && <View style={styles.statDivider} />}
              </Pressable>
            ))}
          </View>
        </LinearGradient>

        {/* Orders */}
        <View
          style={[
            styles.cardBlock,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>我的订单</Text>
            <Pressable style={styles.linkRow} onPress={() => router.push("/order-query" as any)}>
              <Text style={[styles.linkText, { color: colors.mutedForeground }]}>查询订单</Text>
              <Icon name="chevron-right" size={12} color={colors.mutedForeground} />
            </Pressable>
          </View>
          <View style={styles.iconRow}>
            {ORDER_TABS.map((o, i) => {
              const circleBgs = ["#e0f0ea", "#edf4fb", "#fdf6e7", "#e8efe7"];
              const circleColors = [colors.primary, "#1a6896", colors.accent, "#2f6a52"];
              return (
                <Pressable key={o.key} style={styles.iconCell}>
                  <View style={[styles.orderIconCircle, { backgroundColor: circleBgs[i] }]}>
                    <Icon name={o.icon as any} size={22} color={circleColors[i]} />
                    {o.badge ? (
                      <View style={[styles.badge, { backgroundColor: colors.destructive }]}>
                        <Text style={styles.badgeText}>{o.badge}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.iconLabel, { color: colors.foreground }]}>{o.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Services */}
        <View
          style={[
            styles.cardBlock,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={[styles.serviceRow]}>
            {SERVICE_ITEMS.slice(0, 4).map((s) => (
              <Pressable
                key={s.key}
                style={styles.iconCell}
                onPress={() => {
                  if (s.key === "favs") router.push("/favorites" as any);
                }}
              >
                <View style={{ position: "relative" }}>
                  <Icon name={s.icon as any} size={22} color={colors.primary} />
                  {s.key === "favs" && favorites.length > 0 && (
                    <View style={{
                      position: "absolute",
                      top: -4,
                      right: -6,
                      backgroundColor: "#e74c3c",
                      width: 15,
                      height: 15,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Text style={{ color: "#fff", fontSize: 8, fontWeight: "700" }}>
                        {favorites.length}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.iconLabel, { color: colors.foreground }]}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
          <View style={[styles.serviceRow, { marginTop: 14 }]}>
            {SERVICE_ITEMS.slice(4, 8).map((s) => {
              const isShield = s.key === "after";
              return (
                <Pressable key={s.key} style={styles.iconCell}>
                  <Icon name={s.icon as any} size={22} color={colors.primary} />
                  <Text style={[styles.iconLabel, { color: colors.foreground }]}>
                    {isShield ? "售后服务" : s.label}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable style={styles.iconCell}>
              <Icon name="shield" size={22} color={colors.primary} />
              <Text style={[styles.iconLabel, { color: colors.foreground }]}>安全中心</Text>
            </Pressable>
          </View>
        </View>

        {/* VIP Benefits */}
        <View
          style={[
            styles.vipBlock,
            { backgroundColor: colors.primaryDark, borderColor: colors.border },
          ]}
        >
          <View style={styles.vipHeader}>
            <View style={styles.vipBadgeRow}>
              <Text style={styles.vipBadge}>VIP</Text>
              <Text style={styles.vipBlockTitle}>会员权益中心</Text>
            </View>
            <Text style={styles.vipBlockSub}>开通会员尊享 10+ 项专属特权</Text>
          </View>
          <View style={styles.vipGrid}>
            {VIP_BENEFITS.map((v) => (
              <View key={v.key} style={styles.vipCell}>
                <View style={[styles.vipIconCircle, { backgroundColor: "rgba(217,185,122,0.18)" }]}>
                  <Icon name={v.icon as any} size={18} color="#d9b97a" />
                </View>
                <Text style={styles.vipLabel}>{v.label}</Text>
                <Text style={styles.vipSub}>{v.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Science card */}
        <ImageBackground
          source={HERO_BANNER}
          style={styles.scienceCard}
          imageStyle={{ borderRadius: 16, opacity: 0.6 }}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.4)"]}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.scienceTitle, { color: colors.primary }]}>
              科学肽科技 护肝新未来
            </Text>
            <Text style={[styles.scienceSub, { color: colors.foreground }]}>
              精准分子营养 · 守护肝脏健康
            </Text>
            <View style={[styles.scienceCta, { borderColor: colors.primary }]}>
              <Text style={[styles.scienceCtaText, { color: colors.primary }]}>
                了解肽科技
              </Text>
              <Icon name="chevron-right" size={11} color={colors.primary} />
            </View>
          </View>
          <Image source={PRODUCT_LIVER} style={styles.scienceImg} resizeMode="contain" />
        </ImageBackground>

        <TrustBadges />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    overflow: "hidden",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
  },
  heroTitle: { fontSize: 16, fontWeight: "700", letterSpacing: 1, color: "#fff" },
  heroSub: { fontSize: 11, marginTop: 3, letterSpacing: 0.5, color: "rgba(255,255,255,0.75)" },
  gearBtn: { padding: 4 },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  crownBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  userName: { fontSize: 17, fontWeight: "700", color: "#fff" },
  vipPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 3,
  },
  vipPillText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  editRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  userBio: { fontSize: 11, color: "rgba(255,255,255,0.75)" },
  verifyPill: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    gap: 4,
  },
  verifyText: { fontSize: 10, fontWeight: "500", color: "rgba(255,255,255,0.8)" },
  openVipBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 8,
    height: 32,
    borderRadius: 16,
    gap: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  openVipText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  statsCard: {
    marginTop: 20,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  statCell: { flex: 1, alignItems: "center", justifyContent: "center", position: "relative" },
  statValue: { color: "#d9b97a", fontSize: 18, fontWeight: "800" },
  statLabel: { color: "rgba(255,255,255,0.75)", fontSize: 10, marginTop: 3 },
  statDivider: {
    position: "absolute",
    right: 0,
    top: 8,
    bottom: 8,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  cardBlock: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },
  cardTitle: { flex: 1, fontSize: 14, fontWeight: "700" },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  linkText: { fontSize: 11 },

  iconRow: { flexDirection: "row", justifyContent: "space-between" },
  serviceRow: { flexDirection: "row", justifyContent: "space-between" },
  iconCell: { flex: 1, alignItems: "center", gap: 6 },
  iconBadge: { position: "relative", padding: 4 },
  orderIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
  iconLabel: { fontSize: 11 },

  vipBlock: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  vipHeader: { flexDirection: "row", alignItems: "center" },
  vipBadgeRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  vipBadge: {
    backgroundColor: "#d9b97a",
    color: "#0f3325",
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  vipBlockTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  vipBlockSub: { color: "rgba(255,255,255,0.75)", fontSize: 11 },
  vipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    gap: 0,
  },
  vipCell: {
    width: "16.66%",
    alignItems: "center",
    gap: 4,
  },
  vipIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  vipLabel: { color: "#fff", fontSize: 11, fontWeight: "600" },
  vipSub: { color: "rgba(255,255,255,0.7)", fontSize: 9 },

  scienceCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 100,
  },
  scienceTitle: { fontSize: 16, fontWeight: "700", letterSpacing: 1 },
  scienceSub: { fontSize: 11, marginTop: 4 },
  scienceCta: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 2,
  },
  scienceCtaText: { fontSize: 11, fontWeight: "600" },
  scienceImg: { width: 70, height: 80 },
});
