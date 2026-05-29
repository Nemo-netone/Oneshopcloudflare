import { Icon } from "@/components/Icon";
import { useColors } from "@/hooks/useColors";
import { queryOrder, type OrderRecord } from "@/services/orders";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OrderQueryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderRecord | null>(null);

  const handleQuery = async () => {
    const normalizedOrderNo = orderNo.trim();
    const normalizedPhone = phone.trim();

    if (!normalizedOrderNo) {
      Alert.alert("提示", "请填写订单编号");
      return;
    }

    if (!/^1\d{10}$/.test(normalizedPhone)) {
      Alert.alert("提示", "请填写 11 位中国大陆手机号");
      return;
    }

    setLoading(true);
    try {
      const result = await queryOrder(normalizedOrderNo, normalizedPhone);
      setOrder(result);
    } catch (error) {
      setOrder(null);
      Alert.alert("查询失败", error instanceof Error ? error.message : "没有找到对应订单");
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>订单查询</Text>
        <View style={{ width: 36 }} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Icon name="search" size={14} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>用订单编号 + 手机号查询</Text>
          </View>
          <TextInput
            value={orderNo}
            onChangeText={setOrderNo}
            placeholder="订单编号，例如 GT..."
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="characters"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="下单手机号"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="phone-pad"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
          />
          <Pressable onPress={handleQuery} style={[styles.queryBtn, { backgroundColor: colors.primary }]}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.queryBtnText}>查询订单</Text>}
          </Pressable>
          <Text style={[styles.helpText, { color: colors.mutedForeground }]}>第一版不做用户登录。为了保护隐私，必须同时提供订单编号和下单手机号。</Text>
        </View>

        {order && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Icon name="file-text" size={14} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>订单详情</Text>
            </View>

            <View style={[styles.orderNoBox, { backgroundColor: colors.surfaceCream }]}>
              <Text style={[styles.orderNoLabel, { color: colors.mutedForeground }]}>订单编号</Text>
              <Text style={[styles.orderNoText, { color: colors.foreground }]} selectable>{order.orderNo}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>订单状态</Text>
              <Text style={[styles.infoValue, { color: colors.primary }]}>待处理</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>收货人</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>{order.customerName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>手机号</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>{order.customerPhone}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>收货地址</Text>
              <Text style={[styles.addressText, { color: colors.foreground }]}>{order.customerAddress}</Text>
            </View>
            {order.note ? (
              <View style={styles.infoBlock}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>备注</Text>
                <Text style={[styles.addressText, { color: colors.foreground }]}>{order.note}</Text>
              </View>
            ) : null}

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {order.items.map((item) => (
              <View key={`${item.productId}-${item.quantity}-${item.subtotal}`} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemName, { color: colors.foreground }]}>{item.productName}</Text>
                  <Text style={[styles.itemSpec, { color: colors.mutedForeground }]}>{item.productSpec}</Text>
                </View>
                <Text style={[styles.itemQty, { color: colors.mutedForeground }]}>×{item.quantity}</Text>
                <Text style={[styles.itemPrice, { color: colors.price }]}>¥{item.subtotal.toFixed(2)}</Text>
              </View>
            ))}

            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>商品合计</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>¥{order.subtotalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>优惠</Text>
              <Text style={[styles.infoValue, { color: colors.accent }]}>-¥{order.discountAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>运费</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>¥{order.shippingAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.totalLabel, { color: colors.foreground }]}>订单总额</Text>
              <Text style={[styles.totalText, { color: colors.price }]}>¥{order.totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: "#fff", fontSize: 17, fontWeight: "700", textAlign: "center" },
  card: { marginHorizontal: 16, marginTop: 14, borderRadius: 16, borderWidth: 1, padding: 14 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "700" },
  input: { minHeight: 44, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 10 },
  queryBtn: { height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", marginTop: 4 },
  queryBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  helpText: { marginTop: 10, fontSize: 12, lineHeight: 18 },
  orderNoBox: { padding: 12, borderRadius: 12, marginBottom: 12 },
  orderNoLabel: { fontSize: 12, marginBottom: 4 },
  orderNoText: { fontSize: 14, fontWeight: "700" },
  infoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6, gap: 10 },
  infoBlock: { paddingVertical: 6, gap: 4 },
  infoLabel: { fontSize: 13 },
  infoValue: { fontSize: 13, fontWeight: "600", flexShrink: 1, textAlign: "right" },
  addressText: { fontSize: 13, lineHeight: 19 },
  divider: { height: 1, marginVertical: 10 },
  itemRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 },
  itemName: { fontSize: 13, fontWeight: "600" },
  itemSpec: { fontSize: 11, marginTop: 2 },
  itemQty: { fontSize: 12 },
  itemPrice: { fontSize: 13, fontWeight: "700", minWidth: 70, textAlign: "right" },
  totalLabel: { fontSize: 15, fontWeight: "700" },
  totalText: { fontSize: 20, fontWeight: "800" },
});
