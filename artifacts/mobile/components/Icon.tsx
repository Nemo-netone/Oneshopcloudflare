import React from "react";
import { Text, TextStyle } from "react-native";

const EMOJI_MAP: Record<string, string> = {
  "activity": "⚡",
  "alert-circle": "⚠️",
  "award": "🏆",
  "book": "📗",
  "book-open": "📖",
  "bookmark": "🔖",
  "box": "📦",
  "briefcase": "💼",
  "calendar": "📅",
  "check-circle": "✅",
  "clock": "🕐",
  "code": "💻",
  "coffee": "☕",
  "cpu": "🔬",
  "credit-card": "💳",
  "dollar-sign": "💵",
  "droplet": "💧",
  "eye": "👁️",
  "eye-off": "🚫",
  "feather": "🌿",
  "file-text": "📄",
  "filter": "🔻",
  "gift": "🎁",
  "grid": "☰",
  "headphones": "🎧",
  "heart": "❤️",
  "home": "🏠",
  "info": "ℹ️",
  "layers": "📋",
  "leaf": "🍃",
  "mail": "✉️",
  "map": "🗺️",
  "map-pin": "📍",
  "message-square": "💬",
  "package": "📦",
  "percent": "％",
  "phone": "📞",
  "refresh-cw": "↺",
  "search": "🔍",
  "shield": "🛡️",
  "shopping-bag": "🛍️",
  "shopping-cart": "🛒",
  "smartphone": "📱",
  "star": "⭐",
  "tag": "🏷️",
  "target": "🎯",
  "thumbs-up": "👍",
  "trash-2": "🗑️",
  "trending-up": "📈",
  "truck": "🚚",
  "user": "👤",
  "users": "👥",
  "zap": "⚡",
  "zap-off": "○",
};

const TEXT_MAP: Record<string, string> = {
  "check": "✓",
  "chevron-down": "∨",
  "chevron-left": "‹",
  "chevron-right": "›",
  "chevron-up": "∧",
  "minus": "−",
  "minus-circle": "⊖",
  "plus": "+",
  "plus-circle": "⊕",
  "x": "✕",
  "star-filled": "★",
};

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
};

export function Icon({ name, size = 16, color = "#000", style }: IconProps) {
  const isText = name in TEXT_MAP;
  const char = isText ? TEXT_MAP[name] : (EMOJI_MAP[name] ?? "•");

  return (
    <Text
      style={[
        {
          fontSize: isText ? size : size * 1.1,
          lineHeight: size * 1.4,
          color: isText ? color : undefined,
          textAlign: "center",
          includeFontPadding: false,
        },
        style,
      ]}
      selectable={false}
    >
      {char}
    </Text>
  );
}
