import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const PAYMENT_METHODS = [
  { id: "wechat", label: "微信支付", icon: "smartphone", color: "#07C160" },
  { id: "alipay", label: "支付宝", icon: "credit-card", color: "#1677FF" },
  { id: "bank", label: "银行卡", icon: "layers", color: "#FF6B35" },
];

const ADDRESS = {
  name: "张先生",
  phone: "138 **** 8888",
  address: "河南省郑州市金水区花园路188号",
  detail: "肽护健康大厦 18楼",
};

type PayStep = "idle" | "processing" | "success";

export default function CheckoutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cartItems, clearCart } = useApp();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const [payMethod, setPayMethod] = useState("wechat");
  const [payStep, setPayStep] = useState<PayStep>("idle");
  const [orderId] = useState(() => `GT${Date.now().toString().slice(-8)}`);

  const selectedItems = cartItems.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = selectedItems.length > 0 ? 20 : 0;
  const shipping = subtotal >= 299 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  const handlePay = () => {
    setPayStep("processing");
    setTimeout(() => {
      setPayStep("success");
      clearCart();
    }, 2000);
  };

  const handleBackHome = () => {
    router.replace("/(tabs)" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>确认订单</Text>
        <View style={{ width: 36 }} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + (Platform.OS === "web" ? 140 : 110),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Address */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="map-pin" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>收货地址</Text>
          </View>
          <View style={styles.addressRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.addressNameRow}>
                <Text style={[styles.addressName, { color: colors.foreground }]}>
                  {ADDRESS.name}
                </Text>
                <Text style={[styles.addressPhone, { color: colors.mutedForeground }]}>
                  {ADDRESS.phone}
                </Text>
              </View>
              <Text style={[styles.addressText, { color: colors.mutedForeground }]}>
                {ADDRESS.address}
              </Text>
              <Text style={[styles.addressText, { color: colors.mutedForeground }]}>
                {ADDRESS.detail}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.mutedForeground} />
          </View>
        </View>

        {/* Order items */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="package" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              商品清单 ({selectedItems.length}件)
            </Text>
          </View>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={item.image} style={styles.itemImg} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[styles.itemSpec, { color: colors.mutedForeground }]}>
                  {item.spec}
                </Text>
                <View style={styles.itemBottom}>
                  <Text style={[styles.itemPrice, { color: colors.price }]}>¥{item.price}</Text>
                  <Text style={[styles.itemQty, { color: colors.mutedForeground }]}>
                    ×{item.qty}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment method */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="credit-card" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>支付方式</Text>
          </View>
          {PAYMENT_METHODS.map((pm) => (
            <Pressable
              key={pm.id}
              onPress={() => setPayMethod(pm.id)}
              style={[
                styles.payMethodRow,
                {
                  borderColor:
                    payMethod === pm.id ? colors.primary : colors.border,
                  backgroundColor:
                    payMethod === pm.id ? colors.surfaceJade : "transparent",
                },
              ]}
            >
              <View style={[styles.payMethodIcon, { backgroundColor: pm.color + "18" }]}>
                <Icon name={pm.icon as any} size={18} color={pm.color} />
              </View>
              <Text style={[styles.payMethodLabel, { color: colors.foreground }]}>{pm.label}</Text>
              <View
                style={[
                  styles.radio,
                  {
                    borderColor: payMethod === pm.id ? colors.primary : colors.border,
                    backgroundColor: payMethod === pm.id ? colors.primary : "transparent",
                  },
                ]}
              >
                {payMethod === pm.id && (
                  <Icon name="check" size={10} color="#fff" />
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Price breakdown */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="file-text" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>费用明细</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>商品合计</Text>
            <Text style={[styles.priceVal, { color: colors.foreground }]}>¥{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>优惠折扣</Text>
            <Text style={[styles.priceVal, { color: colors.accent }]}>-¥{discount.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>运费</Text>
            <Text style={[styles.priceVal, { color: shipping === 0 ? colors.primary : colors.foreground }]}>
              {shipping === 0 ? "免运费" : `¥${shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.priceRow}>
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>实付款</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={[styles.totalMark, { color: colors.price }]}>¥</Text>
              <Text style={[styles.totalMain, { color: colors.price }]}>{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={[styles.noteRow, { backgroundColor: colors.surfaceCream }]}>
          <Icon name="info" size={12} color={colors.mutedForeground} />
          <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
            本次为模拟订单，不会产生实际支付。仅用于功能演示。
          </Text>
        </View>
      </ScrollView>

      {/* Bottom pay bar */}
      <View
        style={[
          styles.payBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + (Platform.OS === "web" ? 84 : 10),
          },
        ]}
      >
        <View>
          <Text style={[styles.payBarLabel, { color: colors.mutedForeground }]}>实付款</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={[styles.payBarMark, { color: colors.price }]}>¥</Text>
            <Text style={[styles.payBarAmount, { color: colors.price }]}>{total.toFixed(2)}</Text>
          </View>
        </View>
        <Pressable
          onPress={handlePay}
          style={[styles.payBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.payBtnText}>立即支付</Text>
        </Pressable>
      </View>

      {/* Processing modal */}
      <Modal visible={payStep === "processing"} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.processingCard, { backgroundColor: colors.card }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.processingText, { color: colors.foreground }]}>
              支付处理中...
            </Text>
            <Text style={[styles.processingSubText, { color: colors.mutedForeground }]}>
              请稍候
            </Text>
          </View>
        </View>
      </Modal>

      {/* Success modal */}
      <Modal visible={payStep === "success"} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.successCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.successIconWrap}
            >
              <Icon name="check" size={36} color="#fff" />
            </LinearGradient>
            <Text style={[styles.successTitle, { color: colors.foreground }]}>支付成功！</Text>
            <Text style={[styles.successAmount, { color: colors.price }]}>¥{total.toFixed(2)}</Text>
            <View style={[styles.orderIdRow, { backgroundColor: colors.surfaceCream }]}>
              <Text style={[styles.orderIdLabel, { color: colors.mutedForeground }]}>订单编号</Text>
              <Text style={[styles.orderIdVal, { color: colors.foreground }]}>{orderId}</Text>
            </View>
            <View style={styles.successBenefits}>
              <View style={styles.successBenefitItem}>
                <Icon name="truck" size={14} color={colors.primary} />
                <Text style={[styles.successBenefitText, { color: colors.mutedForeground }]}>
                  预计 2-3 天发货
                </Text>
              </View>
              <View style={styles.successBenefitItem}>
                <Icon name="gift" size={14} color={colors.accent} />
                <Text style={[styles.successBenefitText, { color: colors.mutedForeground }]}>
                  获得积分 +{Math.floor(total / 10) * 10}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={handleBackHome}
              style={[styles.backHomeBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.backHomeBtnText}>返回首页</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  card: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 14, fontWeight: "700" },

  addressRow: { flexDirection: "row", alignItems: "center" },
  addressNameRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 },
  addressName: { fontSize: 15, fontWeight: "700" },
  addressPhone: { fontSize: 13 },
  addressText: { fontSize: 12, lineHeight: 18 },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImg: { width: 64, height: 64, borderRadius: 10 },
  itemName: { fontSize: 13, fontWeight: "600" },
  itemSpec: { fontSize: 11, marginTop: 2 },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  itemPrice: { fontSize: 15, fontWeight: "700" },
  itemQty: { fontSize: 13 },

  payMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  payMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  payMethodLabel: { flex: 1, fontSize: 14, fontWeight: "600" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  priceLabel: { fontSize: 13 },
  priceVal: { fontSize: 13, fontWeight: "600" },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 14, fontWeight: "700" },
  totalMark: { fontSize: 13, fontWeight: "700" },
  totalMain: { fontSize: 22, fontWeight: "800" },

  noteRow: {
    margin: 16,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  noteText: { flex: 1, fontSize: 11, lineHeight: 16 },

  payBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  payBarLabel: { fontSize: 11, marginBottom: 2 },
  payBarMark: { fontSize: 13, fontWeight: "700" },
  payBarAmount: { fontSize: 24, fontWeight: "800" },
  payBtn: {
    paddingHorizontal: 32,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
  },
  payBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  processingCard: {
    width: 200,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    gap: 12,
  },
  processingText: { fontSize: 16, fontWeight: "700" },
  processingSubText: { fontSize: 12 },

  successCard: {
    width: 300,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  successAmount: { fontSize: 32, fontWeight: "800", marginBottom: 16 },
  orderIdRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
    width: "100%",
  },
  orderIdLabel: { fontSize: 12 },
  orderIdVal: { fontSize: 12, fontWeight: "600" },
  successBenefits: { gap: 8, marginBottom: 20, alignSelf: "flex-start", paddingLeft: 8 },
  successBenefitItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  successBenefitText: { fontSize: 13 },
  backHomeBtn: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backHomeBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
