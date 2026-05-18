import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View, useColorScheme } from "react-native";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

function CartBadge({ count }: { count: number }) {
  const colors = useColors();
  if (count === 0) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: -4,
        right: -6,
        backgroundColor: colors.destructive,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 9, fontWeight: "700" }}>
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const { cartCount } = useApp();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.card,
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84, paddingTop: 6 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.card },
              ]}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20, lineHeight: 26, color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "分类",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20, lineHeight: 26, color }}>☰</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "购物车",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "relative" }}>
              <Text style={{ fontSize: focused ? 22 : 20, lineHeight: 26, color }}>🛒</Text>
              <CartBadge count={cartCount} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20, lineHeight: 26, color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
