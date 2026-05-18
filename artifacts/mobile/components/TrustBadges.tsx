import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { TRUST_BADGES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export function TrustBadges() {
  const colors = useColors();
  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {TRUST_BADGES.map((b, i) => (
        <React.Fragment key={b.key}>
          <View style={styles.item}>
            <Icon name={b.icon} size={18} color={colors.accent} />
            <Text style={[styles.title, { color: colors.foreground }]}>{b.title}</Text>
            <Text style={[styles.sub, { color: colors.mutedForeground }]}>{b.sub}</Text>
          </View>
          {i < TRUST_BADGES.length - 1 && (
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
  },
  divider: {
    width: 1,
    marginVertical: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
  },
  sub: {
    fontSize: 10,
    textAlign: "center",
  },
});
