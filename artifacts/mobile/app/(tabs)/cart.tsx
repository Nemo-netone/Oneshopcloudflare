import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
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

import { useApp } from "@/context/AppContext";
import {
  GIFT_BOX,
  HERO_BANNER,
  RECOMMEND_PRODUCT,
  VIP_CARD,
} from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function CartScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const { cartItems, updateCartItem, removeFromCart, addToCart } = useApp();

  const allSelected = cartItems.length > 0 && cartItems.every((i) => i.selected);
  const subtotal = cartItems
    .filter((i) => i.selected)
    .reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal > 0 ? 20 : 0;
  const total = Math.max(0, subtotal - discount);
  const selectedCount = cartItems.filter((i) => i.selected).length;

  const handleDelete = (id: string, name: string) => {
    Alert.alert("删除商品", `确定要将"${name}"从购物车中移除吗？`, [
      { text: "取消", style: "cancel" },
      {
        text: "删除",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
    ]);
  };

  const handleAddRecommend = () => {
    addToCart({
      id: RECOMMEND_PRODUCT.id,
      name: RECOMMEND_PRODUCT.name,
      image: GIFT_BOX,
      price: RECOMMEND_PRODUCT.price,
      spec: "益生菌固体饮料",
      badge: "推荐",
      tags: ["益生元", "肠道健康", "营养补充"],
      originalPrice: RECOMMEND_PRODUCT.originalPrice,
    });
  };

  const handleCheckout = () => {
    if (selectedCount === 0) {
      Alert.alert("提示", "请先选择要结算的商品");
      return;
    }
    router.push("/checkout" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + (Platform.OS === "web" ? 170 : 130),
          paddingTop: topInset + 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.push("/")}
            style={[styles.iconBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
          >
            <Icon name="home" size={16} color={colors.foreground} />
          </Pressable>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[styles.title, { color: colors.foreground }]}>购物车</Text>
            <Text style={[styles.subtitle, { color: colors.accent }]}>国肽民安·肽护中华</Text>
          </View>
          <Pressable
            style={[styles.dotsBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
          >
            <Icon name="more-horizontal" size={14} color={colors.mutedForeground} />
            <View style={[styles.dotsDivider, { backgroundColor: colors.border }]} />
            <View style={[styles.dotsCircle, { borderColor: colors.mutedForeground }]} />
          </Pressable>
        </View>

        {/* Trust banner */}
        <ImageBackground
          source={HERO_BANNER}
          style={styles.trustBanner}
          imageStyle={{ borderRadius: 18 }}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.6)"]}
            style={[StyleSheet.absoluteFill, { borderRadius: 18 }]}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.trustTitle, { color: colors.primary }]}>
              肽护健康 · 安心选购
            </Text>
            <Text style={[styles.trustSub, { color: colors.primary }]}>
              科学肽科技 · 呵护肝健康
            </Text>
            <View style={styles.trustTagRow}>
              {[
                { icon: "feather", t: "严选原料" },
                { icon: "package", t: "科学配比" },
                { icon: "shield", t: "安心品质" },
                { icon: "headphones", t: "售后无忧" },
              ].map((b) => (
                <View
                  key={b.t}
                  style={[
                    styles.trustTag,
                    { backgroundColor: "rgba(255,255,255,0.6)" },
                  ]}
                >
                  <Icon name={b.icon as any} size={10} color={colors.primary} />
                  <Text style={[styles.trustTagText, { color: colors.primary }]}>{b.t}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.shieldBig, { backgroundColor: colors.primary }]}>
            <Text style={styles.shieldText}>肽</Text>
          </View>
        </ImageBackground>

        {/* Section header */}
        <View style={styles.sectionInfo}>
          <View style={styles.sectionInfoLeft}>
            <Icon name="bar-chart-2" size={12} color={colors.primary} />
            <Text style={[styles.sectionInfoText, { color: colors.foreground }]}>
              国肽民安专注肽科技
            </Text>
            <View style={[styles.sectionDivider, { backgroundColor: colors.border }]} />
            <Icon name="shield" size={12} color={colors.primary} />
            <Text style={[styles.sectionInfoText, { color: colors.foreground }]}>
              科学守护国人肝健康
            </Text>
          </View>
          <Pressable style={styles.linkRow}>
            <Text style={[styles.linkText, { color: colors.mutedForeground }]}>查看保障</Text>
            <Icon name="chevron-right" size={12} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {/* Empty state */}
        {cartItems.length === 0 && (
          <View style={styles.emptyWrap}>
            <Icon name="shopping-cart" size={52} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              购物车空空如也
            </Text>
            <Pressable
              onPress={() => router.push("/category" as any)}
              style={[styles.shopBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.shopBtnText}>去选购</Text>
            </Pressable>
          </View>
        )}

        {/* Cart items */}
        {cartItems.map((it) => (
          <View
            key={it.id}
            style={[styles.itemRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Pressable
              onPress={() => updateCartItem(it.id, { selected: !it.selected })}
              style={[
                styles.checkbox,
                {
                  backgroundColor: it.selected ? colors.primary : "transparent",
                  borderColor: it.selected ? colors.primary : colors.border,
                },
              ]}
            >
              {it.selected && <Icon name="check" size={14} color="#fff" />}
            </Pressable>

            <Image source={it.image} style={styles.itemImg} resizeMode="cover" />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={styles.itemHeader}>
                <Text
                  style={[styles.itemName, { color: colors.foreground }]}
                  numberOfLines={1}
                >
                  {it.name}
                </Text>
                {it.badge && (
                  <View style={[styles.itemBadge, { borderColor: colors.accent }]}>
                    <Text style={[styles.itemBadgeText, { color: colors.accent }]}>
                      {it.badge}
                    </Text>
                  </View>
                )}
                <Pressable
                  hitSlop={8}
                  style={{ marginLeft: "auto" }}
                  onPress={() => handleDelete(it.id, it.name)}
                >
                  <Icon name="trash-2" size={14} color={colors.mutedForeground} />
                </Pressable>
              </View>
              <Text style={[styles.itemSpec, { color: colors.mutedForeground }]}>
                {it.spec}
              </Text>
              <View style={styles.itemTags}>
                {it.tags.map((t) => (
                  <View
                    key={t}
                    style={[
                      styles.itemTag,
                      { backgroundColor: colors.surfaceJade, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.itemTagText, { color: colors.primary }]}>{t}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.itemBottom}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text style={[styles.priceMark, { color: colors.price }]}>¥</Text>
                  <Text style={[styles.priceMain, { color: colors.price }]}>{it.price}</Text>
                  <Text style={[styles.priceCent, { color: colors.price }]}>.00</Text>
                </View>
                <View style={[styles.qtyWrap, { borderColor: colors.border }]}>
                  <Pressable
                    onPress={() => updateCartItem(it.id, { qty: Math.max(1, it.qty - 1) })}
                    style={styles.qtyBtn}
                  >
                    <Icon name="minus" size={12} color={colors.foreground} />
                  </Pressable>
                  <Text style={[styles.qtyNum, { color: colors.foreground }]}>{it.qty}</Text>
                  <Pressable
                    onPress={() => updateCartItem(it.id, { qty: it.qty + 1 })}
                    style={styles.qtyBtn}
                  >
                    <Icon name="plus" size={12} color={colors.foreground} />
                  </Pressable>
                </View>
              </View>
              <Text style={[styles.itemTotal, { color: colors.mutedForeground }]}>
                小计{" "}
                <Text style={{ color: colors.price, fontWeight: "700" }}>
                  ¥{(it.price * it.qty).toFixed(2)}
                </Text>
              </Text>
            </View>
          </View>
        ))}

        {/* Recommend + VIP row */}
        <View style={styles.recommendRow}>
          <View
            style={[
              styles.recommendCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.recommendHeader}>
              <Text style={[styles.recommendBadge, { color: colors.primary }]}>搭配推荐</Text>
              <Text style={[styles.recommendHeaderSub, { color: colors.mutedForeground }]}>
                科学加乘护肝力
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Image source={GIFT_BOX} style={styles.recommendImg} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text
                  style={[styles.recommendName, { color: colors.foreground }]}
                  numberOfLines={1}
                >
                  {RECOMMEND_PRODUCT.name}
                </Text>
                <Text
                  style={[styles.recommendDesc, { color: colors.foreground }]}
                  numberOfLines={1}
                >
                  {RECOMMEND_PRODUCT.desc}
                </Text>
                <Text
                  style={[styles.recommendDetail, { color: colors.mutedForeground }]}
                  numberOfLines={2}
                >
                  {RECOMMEND_PRODUCT.detail}
                </Text>
                <View style={styles.recommendBottom}>
                  <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                    <Text style={[styles.priceMark, { color: colors.price }]}>¥</Text>
                    <Text
                      style={[styles.priceMain, { color: colors.price, fontSize: 16 }]}
                    >
                      {RECOMMEND_PRODUCT.price}
                    </Text>
                    <Text style={[styles.priceOriginal, { color: colors.mutedForeground }]}>
                      ¥{RECOMMEND_PRODUCT.originalPrice}
                    </Text>
                  </View>
                  <Pressable
                    onPress={handleAddRecommend}
                    style={[
                      styles.addBtn,
                      { borderColor: colors.accent, backgroundColor: colors.surfaceCream },
                    ]}
                  >
                    <Icon name="plus" size={10} color={colors.accent} />
                    <Text style={[styles.addBtnText, { color: colors.accent }]}>加入购物车</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[styles.miniVip, { backgroundColor: colors.primaryDark }]}
          >
            <View style={styles.miniVipHeader}>
              <Text style={styles.miniVipTitle}>会员专属权益</Text>
            </View>
            <Image source={VIP_CARD} style={styles.miniVipImg} resizeMode="contain" />
            <View style={styles.miniVipBenefits}>
              <Text style={styles.miniVipBenefit}>购物返积分 最高5%</Text>
              <Text style={styles.miniVipBenefit}>专享折扣价 9.5折起</Text>
              <Text style={styles.miniVipBenefit}>生日礼遇 双倍积分</Text>
              <Text style={styles.miniVipBenefit}>专属客服 1V1服务</Text>
            </View>
            <Pressable style={[styles.miniVipCta, { backgroundColor: colors.accent }]}>
              <Text style={styles.miniVipCtaText}>立即开通</Text>
            </Pressable>
          </View>
        </View>

        {/* Status row */}
        {cartItems.length > 0 && (
          <>
            <View
              style={[
                styles.statusRow,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Icon name="check-circle" size={14} color={colors.primary} />
              <Text style={[styles.statusText, { color: colors.foreground }]}>
                已选 <Text style={{ fontWeight: "700" }}>{selectedCount}</Text> 件商品
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={[styles.statusRight, { color: colors.accent }]}>
                优惠券 已优惠 ¥{discount.toFixed(2)} ▾
              </Text>
            </View>
            <View
              style={[
                styles.statusRow,
                { backgroundColor: colors.card, borderColor: colors.border, marginTop: -1 },
              ]}
            >
              <Icon name="truck" size={14} color={colors.primary} />
              <Text style={[styles.statusText, { color: colors.foreground }]}>满299元免运费</Text>
              <View style={{ width: 14 }} />
              <Icon name="award" size={14} color={colors.primary} />
              <Text style={[styles.statusText, { color: colors.foreground }]}>
                预计可得积分{" "}
                <Text style={{ color: colors.accent, fontWeight: "700" }}>
                  +{Math.floor(total / 10) * 6}
                </Text>
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom checkout bar */}
      <View
        style={[
          styles.checkoutBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + (Platform.OS === "web" ? 84 : 70),
          },
        ]}
      >
        <Pressable
          style={styles.allSelect}
          onPress={() =>
            cartItems.forEach((i) => updateCartItem(i.id, { selected: !allSelected }))
          }
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: allSelected ? colors.primary : "transparent",
                borderColor: allSelected ? colors.primary : colors.border,
              },
            ]}
          >
            {allSelected && <Icon name="check" size={14} color="#fff" />}
          </View>
          <Text style={[styles.allSelectText, { color: colors.foreground }]}>全选</Text>
        </Pressable>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>合计：</Text>
            <Text style={[styles.priceMark, { color: colors.price }]}>¥</Text>
            <Text style={[styles.totalMain, { color: colors.price }]}>{total}</Text>
            <Text style={[styles.priceCent, { color: colors.price }]}>.00</Text>
          </View>
          {discount > 0 && (
            <Text style={[styles.totalSub, { color: colors.accent }]}>
              已优惠 ¥{discount.toFixed(2)} ▴
            </Text>
          )}
        </View>

        <Pressable
          onPress={handleCheckout}
          style={[
            styles.checkoutBtn,
            { backgroundColor: selectedCount > 0 ? colors.primary : colors.mutedForeground },
          ]}
        >
          <Text style={styles.checkoutBtnText}>
            去结算{selectedCount > 0 ? `(${selectedCount})` : ""}
          </Text>
        </Pressable>
      </View>
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
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 11, marginTop: 2, letterSpacing: 1 },
  dotsBtn: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    gap: 8,
  },
  dotsDivider: { width: 1, height: 14 },
  dotsCircle: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5 },

  trustBanner: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    minHeight: 130,
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  trustTitle: { fontSize: 18, fontWeight: "700", letterSpacing: 2 },
  trustSub: { fontSize: 12, marginTop: 4, letterSpacing: 1 },
  trustTagRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12, gap: 6 },
  trustTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  trustTagText: { fontSize: 10, fontWeight: "500" },
  shieldBig: {
    width: 70,
    height: 80,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    transform: [{ rotate: "-2deg" }],
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  shieldText: { color: "#d9b97a", fontSize: 32, fontWeight: "700" },

  sectionInfo: {
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  sectionInfoLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionInfoText: { fontSize: 11, fontWeight: "500" },
  sectionDivider: { width: 1, height: 10, marginHorizontal: 4 },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  linkText: { fontSize: 11 },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: { fontSize: 15, fontWeight: "500" },
  shopBtn: {
    paddingHorizontal: 28,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  shopBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  itemRow: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  itemImg: {
    width: 78,
    height: 78,
    borderRadius: 10,
    marginLeft: 10,
  },
  itemHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  itemName: { flex: 0, fontSize: 14, fontWeight: "600", maxWidth: "70%" },
  itemBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
  },
  itemBadgeText: { fontSize: 9, fontWeight: "600" },
  itemSpec: { fontSize: 11, marginTop: 4 },
  itemTags: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, gap: 4 },
  itemTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  itemTagText: { fontSize: 9 },
  itemBottom: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceMark: { fontSize: 11, fontWeight: "700" },
  priceMain: { fontSize: 18, fontWeight: "700" },
  priceCent: { fontSize: 11, fontWeight: "700" },
  priceOriginal: {
    fontSize: 11,
    marginLeft: 6,
    textDecorationLine: "line-through",
  },
  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  qtyBtn: { width: 26, height: 26, alignItems: "center", justifyContent: "center" },
  qtyNum: { width: 28, textAlign: "center", fontSize: 12, fontWeight: "600" },
  itemTotal: { fontSize: 11, marginTop: 4, alignSelf: "flex-end" },

  recommendRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 8,
  },
  recommendCard: {
    flex: 1.4,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  recommendHeader: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  recommendBadge: { fontSize: 12, fontWeight: "700" },
  recommendHeaderSub: { fontSize: 11 },
  recommendImg: { width: 56, height: 56, borderRadius: 8 },
  recommendName: { fontSize: 13, fontWeight: "600" },
  recommendDesc: { fontSize: 11, marginTop: 1 },
  recommendDetail: { fontSize: 10, marginTop: 2, lineHeight: 14 },
  recommendBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    gap: 2,
  },
  addBtnText: { fontSize: 9, fontWeight: "600" },

  miniVip: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    overflow: "hidden",
    minHeight: 140,
  },
  miniVipHeader: { flexDirection: "row" },
  miniVipTitle: { color: "#fff", fontSize: 11, fontWeight: "600" },
  miniVipImg: { width: 50, height: 32, alignSelf: "center", marginVertical: 6 },
  miniVipBenefits: { gap: 2 },
  miniVipBenefit: { color: "rgba(255,255,255,0.85)", fontSize: 9 },
  miniVipCta: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  miniVipCtaText: { fontSize: 10, fontWeight: "700", color: "#0f3325" },

  statusRow: {
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: { fontSize: 12 },
  statusRight: { fontSize: 12, fontWeight: "500" },

  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    gap: 10,
  },
  allSelect: { flexDirection: "row", alignItems: "center", gap: 6 },
  allSelectText: { fontSize: 13, fontWeight: "500" },
  totalLabel: { fontSize: 12 },
  totalMain: { fontSize: 22, fontWeight: "800" },
  totalSub: { fontSize: 11, marginTop: 2 },
  checkoutBtn: {
    paddingHorizontal: 28,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
