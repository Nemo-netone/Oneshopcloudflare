import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { useColors } from "@/hooks/useColors";

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, subtitle, actionLabel, onAction }: Props) {
  const colors = useColors();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <View style={[styles.bar, { backgroundColor: colors.accent }]} />
          <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        </View>
        {subtitle && (
          <Text style={[styles.sub, { color: colors.mutedForeground }]}>{subtitle}</Text>
        )}
      </View>
      {actionLabel && (
        <Pressable onPress={onAction} hitSlop={10} style={styles.action}>
          <Text style={[styles.actionText, { color: colors.mutedForeground }]}>
            {actionLabel}
          </Text>
          <Icon name="chevron-right" size={14} color={colors.mutedForeground} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  sub: {
    fontSize: 11,
    marginLeft: 11,
    marginTop: 2,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  actionText: {
    fontSize: 12,
  },
});
