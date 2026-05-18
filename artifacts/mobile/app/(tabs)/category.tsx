import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandSeal } from "@/components/Brand";
import { HERO_BANNER, PRODUCT_GRANULE, PRODUCT_ORAL, PRODUCT_POWDER } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const PRODUCTS = [
  {
    id: "p2",
    name: "肽润肝清® 护肝醒酒冲剂",
    badge: "热销",
    tag: "速溶颗粒",
    tagColor: "#b8631a",
    price: 135,
    originalPrice: 168,
    priceLabel: "¥135",
    priceSub: "原价¥168 · 会员再享9折",
    highlights: ["高F值低聚肽", "3g/袋×30袋", "B族维生素"],
    certs: ["特殊膳食食品", "GB 24154", "阴凉干燥储存"],
    desc: "特殊膳食食品，以高F值低聚肽为核心成分，速溶颗粒剂型，温水冲服，适合肝代谢失调及机体细胞修复需求人群，每日两次每次一袋。",
    sales: "已售 1,230+ 盒",
    image: PRODUCT_GRANULE,
    theme: "#b8631a",
    themeBg: "#fdf3e7",
  },
  {
    id: "p1",
    name: "小麦低聚肽原料",
    badge: "企业专供",
    tag: "B端采购",
    tagColor: "#b8924b",
    price: null,
    priceLabel: "¥20万/吨",
    priceSub: "支持定制规格 · 贴牌OEM",
    highlights: ["F值≥45.3", "肽纯度≥97%", "12项专利"],
    certs: ["ISO22000", "GMP", "出口欧盟"],
    desc: "以河南小麦谷朊粉为原料，通过酶解工艺制备的高F值低聚肽粉末，适用于食品、保健品、医药等多行业应用，支持OEM定制。",
    sales: "已合作 5+ 家企业",
    image: PRODUCT_POWDER,
    theme: "#b8924b",
    themeBg: "#fdf6e7",
  },
  {
    id: "p3",
    name: "珀珀肝宁® 高F值小麦低聚肽口服液",
    badge: "128人付款",
    tag: "液态直吸",
    tagColor: "#1a6896",
    price: 199,
    originalPrice: 259,
    priceLabel: "¥199",
    priceSub: "原价¥259 · 限时特惠",
    highlights: ["高F值低聚肽", "辅酶Q10 30mg", "10ml/支"],
    certs: ["液态直吸", "开盖即饮", "24个月保质"],
    desc: "肽护中华品牌出品，液态直接吸收，高F值小麦低聚肽结合辅酶Q10与维生素E协同增效，全面激活肝细胞活力，保质期24个月。",
    sales: "好评率 97.8%",
    image: PRODUCT_ORAL,
    theme: "#1a6896",
    themeBg: "#edf4fb",
  },
];

export default function CategoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const bottomInset = Platform.OS === "web" ? 110 : insets.bottom + 70;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.includes(query) ||
          p.desc.includes(query) ||
          p.highlights.some((h) => h.includes(query))
      )
    : PRODUCTS;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomInset, paddingTop: topInset + 8 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <BrandSeal size={42} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.brandTitle, { color: colors.foreground }]}>
                国肽民安·肽护中华
              </Text>
              <Text style={[styles.brandSub, { color: colors.mutedForeground }]}>
                科技肽能·健康守护每一刻
              </Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={[styles.searchInputWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Icon name="search" size={16} color={colors.mutedForeground} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="搜索产品、成分、功效"
              placeholderTextColor={colors.mutedForeground}
              style={[styles.searchInput, { color: colors.foreground }]}
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")}>
                <Icon name="x" size={14} color={colors.mutedForeground} />
              </Pressable>
            )}
          </View>
          <Pressable style={[styles.searchBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.searchBtnText}>搜索</Text>
          </Pressable>
        </View>

        {/* Hero promo */}
        <Pressable
          onPress={() => router.push("/product/p1" as any)}
          style={({ pressed }) => [styles.promo, { opacity: pressed ? 0.92 : 1 }]}
        >
          <ImageBackground source={HERO_BANNER} style={styles.promoBg} imageStyle={{ borderRadius: 18 }}>
            <LinearGradient
              colors={["rgba(15,51,37,0.55)", "rgba(15,51,37,0.88)"]}
              style={[StyleSheet.absoluteFill, { borderRadius: 18 }]}
            />
            <View style={styles.promoChipRow}>
              <View style={styles.promoChip}>
                <Icon name="award" size={11} color="#d9b97a" />
                <Text style={styles.promoChipText}>核心产品专区</Text>
                <Icon name="chevron-right" size={10} color="#fff" />
              </View>
            </View>
            <Text style={styles.promoTitle}>高F值低聚肽</Text>
            <Text style={styles.promoSub}>科学配比 · 精准护肝 · 小麦源萃取</Text>
            <View style={styles.promoTagRow}>
              {["F值≥45.3 精准吸收", "12项自主专利技术", "科学配方 安心品质"].map((t) => (
                <View key={t} style={styles.promoTag}>
                  <Icon name="check-circle" size={10} color="#d9b97a" />
                  <Text style={styles.promoTagText}>{t}</Text>
                </View>
              ))}
            </View>
            <View style={styles.promoCta}>
              <Text style={styles.promoCtaText}>查看全部产品</Text>
              <Icon name="chevron-right" size={12} color="#fff" />
            </View>
          </ImageBackground>
        </Pressable>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>全部产品</Text>
          <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
            共 {filtered.length} 款
          </Text>
        </View>

        {/* Product cards */}
        <View style={styles.productList}>
          {filtered.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => router.push(`/product/${p.id}` as any)}
              style={({ pressed }) => [
                styles.productCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              {/* Image section */}
              <View style={[styles.productImgWrap, { backgroundColor: p.themeBg }]}>
                <Image source={p.image} style={styles.productImg} resizeMode="contain" />
                <View style={[styles.productBadge, { backgroundColor: p.theme }]}>
                  <Text style={styles.productBadgeText}>{p.badge}</Text>
                </View>
              </View>

              {/* Info section */}
              <View style={styles.productInfo}>
                {/* Tag + name */}
                <View style={styles.productNameRow}>
                  <View style={[styles.productTag, { backgroundColor: p.theme + "18", borderColor: p.theme + "55" }]}>
                    <Text style={[styles.productTagText, { color: p.theme }]}>{p.tag}</Text>
                  </View>
                </View>
                <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={2}>
                  {p.name}
                </Text>
                <Text style={[styles.productDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                  {p.desc}
                </Text>

                {/* Highlight pills */}
                <View style={styles.highlightRow}>
                  {p.highlights.map((h) => (
                    <View key={h} style={[styles.highlightPill, { backgroundColor: p.theme + "12", borderColor: p.theme + "40" }]}>
                      <Text style={[styles.highlightText, { color: p.theme }]}>{h}</Text>
                    </View>
                  ))}
                </View>

                {/* Certs */}
                <View style={styles.certRow}>
                  {p.certs.map((c) => (
                    <View key={c} style={[styles.certPill, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
                      <Icon name="check" size={9} color={colors.primary} />
                      <Text style={[styles.certText, { color: colors.primary }]}>{c}</Text>
                    </View>
                  ))}
                </View>

                {/* Price + CTA */}
                <View style={styles.productBottom}>
                  <View>
                    <View style={styles.priceRow}>
                      <Text style={[styles.priceMain, { color: p.theme }]}>{p.priceLabel}</Text>
                      {p.originalPrice && (
                        <Text style={[styles.priceOld, { color: colors.mutedForeground }]}>
                          ¥{p.originalPrice}
                        </Text>
                      )}
                    </View>
                    <Text style={[styles.priceSub, { color: colors.mutedForeground }]}>{p.priceSub}</Text>
                  </View>
                  <View style={[styles.ctaBtn, { backgroundColor: p.theme }]}>
                    <Text style={styles.ctaBtnText}>查看详情</Text>
                    <Icon name="chevron-right" size={12} color="#fff" />
                  </View>
                </View>

                {/* Sales */}
                <View style={styles.salesRow}>
                  <Icon name="users" size={10} color={colors.mutedForeground} />
                  <Text style={[styles.salesText, { color: colors.mutedForeground }]}>{p.sales}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {query.trim() && filtered.length === 0 && (
          <View style={styles.emptyWrap}>
            <Icon name="search" size={40} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              未找到"{query}"相关产品
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  topBarLeft: { flex: 1, flexDirection: "row", alignItems: "center" },
  brandTitle: { fontSize: 14, fontWeight: "700", letterSpacing: 1 },
  brandSub: { fontSize: 11, marginTop: 2 },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 8,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, paddingVertical: 0 },
  searchBtn: {
    height: 42,
    paddingHorizontal: 22,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  promo: { marginHorizontal: 16, marginTop: 14, borderRadius: 18, overflow: "hidden" },
  promoBg: { minHeight: 200, padding: 18, overflow: "hidden" },
  promoChipRow: { flexDirection: "row" },
  promoChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  promoChipText: { color: "#fff", fontSize: 11, fontWeight: "500" },
  promoTitle: { color: "#fff", fontSize: 26, fontWeight: "700", letterSpacing: 2, marginTop: 12 },
  promoSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, letterSpacing: 1, marginTop: 6 },
  promoTagRow: { marginTop: 12, gap: 6 },
  promoTag: { flexDirection: "row", alignItems: "center", gap: 6 },
  promoTagText: { color: "rgba(255,255,255,0.85)", fontSize: 11 },
  promoCta: {
    marginTop: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  promoCtaText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    gap: 8,
  },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "700", flex: 1 },
  sectionSub: { fontSize: 12 },

  productList: { paddingHorizontal: 16, gap: 14 },
  productCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    minHeight: 180,
  },
  productImgWrap: {
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    position: "relative",
  },
  productImg: { width: 100, height: 130 },
  productBadge: {
    position: "absolute",
    top: 10,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  productBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  productInfo: { flex: 1, padding: 12, gap: 6 },
  productNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  productTag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  productTagText: { fontSize: 10, fontWeight: "600" },
  productName: { fontSize: 14, fontWeight: "700", lineHeight: 20 },
  productDesc: { fontSize: 11, lineHeight: 16 },

  highlightRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  highlightPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
  },
  highlightText: { fontSize: 10, fontWeight: "600" },

  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  certPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  certText: { fontSize: 9, fontWeight: "500" },

  productBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 2,
  },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  priceMain: { fontSize: 18, fontWeight: "800" },
  priceOld: { fontSize: 11, textDecorationLine: "line-through" },
  priceSub: { fontSize: 9, marginTop: 2 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 3,
  },
  ctaBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  salesRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  salesText: { fontSize: 10 },

  emptyWrap: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14 },
});
