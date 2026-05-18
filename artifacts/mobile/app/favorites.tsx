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

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, toggleFavorite } = useApp();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>我的收藏</Text>
        <View style={{ width: 36 }} />
      </LinearGradient>

      {favorites.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.surfaceJade }]}>
            <Icon name="heart" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>暂无收藏</Text>
          <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
            浏览产品时点击收藏按钮，您喜爱的商品将出现在这里
          </Text>
          <Pressable
            onPress={() => router.push("/category" as any)}
            style={[styles.browseBtn, { backgroundColor: colors.primary }]}
          >
            <Icon name="grid" size={14} color="#fff" />
            <Text style={styles.browseBtnText}>去逛逛</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingBottom: insets.bottom + (Platform.OS === "web" ? 100 : 30),
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.countText, { color: colors.mutedForeground }]}>
            共 {favorites.length} 件收藏
          </Text>
          {favorites.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/product/${item.id}` as any)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <View style={[styles.imgWrap, { backgroundColor: item.themeBg }]}>
                <Image source={item.image} style={styles.img} resizeMode="contain" />
                <View style={[styles.badge, { backgroundColor: item.theme }]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={[styles.subtitle, { color: item.theme }]} numberOfLines={1}>
                  {item.subtitle}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.price }]}>
                    {item.priceLabel}
                  </Text>
                  {item.price && (
                    <View style={[styles.addCartBtn, { backgroundColor: item.theme }]}>
                      <Icon name="shopping-cart" size={11} color="#fff" />
                      <Text style={styles.addCartText}>加购</Text>
                    </View>
                  )}
                </View>
              </View>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                hitSlop={10}
                style={styles.heartBtn}
              >
                <Icon name="heart" size={18} color={colors.price} />
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      )}
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

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700" },
  emptySubtitle: { fontSize: 13, textAlign: "center", lineHeight: 20 },
  browseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 28,
    height: 44,
    borderRadius: 22,
    marginTop: 8,
  },
  browseBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  countText: { fontSize: 12, marginBottom: 4 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  imgWrap: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  img: { width: 90, height: 90 },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    gap: 4,
  },
  name: { fontSize: 14, fontWeight: "700", lineHeight: 20 },
  subtitle: { fontSize: 12 },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: { fontSize: 16, fontWeight: "800" },
  addCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addCartText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  heartBtn: {
    padding: 12,
    alignSelf: "flex-start",
  },
});
