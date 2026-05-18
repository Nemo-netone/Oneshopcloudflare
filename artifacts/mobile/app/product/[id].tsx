import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PRODUCT_GRANULE, PRODUCT_ORAL, PRODUCT_POWDER } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

// ─── Product Data ─────────────────────────────────────────────────────────────

const PRODUCTS: Record<string, ProductData> = {
  p2: {
    id: "p2",
    name: "肽润肝清®",
    subtitle: "护肝醒酒冲剂 · 特殊膳食食品",
    badge: "热销",
    theme: "#b8631a",
    themeDark: "#8a4510",
    themeBg: "#fdf3e7",
    price: 135,
    priceLabel: "¥135",
    priceSub: "原价¥168 · 会员再享9折",
    sales: "已售 1,230+ 盒",
    sold: "复购率 68%",
    image: PRODUCT_GRANULE,
    features: [
      { icon: "zap", title: "速溶颗粒", desc: "温水即溶" },
      { icon: "shield", title: "高F值肽", desc: "精准护肝" },
      { icon: "package", title: "30袋/盒", desc: "3g独立包装" },
    ],
    instructions: {
      suitable: ["肝代谢失调人群", "经常饮酒应酬人士", "机体细胞修复需求人群", "B族维生素缺乏者"],
      usage: [
        "温水冲服，每日两次，每次一袋",
        "饮酒前30分钟服用一袋，预防护肝效果更佳",
        "饮酒后可加服一袋，加速醒酒代谢",
        "每次用150ml温水冲开后饮用",
        "孕妇及儿童请遵医嘱",
      ],
      certs: ["特殊膳食食品", "执行标准GB 24154", "生产许可SC认证", "阴凉干燥处储存", "河南宝莱健生物工程出品"],
    },
    ingredients: [
      { name: "高F值低聚肽", amount: "核心成分", role: "F值≥45.3，支持肝代谢与细胞修复的核心活性肽" },
      { name: "低聚果糖", amount: "适量", role: "益生元，调节肠道菌群，改善代谢环境" },
      { name: "维生素B1（盐酸硫胺素）", amount: "1.4mg", role: "促进糖代谢，辅助肝功能维护" },
      { name: "维生素B6（盐酸吡哆醇）", amount: "1.4mg", role: "参与氨基酸代谢，减轻肝脏负担" },
      { name: "维生素B12（氰钴胺）", amount: "2.4μg", role: "促进细胞修复，维护肝细胞健康" },
    ],
    params: [
      { key: "产品类别", val: "特殊膳食食品", highlight: false },
      { key: "净含量", val: "90g（3g/袋×30袋）", highlight: false },
      { key: "规格", val: "3g/袋", highlight: false },
      { key: "配料", val: "高F值低聚肽", highlight: true },
      { key: "F值", val: "≥45.3", highlight: true },
      { key: "食用方法", val: "温水冲服，每日两次，每次一袋", highlight: false },
      { key: "保质期", val: "24个月", highlight: false },
      { key: "储存方式", val: "阴凉干燥处", highlight: false },
      { key: "执行标准", val: "GB 24154", highlight: false },
      { key: "生产商", val: "河南宝莱健生物工程有限公司", highlight: false },
      { key: "生产地址", val: "河南省郑州市荥阳市刘河镇106路交叉口西南", highlight: false },
      { key: "生产日期", val: "2025.5.18", highlight: false },
    ],
    reviews: [
      {
        user: "李先生",
        tag: "已复购3次",
        rating: 5,
        date: "2025-11",
        content: "经常要陪客户喝酒，用了这个之后第二天明显没那么难受了，头痛和反胃都减轻很多。已经推荐给了好几个朋友。",
      },
      {
        user: "王女士",
        tag: "公司团购",
        rating: 5,
        date: "2025-10",
        content: "给老公买的，他应酬多。喝了以后恢复快很多，之前喝完第二天工作状态很差，现在好多了。",
      },
      {
        user: "张总",
        tag: "已复购",
        rating: 4,
        date: "2025-09",
        content: "冲剂温水冲开，溶解很快，味道清淡。护肝效果确实不错，30袋一盒，一个月用量刚好，很满意。",
      },
    ],
  },

  p1: {
    id: "p1",
    name: "小麦低聚肽原料",
    subtitle: "企业专供 · 高纯度活性肽",
    badge: "企业专供",
    theme: "#b8924b",
    themeDark: "#8a6830",
    themeBg: "#fdf6e7",
    price: null,
    priceLabel: "¥20万/吨",
    priceSub: "支持定制规格 · 贴牌OEM · 可签合作协议",
    sales: "已合作 5+ 家企业",
    sold: null,
    image: PRODUCT_POWDER,
    features: [
      { icon: "award", title: "高F值", desc: "F值≥45.3" },
      { icon: "shield", title: "高纯度", desc: "肽纯度≥97%" },
      { icon: "cpu", title: "精准分子", desc: "200-1000 Da" },
    ],
    instructions: {
      suitable: ["食品加工企业", "保健品制造商", "医药原料采购方", "功能性饮料研发"],
      usage: [
        "与企业采购负责人确认需求规格",
        "提交定制说明与预期采购量",
        "签订合作/供销协议",
        "安排样品检测与质量确认",
        "批量生产与配送安排",
      ],
      certs: ["ISO22000", "HACCP", "GMP", "GAP", "出口欧盟许可", "12项专利"],
    },
    ingredients: [
      { name: "高F值小麦低聚肽", amount: "≥97%", role: "核心活性成分，F值≥45.3，精准护肝" },
      { name: "小麦谷朊粉（原料）", amount: "100%天然", role: "河南小麦副产物深加工，绿色溯源" },
      { name: "水分", amount: "≤6%", role: "控制在安全范围，延长保质期" },
      { name: "灰分", amount: "≤3%", role: "无机盐指标，品质保证" },
    ],
    params: [
      { key: "F值", val: "≥45.3", highlight: true },
      { key: "肽纯度", val: "≥97%", highlight: true },
      { key: "分子量范围", val: "200-1000 Da", highlight: false },
      { key: "铅 (Pb)", val: "未检出", highlight: false },
      { key: "砷 (As)", val: "未检出", highlight: false },
      { key: "汞 (Hg)", val: "未检出", highlight: false },
      { key: "镉 (Cd)", val: "未检出", highlight: false },
      { key: "水分", val: "≤6%", highlight: false },
      { key: "包装规格", val: "25kg/袋，可定制", highlight: false },
    ],
    reviews: [
      {
        user: "河南宝莱健生物工程",
        tag: "OEM合作",
        rating: 5,
        date: "2025-03",
        content: "F值稳定超过45，连续合作两年，工艺成熟，交货准时，是我们长期合作的优质供应商。",
      },
      {
        user: "博凯药业采购部",
        tag: "原料采购",
        rating: 5,
        date: "2025-01",
        content: "重金属全项未检出，符合药用级要求，质检报告齐全，已签订年度框架协议。",
      },
    ],
  },

  p3: {
    id: "p3",
    name: "珀珀肝宁®",
    subtitle: "高F值小麦低聚肽口服液 · 液态直吸",
    badge: "128人付款",
    theme: "#1a6896",
    themeDark: "#124f73",
    themeBg: "#edf4fb",
    price: 199,
    priceLabel: "¥199",
    priceSub: "原价¥259 · 限时特惠",
    sales: "好评率 97.8%",
    sold: "热销 128人付款",
    image: PRODUCT_ORAL,
    features: [
      { icon: "droplet", title: "液态直吸", desc: "无需消化" },
      { icon: "activity", title: "快速入血", desc: "高效起效" },
      { icon: "heart", title: "开盖即饮", desc: "10ml/支" },
    ],
    instructions: {
      suitable: ["慢性肝病调养人群", "手术后康复人群", "长期转氨酶偏高者", "健身增肌人群", "中老年日常保养"],
      usage: [
        "每日1-2支，晨起空腹或睡前服用",
        "直接饮用或加入温水（≤40°C）稀释",
        "开盖后请一次性饮用完毕",
        "建议连续服用30天以上",
        "配合低脂饮食效果更佳",
      ],
      certs: ["特殊膳食食品", "生产许可SC认证", "无人工色素", "质量检验报告", "肽护中华品牌出品"],
    },
    ingredients: [
      { name: "高F值小麦低聚肽", amount: "核心成分", role: "液态直接吸收，F值≥45.3，快速护肝修复" },
      { name: "辅酶Q10", amount: "30mg", role: "激活线粒体，增强肝细胞能量代谢" },
      { name: "维生素E（d-α-生育酚）", amount: "10mg", role: "抗氧化，防止肝细胞脂质过氧化" },
      { name: "低聚果糖", amount: "500mg", role: "益生元，调节肠道健康与代谢" },
      { name: "纯化水", amount: "适量", role: "溶媒，确保活性成分充分溶解" },
    ],
    params: [
      { key: "产品名称", val: "珀珀肝宁", highlight: false },
      { key: "规格", val: "10ml/支", highlight: false },
      { key: "核心成分", val: "高F值小麦低聚肽", highlight: true },
      { key: "F值", val: "≥45.3", highlight: true },
      { key: "辅酶Q10", val: "30mg/支", highlight: false },
      { key: "保质期", val: "24个月", highlight: false },
      { key: "生产日期", val: "2025.5.18", highlight: false },
      { key: "储存方式", val: "阴凉干燥处，冷藏更佳", highlight: false },
      { key: "品牌", val: "肽护中华", highlight: false },
    ],
    reviews: [
      {
        user: "陈阿姨",
        tag: "术后调理",
        rating: 5,
        date: "2025-12",
        content: "胆囊切除术后肝功能一直不好，医生建议用些辅助保健品。吃了两个疗程，最近复查转氨酶终于降到正常范围了，高兴坏了！",
      },
      {
        user: "健身博主@肌肉猫",
        tag: "增肌辅助",
        rating: 5,
        date: "2025-11",
        content: "蛋白质补充量大对肝脏压力不小，用这个口服液护肝，配合训练效果很好，恢复也快，重点是味道还不错，不苦。",
      },
      {
        user: "王先生",
        tag: "转氨酶改善",
        rating: 5,
        date: "2025-10",
        content: "单位体检ALT偏高，用了一个月，复查正常了。口感比较清淡，空腹喝下去没有任何不适，会继续吃。",
      },
      {
        user: "刘女士",
        tag: "已复购2次",
        rating: 4,
        date: "2025-09",
        content: "给父亲买的，他有脂肪肝。坚持一个月明显感觉精神好了，肚子也没那么鼓了。就是价格稍贵，但效果值得。",
      },
    ],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductData = {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  theme: string;
  themeDark: string;
  themeBg: string;
  price: number | null;
  priceLabel: string;
  priceSub: string;
  sales: string;
  sold: string | null;
  image: any;
  features: { icon: string; title: string; desc: string }[];
  instructions: {
    suitable: string[];
    usage: string[];
    certs: string[];
  };
  ingredients: { name: string; amount: string; role: string }[];
  params: { key: string; val: string; highlight: boolean }[];
  reviews: { user: string; tag: string; rating: number; date: string; content: string }[];
};

const DETAIL_TABS = ["使用说明", "配方成分", "用户评价"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState(0);
  const [qty, setQty] = useState(1);
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const { addToCart, toggleFavorite, isFavorited, updateCartItem, cartItems } = useApp();

  const product = PRODUCTS[id as string] ?? PRODUCTS.p1;
  const { theme, themeDark, themeBg } = product;
  const favorited = isFavorited(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image,
      price: product.price,
      priceLabel: product.priceLabel,
      badge: product.badge,
      theme: product.theme,
      themeBg: product.themeBg,
    });
  };

  const handleAddToCart = () => {
    if (!product.price) return;
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      spec: `数量：${qty}`,
      badge: product.badge,
      tags: [product.badge, product.subtitle.split(" · ")[0]].filter(Boolean),
    });
    Alert.alert("已加入购物车", `${product.name} × ${qty} 已添加成功`, [
      { text: "继续选购", style: "cancel" },
      { text: "去购物车", onPress: () => router.push("/(tabs)/cart" as any) },
    ]);
  };

  const handleBuyNow = () => {
    if (!product.price) return;
    // Deselect all current cart items, add this product as selected
    cartItems.forEach((i) => updateCartItem(i.id, { selected: false }));
    addToCart({
      id: product.id + "_buynow",
      name: product.name,
      image: product.image,
      price: product.price,
      spec: `数量：${qty}`,
      badge: product.badge,
      tags: [product.badge, product.subtitle.split(" · ")[0]].filter(Boolean),
    });
    router.push("/checkout" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === "web" ? 130 : 100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Nav bar ── */}
        <LinearGradient
          colors={[theme, themeDark]}
          style={[styles.nav, { paddingTop: topInset + 8 }]}
        >
          <Pressable onPress={() => router.back()} style={styles.navBack}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </Pressable>
          <Text style={styles.navTitle} numberOfLines={1}>{product.name}</Text>
          <View style={{ width: 36 }} />
        </LinearGradient>

        {/* ── Hero card ── */}
        <View style={[styles.heroCard, { backgroundColor: themeBg, borderColor: theme + "30" }]}>
          <View style={styles.heroRow}>
            <View style={{ flex: 1 }}>
              <View style={[styles.heroBadge, { backgroundColor: theme }]}>
                <Text style={styles.heroBadgeText}>{product.badge}</Text>
              </View>
              <Text style={[styles.heroName, { color: "#222" }]}>{product.name}</Text>
              <Text style={[styles.heroSubtitle, { color: theme }]}>{product.subtitle}</Text>
              <View style={styles.featureRow}>
                {product.features.map((f) => (
                  <View key={f.title} style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: theme + "22", borderColor: theme + "55" }]}>
                      <Icon name={f.icon as any} size={14} color={theme} />
                    </View>
                    <Text style={[styles.featureTitle, { color: "#333" }]}>{f.title}</Text>
                    <Text style={[styles.featureDesc, { color: "#888" }]}>{f.desc}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Image source={product.image} style={styles.heroImg} resizeMode="contain" />
          </View>

          {/* Price */}
          <View style={[styles.priceBar, { backgroundColor: "#fff", borderColor: theme + "25" }]}>
            <View>
              <View style={styles.priceRow}>
                <Text style={[styles.priceMain, { color: theme }]}>{product.priceLabel}</Text>
                {product.price && (
                  <Text style={[styles.priceOld, { color: "#999" }]}>
                    ¥{product.id === "p2" ? 168 : 259}
                  </Text>
                )}
              </View>
              <Text style={[styles.priceSub, { color: "#999" }]}>{product.priceSub}</Text>
            </View>
            <View style={styles.salesBadges}>
              <View style={[styles.salesBadge, { backgroundColor: theme + "15", borderColor: theme + "40" }]}>
                <Icon name="users" size={10} color={theme} />
                <Text style={[styles.salesBadgeText, { color: theme }]}>{product.sales}</Text>
              </View>
              {product.sold && (
                <View style={[styles.salesBadge, { backgroundColor: theme + "15", borderColor: theme + "40" }]}>
                  <Icon name="trending-up" size={10} color={theme} />
                  <Text style={[styles.salesBadgeText, { color: theme }]}>{product.sold}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ── Quantity (B2C only) ── */}
        {product.price && (
          <View style={[styles.qtyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.qtyLabel, { color: colors.mutedForeground }]}>购买数量</Text>
            <View style={[styles.qtyWrap, { borderColor: colors.border }]}>
              <Pressable onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
                <Icon name="minus" size={14} color={colors.foreground} />
              </Pressable>
              <Text style={[styles.qtyNum, { color: colors.foreground }]}>{qty}</Text>
              <Pressable onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
                <Icon name="plus" size={14} color={colors.foreground} />
              </Pressable>
            </View>
            <Text style={[styles.qtyTotal, { color: theme }]}>
              合计 ¥{(product.price * qty).toFixed(0)}
            </Text>
          </View>
        )}

        {/* ── Tabs ── */}
        <View style={[styles.tabsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.tabsRow, { borderBottomColor: colors.border }]}>
            {DETAIL_TABS.map((t, i) => (
              <Pressable key={t} onPress={() => setTab(i)} style={styles.tabBtn}>
                <Text style={[
                  styles.tabText,
                  {
                    color: tab === i ? theme : colors.mutedForeground,
                    fontWeight: tab === i ? "700" : "500",
                  },
                ]}>
                  {t}
                </Text>
                {tab === i && <View style={[styles.tabIndicator, { backgroundColor: theme }]} />}
              </Pressable>
            ))}
          </View>

          <View style={styles.tabContent}>
            {tab === 0 && <InstructionsTab product={product} theme={theme} colors={colors} />}
            {tab === 1 && <IngredientsTab product={product} theme={theme} colors={colors} />}
            {tab === 2 && <ReviewsTab product={product} theme={theme} colors={colors} />}
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom action bar ── */}
      <View style={[styles.actionBar, {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
        paddingBottom: insets.bottom + (Platform.OS === "web" ? 12 : 8),
      }]}>
        <Pressable style={styles.actionIcon}>
          <Icon name="headphones" size={18} color={colors.foreground} />
          <Text style={[styles.actionIconText, { color: colors.mutedForeground }]}>客服</Text>
        </Pressable>
        <Pressable onPress={handleToggleFavorite} style={styles.actionIcon}>
          <Icon
            name="heart"
            size={18}
            color={favorited ? "#e74c3c" : colors.foreground}
          />
          <Text style={[
            styles.actionIconText,
            { color: favorited ? "#e74c3c" : colors.mutedForeground },
          ]}>
            {favorited ? "已收藏" : "收藏"}
          </Text>
        </Pressable>
        {product.price ? (
          <>
            <Pressable
              onPress={handleAddToCart}
              style={[styles.cartBtn, { backgroundColor: theme + "18", borderColor: theme + "50", borderWidth: 1 }]}
            >
              <Text style={[styles.cartBtnText, { color: theme }]}>加入购物车</Text>
            </Pressable>
            <Pressable onPress={handleBuyNow} style={[styles.buyBtn, { backgroundColor: theme }]}>
              <Text style={styles.buyBtnText}>立即购买</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={[styles.buyBtn, { backgroundColor: theme, flex: 2 }]}>
            <Icon name="phone" size={14} color="#fff" />
            <Text style={styles.buyBtnText}>联系企业采购</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ─── Tab: 使用说明 ─────────────────────────────────────────────────────────────

function InstructionsTab({ product, theme, colors }: { product: ProductData; theme: string; colors: any }) {
  return (
    <View style={styles.tabInner}>
      <View style={[styles.infoBlock, { backgroundColor: theme + "10", borderColor: theme + "30" }]}>
        <View style={styles.infoBlockHeader}>
          <Icon name="users" size={14} color={theme} />
          <Text style={[styles.infoBlockTitle, { color: theme }]}>适用人群</Text>
        </View>
        <View style={styles.suitableGrid}>
          {product.instructions.suitable.map((s) => (
            <View key={s} style={[styles.suitablePill, { backgroundColor: "#fff", borderColor: theme + "40" }]}>
              <Icon name="check" size={10} color={theme} />
              <Text style={[styles.suitableText, { color: "#333" }]}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoBlock2}>
        <View style={styles.infoBlockHeader}>
          <Icon name="book-open" size={14} color={theme} />
          <Text style={[styles.infoBlockTitle, { color: theme }]}>食用方法</Text>
        </View>
        {product.instructions.usage.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={[styles.stepNum, { backgroundColor: theme }]}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: "#333" }]}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBlock2}>
        <View style={styles.infoBlockHeader}>
          <Icon name="award" size={14} color={theme} />
          <Text style={[styles.infoBlockTitle, { color: theme }]}>资质认证</Text>
        </View>
        <View style={styles.certGrid}>
          {product.instructions.certs.map((c) => (
            <View key={c} style={[styles.certBadge, { backgroundColor: "#fff", borderColor: theme + "40" }]}>
              <Icon name="shield" size={12} color={theme} />
              <Text style={[styles.certBadgeText, { color: "#444" }]}>{c}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.disclaimer, { backgroundColor: colors.surfaceCream, borderColor: colors.border }]}>
        <Icon name="info" size={11} color={colors.mutedForeground} />
        <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
          本品为膳食营养补充食品，不能代替药物治疗。如有疾病请遵医嘱。
        </Text>
      </View>
    </View>
  );
}

// ─── Tab: 配方成分 ─────────────────────────────────────────────────────────────

function IngredientsTab({ product, theme, colors }: { product: ProductData; theme: string; colors: any }) {
  return (
    <View style={styles.tabInner}>
      <View style={styles.infoBlockHeader}>
        <Icon name="list" size={14} color={theme} />
        <Text style={[styles.infoBlockTitle, { color: theme }]}>成分配方</Text>
      </View>
      <View style={[styles.table, { borderColor: colors.border }]}>
        <View style={[styles.tableHeader, { backgroundColor: theme }]}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>成分名称</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>含量</Text>
          <Text style={[styles.tableHeaderText, { flex: 2, textAlign: "right" }]}>主要作用</Text>
        </View>
        {product.ingredients.map((ing, i) => (
          <View key={ing.name} style={[
            styles.tableRow,
            { backgroundColor: i % 2 === 0 ? "#fff" : colors.surfaceCream, borderTopColor: colors.border },
          ]}>
            <Text style={[styles.tableCell, { flex: 2, color: "#222", fontWeight: "600" }]}>{ing.name}</Text>
            <Text style={[styles.tableCell, { flex: 1, color: theme, fontWeight: "700", textAlign: "center" }]}>{ing.amount}</Text>
            <Text style={[styles.tableCell, { flex: 2, color: "#666", textAlign: "right" }]}>{ing.role}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.infoBlockHeader, { marginTop: 18 }]}>
        <Icon name="sliders" size={14} color={theme} />
        <Text style={[styles.infoBlockTitle, { color: theme }]}>产品参数</Text>
      </View>
      <View style={[styles.paramsBox, { borderColor: colors.border }]}>
        {product.params.map((p, i) => (
          <View key={p.key} style={[
            styles.paramRow,
            {
              borderTopColor: colors.border,
              backgroundColor: p.highlight ? theme + "10" : (i % 2 === 0 ? "#fff" : colors.surfaceCream),
            },
          ]}>
            <Text style={[styles.paramKey, { color: "#555" }]}>{p.key}</Text>
            <Text style={[styles.paramVal, {
              color: p.highlight ? theme : "#222",
              fontWeight: p.highlight ? "800" : "600",
              fontSize: p.highlight ? 15 : 13,
            }]}>
              {p.highlight ? `★ ${p.val}` : p.val}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Tab: 用户评价 ─────────────────────────────────────────────────────────────

function ReviewsTab({ product, theme, colors }: { product: ProductData; theme: string; colors: any }) {
  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <View style={styles.tabInner}>
      <View style={[styles.reviewSummary, { backgroundColor: theme + "10", borderColor: theme + "30" }]}>
        <View style={styles.reviewScore}>
          <Text style={[styles.reviewScoreNum, { color: theme }]}>{avgRating.toFixed(1)}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Icon key={s} name="star" size={14} color={s <= Math.round(avgRating) ? theme : "#ddd"} />
            ))}
          </View>
          <Text style={[styles.reviewCount, { color: "#888" }]}>{product.reviews.length} 条评价</Text>
        </View>
        <View style={styles.reviewRateBars}>
          {[5, 4, 3].map((star) => {
            const count = product.reviews.filter((r) => r.rating === star).length;
            const pct = product.reviews.length ? count / product.reviews.length : 0;
            return (
              <View key={star} style={styles.rateBarRow}>
                <Text style={[styles.rateBarLabel, { color: "#888" }]}>{star}星</Text>
                <View style={[styles.rateBarBg, { backgroundColor: "#eee" }]}>
                  <View style={[styles.rateBarFill, { backgroundColor: theme, width: `${pct * 100}%` as any }]} />
                </View>
                <Text style={[styles.rateBarCount, { color: "#888" }]}>{count}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {product.reviews.length === 0 ? (
        <View style={styles.emptyReviews}>
          <Icon name="message-circle" size={32} color={colors.border} />
          <Text style={[styles.emptyReviewText, { color: colors.mutedForeground }]}>
            企业采购评价请联系客服查询
          </Text>
        </View>
      ) : (
        product.reviews.map((r, i) => (
          <View key={i} style={[styles.reviewCard, { backgroundColor: "#fff", borderColor: colors.border }]}>
            <View style={styles.reviewCardHeader}>
              <View style={[styles.reviewAvatar, { backgroundColor: theme + "20", borderColor: theme + "50" }]}>
                <Text style={[styles.reviewAvatarText, { color: theme }]}>{r.user[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.reviewNameRow}>
                  <Text style={[styles.reviewUser, { color: "#222" }]}>{r.user}</Text>
                  <View style={[styles.reviewTagPill, { backgroundColor: theme + "15", borderColor: theme + "40" }]}>
                    <Text style={[styles.reviewTagText, { color: theme }]}>{r.tag}</Text>
                  </View>
                </View>
                <View style={styles.reviewMeta}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} name="star" size={11} color={s <= r.rating ? theme : "#ddd"} />
                    ))}
                  </View>
                  <Text style={[styles.reviewDate, { color: "#aaa" }]}>{r.date}</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.reviewContent, { color: "#444" }]}>{r.content}</Text>
          </View>
        ))
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  navBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: { flex: 1, color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" },

  heroCard: {
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  heroRow: { flexDirection: "row", alignItems: "flex-start" },
  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 8,
  },
  heroBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  heroName: { fontSize: 20, fontWeight: "800", lineHeight: 26 },
  heroSubtitle: { fontSize: 12, marginTop: 4, fontWeight: "600" },
  heroImg: { width: 110, height: 140 },

  featureRow: { flexDirection: "row", gap: 14, marginTop: 16 },
  featureItem: { alignItems: "center", gap: 5, width: 60 },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: { fontSize: 11, fontWeight: "700", textAlign: "center" },
  featureDesc: { fontSize: 9, textAlign: "center" },

  priceBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  priceMain: { fontSize: 22, fontWeight: "800" },
  priceOld: { fontSize: 12, textDecorationLine: "line-through" },
  priceSub: { fontSize: 10, marginTop: 3 },
  salesBadges: { gap: 5, alignItems: "flex-end" },
  salesBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  salesBadgeText: { fontSize: 10, fontWeight: "600" },

  qtyCard: {
    marginHorizontal: 14,
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyLabel: { flex: 1, fontSize: 13 },
  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  qtyBtn: { width: 30, height: 28, alignItems: "center", justifyContent: "center" },
  qtyNum: { width: 36, textAlign: "center", fontSize: 13, fontWeight: "600" },
  qtyTotal: { fontSize: 16, fontWeight: "800" },

  tabsCard: {
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tabBtn: { flex: 1, alignItems: "center", paddingVertical: 12, gap: 5 },
  tabText: { fontSize: 13 },
  tabIndicator: { width: 24, height: 2, borderRadius: 1 },
  tabContent: { padding: 14 },
  tabInner: { gap: 14 },

  infoBlock: { padding: 14, borderRadius: 12, borderWidth: 1 },
  infoBlock2: { gap: 10 },
  infoBlockHeader: { flexDirection: "row", alignItems: "center", gap: 7 },
  infoBlockTitle: { fontSize: 13, fontWeight: "700" },

  suitableGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  suitablePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  suitableText: { fontSize: 12 },

  stepRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  stepText: { flex: 1, fontSize: 13, lineHeight: 20 },

  certGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  certBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  certBadgeText: { fontSize: 11, fontWeight: "600" },

  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  disclaimerText: { flex: 1, fontSize: 11, lineHeight: 16 },

  table: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  tableHeader: {
    flexDirection: "row",
    padding: 10,
  },
  tableHeaderText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    alignItems: "flex-start",
  },
  tableCell: { fontSize: 11, lineHeight: 16 },

  paramsBox: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  paramRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  paramKey: { flex: 1, fontSize: 12 },
  paramVal: { fontSize: 13 },

  reviewSummary: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
    alignItems: "center",
  },
  reviewScore: { alignItems: "center", gap: 4 },
  reviewScoreNum: { fontSize: 36, fontWeight: "800" },
  starsRow: { flexDirection: "row", gap: 2 },
  reviewCount: { fontSize: 11 },
  reviewRateBars: { flex: 1, gap: 6 },
  rateBarRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  rateBarLabel: { width: 24, fontSize: 11 },
  rateBarBg: { flex: 1, height: 6, borderRadius: 3, overflow: "hidden" },
  rateBarFill: { height: "100%", borderRadius: 3 },
  rateBarCount: { width: 16, fontSize: 11, textAlign: "right" },

  reviewCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  reviewCardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: { fontSize: 16, fontWeight: "700" },
  reviewNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  reviewUser: { fontSize: 13, fontWeight: "700" },
  reviewTagPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  reviewTagText: { fontSize: 10, fontWeight: "600" },
  reviewMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  reviewDate: { fontSize: 11 },
  reviewContent: { fontSize: 13, lineHeight: 20 },

  emptyReviews: { alignItems: "center", paddingVertical: 30, gap: 10 },
  emptyReviewText: { fontSize: 13 },

  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    gap: 8,
  },
  actionIcon: { alignItems: "center", gap: 2, paddingHorizontal: 6 },
  actionIconText: { fontSize: 10 },
  cartBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBtnText: { fontSize: 13, fontWeight: "700" },
  buyBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  buyBtnText: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
