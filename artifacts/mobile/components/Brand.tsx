import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

type Props = {
  size?: number;
  showText?: boolean;
};

export function BrandSeal({ size = 44 }: Props) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.seal,
        {
          width: size,
          height: size,
          backgroundColor: colors.surfaceCream,
          borderColor: colors.accent,
        },
      ]}
    >
      <Text style={[styles.sealLine, { color: colors.primary, fontSize: size * 0.28 }]}>国泰</Text>
      <Text style={[styles.sealLine, { color: colors.primary, fontSize: size * 0.28 }]}>民安</Text>
    </View>
  );
}

export function BrandLockup({
  align = "left",
  invert = false,
}: {
  align?: "left" | "center";
  invert?: boolean;
}) {
  const colors = useColors();
  const titleColor = invert ? "#ffffff" : colors.foreground;
  const subColor = invert ? "rgba(255,255,255,0.75)" : colors.mutedForeground;
  return (
    <View style={[styles.lockup, align === "center" && { alignItems: "center" }]}>
      <Text style={[styles.lockupTitle, { color: titleColor }]}>国肽民安·肽护中华</Text>
      <Text style={[styles.lockupSub, { color: subColor }]}>科技肽能·健康守护每一刻</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  seal: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  sealLine: {
    fontWeight: "700",
    letterSpacing: 1,
    lineHeight: 16,
  },
  lockup: {
    gap: 2,
  },
  lockupTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  lockupSub: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
