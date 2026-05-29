import { Icon } from "@/components/Icon";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import { cartItemsToOrderItems, createOrder, type OrderRecord } from "@/services/orders";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SubmitStep = "idle" | "submitting" | "success";

export default function CheckoutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cartItems, clearCart } = useApp();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitStep, setSubmitStep] = useState<SubmitStep>("idle");
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const selectedItems = cartItems.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = selectedItems.length > 0 ? 20 : 0;
  const shipping = subtotal >= 299 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0) {
      Alert.alert("提示", "请先选择要提交的商品");
      return;
    }

    const normalizedName = customerName.trim();
    const normalizedPhone = customerPhone.trim();
    const normalizedAddress = customerAddress.trim();

    if (!normalizedName) {
      Alert.alert("提示", "请填写收货人姓名");
      return;
    }

    if (!/^1\d{10}$/.test(normalizedPhone)) {
      Alert.alert("提示", "请填写 11 位中国大陆手机号");
      return;
    }

    if (!normalizedAddress) {
      Alert.alert("提示", "请填写详细收货地址");
      return;
    }

    setSubmitStep("submitting");
    try {
      const order = await createOrder({
        customer: {
          name: normalizedName,
          phone: normalizedPhone,
          address: normalizedAddress,
          note: note.trim(),
        },
        items: cartItemsToOrderItems(selectedItems),
        subtotalAmount: subtotal,
        discountAmount: discount,
        shippingAmount: shipping,
        totalAmount: total,
      });

      setCreatedOrder(order);
      setSubmitStep("success");
      clearCart();
    } catch (error) {
      setSubmitStep("idle");
      Alert.alert("提交失败", error instanceof Error ? error.message : "订单提交失败，请稍后重试");
    }
  };

  const handleBackHome = () => {
    router.replace("/(tabs)" as any);
  };

  const handleQueryOrder = () => {
    setSubmitStep("idle");
    router.replace("/order-query" as any);
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
        contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === "web" ? 150 : 120) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="map-pin" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>游客收货信息</Text>
          </View>
          <TextInput
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="收货人姓名"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
          <TextInput
            value={customerPhone}
            onChangeText={setCustomerPhone}
            placeholder="手机号，用于查询订单"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="phone-pad"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
          <TextInput
            value={customerAddress}
            onChangeText={setCustomerAddress}
            placeholder="详细收货地址"
            placeholderTextColor={colors.mutedForeground}
            multiline
            style={[styles.input, styles.textarea, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="备注，可不填"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="package" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>商品清单 ({selectedItems.length}件)</Text>
          </View>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={item.image} style={styles.itemImg} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.itemSpec, { color: colors.mutedForeground }]}>{item.spec}</Text>
                <View style={styles.itemBottom}>
                  <Text style={[styles.itemPrice, { color: colors.price }]}>¥{item.price}</Text>
                  <Text style={[styles.itemQty, { color: colors.mutedForeground }]}>×{item.qty}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

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
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>应付金额</Text>
            <Text style={[styles.totalMain, { color: colors.price }]}>¥{total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={[styles.noteRow, { backgroundColor: colors.surfaceCream }]}>
          <Icon name="info" size={12} color={colors.mutedForeground} />
          <Text style={[styles.noteText, { color: colors.mutedForeground }]}>第一版暂不接入真实支付。点击提交后，订单会真实写入 Cloudflare D1，并返回订单编号。</Text>
        </View>
      </ScrollView>

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
          <Text style={[styles.payBarLabel, { color: colors.mutedForeground }]}>应付金额</Text>
          <Text style={[styles.payBarAmount, { color: colors.price }]}>¥{total.toFixed(2)}</Text>
        </View>
        <Pressable onPress={handleSubmitOrder} style={[styles.payBtn, { backgroundColor: colors.primary }]}>
          <Text style={styles.payBtnText}>提交订单</Text>
        </Pressable>
      </View>

      <Modal visible={submitStep === "submitting"} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.processingCard, { backgroundColor: colors.card }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.processingText, { color: colors.foreground }]}>订单提交中...</Text>
            <Text style={[styles.processingSubText, { color: colors.mutedForeground }]}>正在写入 Cloudflare D1</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={submitStep === "success"} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.successCard, { backgroundColor: colors.card }]}>
            <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.successIconWrap}>
              <Icon name="check" size={36} color="#fff" />
            </LinearGradient>
            <Text style={[styles.successTitle, { color: colors.foreground }]}>订单提交成功</Text>
            <Text style={[styles.successAmount, { color: colors.price }]}>¥{createdOrder?.totalAmount.toFixed(2)}</Text>
            <View style={[styles.orderIdRow, { backgroundColor: colors.surfaceCream }]}>
              <Text style={[styles.orderIdLabel, { color: colors.mutedForeground }]}>订单编号</Text>
              <Text style={[styles.orderIdVal, { color: colors.foreground }]} selectable>{createdOrder?.orderNo}</Text>
            </View>
            <Text style={[styles.successHint, { color: colors.mutedForeground }]}>请保存订单编号。后续可用订单编号 + 手机号查询订单。</Text>
            <Pressable onPress={handleQueryOrder} style={[styles.secondaryBtn, { borderColor: colors.primary }]}>
              <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>查询订单</Text>
            </Pressable>
            <Pressable onPress={handleBackHome} style={[styles.backHomeBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.backHomeBtnText}>返回首页</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: "#fff", fontSize: 17, fontWeight: "700", textAlign: "center" },
  card: { marginHorizontal: 16, marginTop: 12, borderRadius: 16, borderWidth: 1, padding: 14 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "700" },
  input: { minHeight: 44, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 10 },
  textarea: { minHeight: 76, textAlignVertical: "top" },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  itemImg: { width: 64, height: 64, borderRadius: 10 },
  itemName: { fontSize: 13, fontWeight: "600" },
  itemSpec: { fontSize: 11, marginTop: 2 },
  itemBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  itemPrice: { fontSize: 15, fontWeight: "700" },
  itemQty: { fontSize: 13 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 },
  priceLabel: { fontSize: 13 },
  priceVal: { fontSize: 13, fontWeight: "600" },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 14, fontWeight: "700" },
  totalMain: { fontSize: 22, fontWeight: "800" },
  noteRow: { margin: 16, padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "flex-start", gap: 6 },
  noteText: { flex: 1, fontSize: 11, lineHeight: 16 },
  payBar: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1 },
  payBarLabel: { fontSize: 11, marginBottom: 2 },
  payBarAmount: { fontSize: 24, fontWeight: "800" },
  payBtn: { paddingHorizontal: 32, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", minWidth: 140 },
  payBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
  processingCard: { width: 220, borderRadius: 20, padding: 30, alignItems: "center", gap: 12 },
  processingText: { fontSize: 16, fontWeight: "700" },
  processingSubText: { fontSize: 12, textAlign: "center" },
  successCard: { width: 320, borderRadius: 24, padding: 28, alignItems: "center" },
  successIconWrap: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  successTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  successAmount: { fontSize: 32, fontWeight: "800", marginBottom: 16 },
  orderIdRow: { gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginBottom: 12, width: "100%" },
  orderIdLabel: { fontSize: 12 },
  orderIdVal: { fontSize: 13, fontWeight: "700" },
  successHint: { fontSize: 12, lineHeight: 18, textAlign: "center", marginBottom: 16 },
  secondaryBtn: { width: "100%", height: 44, borderRadius: 22, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  secondaryBtnText: { fontSize: 14, fontWeight: "700" },
  backHomeBtn: { width: "100%", height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  backHomeBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
