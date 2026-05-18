import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HERO_BANNER, PRODUCT_LIVER, PRODUCT_ESSENCE } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

type Article = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  reads: string;
  mins: number;
  tags: string[];
  content: string[];
};

const ARTICLES: Article[] = [
  {
    id: "a1",
    title: "肝脏健康的五大信号",
    subtitle: "当心这些症状，可能是肝脏在向你发出预警",
    category: "健康知识",
    date: "2024-05-10",
    reads: "3.2万",
    mins: 3,
    tags: ["肝脏", "健康信号", "预防"],
    content: [
      "肝脏是人体最大的实质性器官，承担着解毒、代谢、合成蛋白质等数百种功能。当肝脏功能受损时，身体会发出多种信号，及早识别至关重要。",
      "【信号一：持续疲乏】长期疲劳、精力不足，即使充分休息也无法缓解，可能与肝脏糖原代谢异常有关。",
      "【信号二：食欲减退】对油腻食物产生厌恶感，进食后恶心、腹胀，这是肝胆消化功能下降的表现。",
      "【信号三：皮肤暗黄】皮肤和眼白发黄（黄疸），是胆红素代谢障碍的典型症状，需立即就医检查。",
      "【信号四：右上腹隐痛】右侧肋骨下方出现隐隐作痛或沉重感，尤其在久坐或饭后明显。",
      "【信号五：睡眠质量下降】难以入睡、多梦、夜间频繁醒来，中医认为这与肝血不足、肝气郁结相关。",
      "建议每年至少进行一次包含肝功能检查的体检，同时配合科学的肽营养补充，全面守护肝脏健康。",
    ],
  },
  {
    id: "a2",
    title: "F 值是什么？",
    subtitle: "一个衡量蛋白质护肝效果的关键指标",
    category: "科普知识",
    date: "2024-04-22",
    reads: "2.8万",
    mins: 4,
    tags: ["F值", "BCAA", "科学"],
    content: [
      "F值（Fischer比值）是支链氨基酸（BCAA：缬氨酸、亮氨酸、异亮氨酸）与芳香族氨基酸（AAA：苯丙氨酸、酪氨酸）的摩尔比值。",
      "正常人血浆F值约为3.0-3.5，而肝功能损伤患者往往降至1.0以下，导致肝性脑病风险大幅升高。",
      "国际公认标准认为，F值≥45.3的蛋白质产品具有显著的护肝修复作用。而国内同类产品平均F值仅为23-28。",
      "国泰民安·肽护中华系列产品采用专利酶解技术，实现F值≥45.3，显著优于行业水平，为肝脏细胞的修复提供精准营养支持。",
      "小分子肽（＜1000Da）无需消化即可直接被肠道吸收，吸收率高达90%以上，远超普通蛋白质的30-40%，这也是我们产品高效护肝的核心原理。",
    ],
  },
  {
    id: "a3",
    title: "应酬族日常护肝指南",
    subtitle: "五个实用技巧，帮您轻松应对商务应酬",
    category: "养生保健",
    date: "2024-04-08",
    reads: "4.1万",
    mins: 2,
    tags: ["应酬", "护肝", "实用"],
    content: [
      "对于商务人士来说，应酬饮酒难以避免。掌握科学的护肝方法，可以将酒精对肝脏的伤害降到最低。",
      "【技巧一：饭前补肽】饮酒前30分钟服用护肝肽产品，为肝脏提前储备修复原料，减少酒精对肝细胞的直接损伤。",
      "【技巧二：主食缓冲】饮酒前先吃主食，馒头、米饭等碳水化合物能减缓酒精吸收速度，降低血液中酒精浓度峰值。",
      "【技巧三：多饮温水】饮酒过程中穿插大量温水，促进酒精代谢排出，减少肝脏解毒压力。",
      "【技巧四：以慢制快】放慢饮酒节奏，给肝脏充分的代谢时间。避免空腹一次性大量饮酒。",
      "【技巧五：充足睡眠】应酬结束后保证7小时以上睡眠，因为夜间11点至凌晨3点是肝脏自我修复的黄金时段。",
    ],
  },
  {
    id: "a4",
    title: "熬夜对肝脏的隐性伤害",
    subtitle: "错过这个时段，肝脏修复效率下降60%",
    category: "健康知识",
    date: "2024-03-15",
    reads: "5.6万",
    mins: 3,
    tags: ["熬夜", "肝脏", "修复"],
    content: [
      "中医经络理论认为，夜间11点至凌晨3点（子时、丑时）是胆经和肝经当令的时段，此时肝脏进行最密集的解毒与细胞修复工作。",
      "现代医学研究也证实，深度睡眠期间肝脏血流量增加约40%，为肝细胞提供充足的氧气和营养物质，同时加速清除代谢废物。",
      "经常熬夜的人群数据显示：长期在23点后入睡，肝脏解毒效率可下降约60%，转氨酶（ALT/AST）水平明显升高。",
      "建议：尽量在23点前入睡。如果工作性质决定必须熬夜，建议在22点左右服用护肝肽产品，提前为肝脏补充修复所需的小分子肽和营养素。",
      "此外，熬夜会导致皮质醇分泌紊乱，进一步加重肝脏代谢负担。长期熬夜人群发生非酒精性脂肪肝的风险是正常人的2.3倍。",
    ],
  },
  {
    id: "a5",
    title: "小麦低聚肽 vs 普通蛋白粉",
    subtitle: "为什么中老年人更适合选择小分子肽？",
    category: "科普知识",
    date: "2024-02-28",
    reads: "2.1万",
    mins: 4,
    tags: ["小麦肽", "蛋白粉", "对比"],
    content: [
      "普通蛋白粉的分子量通常在5000-20000Da之间，需要经过胃蛋白酶、胰蛋白酶等多种消化酶的分解，才能被肠道吸收，整个过程消耗大量消化能量。",
      "小麦低聚肽分子量小于1000Da（通常300-500Da），属于2-10个氨基酸组成的短链肽，可以跳过消化分解步骤，直接通过肠道寡肽载体蛋白转运入血。",
      "对比数据：普通蛋白质的吸收率约为30-40%，小分子肽的吸收率高达90%以上，且吸收速度快3-5倍。",
      "中老年人随年龄增长消化酶分泌减少，对大分子蛋白质的消化能力下降30-50%，而对小分子肽的吸收效率基本不受年龄影响。",
      "对于慢性肝病患者，受损的肝细胞合成消化酶的能力不足，小分子肽是更为温和、高效的营养补充方式，不会额外增加肝脏代谢负担。",
      "国泰民安·肽护中华系列产品严格控制分子量在1000Da以内，并通过专利技术将F值提升至45.3以上，为人体提供最优质的护肝营养方案。",
    ],
  },
];

const CATEGORIES_TABS = ["全部", "健康知识", "科普知识", "养生保健"];
const HOT_TAGS = ["#肝脏", "#健康信号", "#F值", "#BCAA", "#熬夜", "#应酬", "#小分子肽", "#养生"];

export default function KnowledgeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState(0);
  const [detail, setDetail] = useState<Article | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = ARTICLES.filter((a) => {
    const matchTab = tab === 0 || a.category === CATEGORIES_TABS[tab];
    const matchQ = query.length === 0 ||
      a.title.includes(query) || a.subtitle.includes(query) || a.tags.some((t) => t.includes(query));
    return matchTab && matchQ;
  });

  if (detail) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={[styles.header, { paddingTop: topInset + 8 }]}
        >
          <Pressable onPress={() => setDetail(null)} style={styles.backBtn}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>{detail.title}</Text>
          <View style={{ width: 32 }} />
        </LinearGradient>

        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
          showsVerticalScrollIndicator={false}
        >
          <Image source={HERO_BANNER} style={styles.coverImg} resizeMode="cover" />
          <View style={styles.detailPad}>
            <Text style={[styles.detailTitle, { color: colors.foreground }]}>{detail.title}</Text>
            <Text style={[styles.detailSub, { color: colors.mutedForeground }]}>{detail.subtitle}</Text>
            <View style={styles.metaRow}>
              <Icon name="calendar" size={12} color={colors.mutedForeground} />
              <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{detail.date}</Text>
              <Icon name="eye" size={12} color={colors.mutedForeground} />
              <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{detail.reads}阅读</Text>
              <View style={[styles.minsPill, { backgroundColor: colors.accent }]}>
                <Text style={styles.minsPillText}>{detail.mins}min</Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              {detail.tags.map((t) => (
                <View key={t} style={[styles.tag, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
                  <Text style={[styles.tagText, { color: colors.primary }]}>#{t}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            {detail.content.map((p, i) => (
              <Text key={i} style={[styles.para, { color: colors.foreground }]}>{p}</Text>
            ))}
            <View style={styles.actionRow}>
              <Pressable
                onPress={() => setLiked((l) => l.includes(detail.id) ? l.filter((x) => x !== detail.id) : [...l, detail.id])}
                style={[styles.actionPill, { borderColor: colors.border }]}
              >
                <Icon name="thumbs-up" size={15} color={liked.includes(detail.id) ? colors.primary : colors.mutedForeground} />
                <Text style={[styles.actionPillText, { color: liked.includes(detail.id) ? colors.primary : colors.mutedForeground }]}>
                  {liked.includes(detail.id) ? "已点赞" : "点赞"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSaved((s) => s.includes(detail.id) ? s.filter((x) => x !== detail.id) : [...s, detail.id])}
                style={[styles.actionPill, { borderColor: colors.border }]}
              >
                <Icon name={saved.includes(detail.id) ? "bookmark" : "bookmark"} size={15} color={saved.includes(detail.id) ? colors.accent : colors.mutedForeground} />
                <Text style={[styles.actionPillText, { color: saved.includes(detail.id) ? colors.accent : colors.mutedForeground }]}>
                  {saved.includes(detail.id) ? "已收藏" : "收藏"}
                </Text>
              </Pressable>
            </View>
            <Text style={[styles.relatedTitle, { color: colors.foreground }]}>相关阅读</Text>
            {ARTICLES.filter((a) => a.id !== detail.id).slice(0, 3).map((a) => (
              <Pressable key={a.id} onPress={() => setDetail(a)} style={[styles.relatedCard, { borderColor: colors.border }]}>
                <Image source={HERO_BANNER} style={styles.relatedImg} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.relatedCardTitle, { color: colors.foreground }]} numberOfLines={2}>{a.title}</Text>
                  <Text style={[styles.relatedCardMeta, { color: colors.mutedForeground }]}>{a.reads} · {a.mins}min</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>护肝知识</Text>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={[styles.searchWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Icon name="search" size={15} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="搜索文章标题、标签"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
          />
        </View>

        {/* Hot tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hotTagsRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 6 }}>
          {HOT_TAGS.map((t) => (
            <Pressable key={t} onPress={() => setQuery(t.slice(1))} style={[styles.hotTag, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
              <Text style={[styles.hotTagText, { color: colors.primary }]}>{t}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Category tabs */}
        <View style={[styles.tabsRow, { borderBottomColor: colors.border }]}>
          {CATEGORIES_TABS.map((c, i) => (
            <Pressable key={c} onPress={() => setTab(i)} style={styles.tabBtn}>
              <Text style={[styles.tabText, { color: tab === i ? colors.primary : colors.mutedForeground, fontWeight: tab === i ? "700" : "400" }]}>{c}</Text>
              {tab === i && <View style={[styles.tabIndicator, { backgroundColor: colors.primary }]} />}
            </Pressable>
          ))}
        </View>

        {/* Articles */}
        {filtered.map((a) => (
          <Pressable key={a.id} onPress={() => setDetail(a)} style={({ pressed }) => [styles.articleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 }]}>
            <View style={styles.articleImgWrap}>
              <Image source={HERO_BANNER} style={styles.articleImg} resizeMode="cover" />
              <View style={[styles.catBadge, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
                <Text style={styles.catBadgeText}>{a.category}</Text>
              </View>
              <View style={[styles.minsPillImg, { backgroundColor: colors.accent }]}>
                <Text style={styles.minsPillText}>{a.mins}min</Text>
              </View>
            </View>
            <View style={styles.articleBody}>
              <Text style={[styles.articleTitle, { color: colors.foreground }]}>{a.title}</Text>
              <Text style={[styles.articleSub, { color: colors.mutedForeground }]} numberOfLines={2}>{a.subtitle}</Text>
              <View style={styles.articleMeta}>
                <Text style={[styles.articleMetaText, { color: colors.mutedForeground }]}>{a.date} · {a.reads}阅读</Text>
                <Pressable onPress={() => setSaved((s) => s.includes(a.id) ? s.filter((x) => x !== a.id) : [...s, a.id])}>
                  <Icon name="heart" size={16} color={saved.includes(a.id) ? "#c0392b" : colors.mutedForeground} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 18 },
  backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
  searchWrap: { flexDirection: "row", alignItems: "center", margin: 16, padding: 12, borderRadius: 12, borderWidth: 1, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 0 },
  hotTagsRow: { marginBottom: 4 },
  hotTag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, borderWidth: 1 },
  hotTagText: { fontSize: 12 },
  tabsRow: { flexDirection: "row", borderBottomWidth: 1, marginHorizontal: 16 },
  tabBtn: { flex: 1, alignItems: "center", paddingVertical: 10 },
  tabText: { fontSize: 13 },
  tabIndicator: { height: 2, width: 24, borderRadius: 1, marginTop: 4 },
  articleCard: { marginHorizontal: 16, marginTop: 14, borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  articleImgWrap: { height: 160, position: "relative" },
  articleImg: { width: "100%", height: "100%" },
  catBadge: { position: "absolute", top: 10, left: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  catBadgeText: { color: "#fff", fontSize: 10 },
  minsPillImg: { position: "absolute", top: 10, right: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  minsPillText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  articleBody: { padding: 14 },
  articleTitle: { fontSize: 16, fontWeight: "700" },
  articleSub: { fontSize: 12, marginTop: 4, lineHeight: 18 },
  articleMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  articleMetaText: { fontSize: 11 },
  coverImg: { width: "100%", height: 200 },
  detailPad: { padding: 16 },
  detailTitle: { fontSize: 22, fontWeight: "800", lineHeight: 30 },
  detailSub: { fontSize: 13, marginTop: 6 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  metaText: { fontSize: 11 },
  minsPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  tagText: { fontSize: 12 },
  divider: { height: 1, marginVertical: 16 },
  para: { fontSize: 14, lineHeight: 24, marginBottom: 12 },
  actionRow: { flexDirection: "row", gap: 12, marginVertical: 16 },
  actionPill: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 12, borderRadius: 12, borderWidth: 1, gap: 6 },
  actionPillText: { fontSize: 13, fontWeight: "500" },
  relatedTitle: { fontSize: 15, fontWeight: "700", marginBottom: 12 },
  relatedCard: { flexDirection: "row", gap: 10, padding: 10, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  relatedImg: { width: 70, height: 60, borderRadius: 8 },
  relatedCardTitle: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
  relatedCardMeta: { fontSize: 11, marginTop: 4 },
});
