import { Icon } from "@/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const PARTNERS_MAIN = [
  { name: "河南宝莱健生物工程有限公司", role: "OEM生产、校企共建生物活性肽中心" },
  { name: "博食（河南）生物科技有限公司", role: "产品联合开发与市场推广" },
  { name: "洛阳福切尔生物科技有限公司", role: "中试生产与工艺验证" },
  { name: "博凯药业有限公司", role: "原料供应与医药领域应用" },
  { name: "河南酵益生物科技有限公司", role: "产品销售与渠道合作" },
];

const PARTNERS_MORE = [
  "郑州国食科技有限公司",
  "河南聚谷检测研究有限公司",
  "河南三味真厨食品有限公司",
  "河南大道康源健康产业有限公司",
  "河南坚久实业有限公司",
];

const TEACHERS = [
  {
    name: "侯银臣",
    title: "博士·教授",
    tag: "指导老师",
    color: "#1d4d3a",
    desc: "中原食品实验室岗位科学家，指导酶解工艺优化，主持省部级课题，获科技进步一等奖，为核心技术提供专业支撑。",
  },
  {
    name: "邢晓阳",
    title: "硕士·创业指导师",
    tag: "指导老师",
    color: "#2f6a52",
    desc: "擅长创业规划、赛事指导与就业辅导，拥有多项赛事优秀指导教师荣誉，助力项目商业落地。",
  },
];

const EXPERTS = [
  {
    name: "黄继红",
    title: "教授·中原学者",
    tag: "专家顾问",
    color: "#b8924b",
    desc: "小麦深加工权威专家，指导微生物发酵预处理技术，主持国家863项目，拥有多项发明专利。",
  },
  {
    name: "魏兆军",
    title: "教授·博导",
    tag: "专家顾问",
    color: "#8e44ad",
    desc: "食品科学与工程专家，指导分子对接与结构修饰技术，参与国家自然科学基金，攻克加工关键技术。",
  },
];

const TEAM = [
  {
    name: "王振宇",
    title: "项目负责人 / 研发骨干",
    major: "生物工程",
    color: "#1d4d3a",
    desc: "主导蛋白转化工艺优化，完成119次试验，掌握核心生产技术，负责项目整体统筹与技术落地。",
    icon: "cpu",
  },
  {
    name: "王恩姿",
    title: "市场营销总监",
    major: "市场营销",
    color: "#c0392b",
    desc: "擅长市场洞察与客户对接，负责品牌推广、渠道拓展与客户服务，推动产品快速落地市场。",
    icon: "trending-up",
  },
  {
    name: "张煜东",
    title: "技术骨干",
    major: "食品科学与工程",
    color: "#2f6a52",
    desc: "专注肽分离纯化与酶解参数优化，开展功能验证实验，保障产品活性与品质。",
    icon: "activity",
  },
  {
    name: "时延钊",
    title: "技术骨干",
    major: "软件工程",
    color: "#1a6896",
    desc: "负责微信小程序、数字化平台搭建与开发，打通线上电商全流程运营。",
    icon: "code",
  },
  {
    name: "付雪",
    title: "财务总监",
    major: "会计",
    color: "#b8924b",
    desc: "负责财务核算、成本管控、税务筹划与盈利模型搭建，保障项目资金稳定与财务合规。",
    icon: "dollar-sign",
  },
];

export default function CompanyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 12) : insets.top;
  const [showMorePartners, setShowMorePartners] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[styles.header, { paddingTop: topInset + 8 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>企业简介</Text>
          <Text style={styles.headerSub}>肽护中华 · 河南牧业经济学院</Text>
        </View>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 企业简介 */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.accent + "25", borderColor: colors.accent + "60" }]}>
              <Icon name="target" size={20} color={colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>企业简介</Text>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                高F值低聚肽 · 精准护肝功能性食品
              </Text>
            </View>
          </View>

          <View style={[styles.introPara, { backgroundColor: colors.surfaceCream, borderLeftColor: colors.accent }]}>
            <Text style={[styles.introText, { color: colors.foreground }]}>
              拟组建肽护中华公司，聚焦小麦源高F值低聚肽研发、生产与销售，以河南牧业经济学院科研为支撑，拥有自主核心专利，定位精准护肝功能性食品创新企业。
            </Text>
          </View>
          <View style={[styles.introPara, { backgroundColor: colors.surfaceJade, borderLeftColor: colors.primary }]}>
            <Text style={[styles.introText, { color: colors.foreground }]}>
              项目以河南小麦深加工＋乡村振兴＋大健康为方向，把小麦副产物谷朊粉转化为高附加值活性肽，打通"原料—研发—生产—电商销售"全产业链，服务肝病患者、健身人群、中老年等消费群体，致力于成为国内高F值低聚肽与精准护肝领域标杆。
            </Text>
          </View>

          {/* Key stats row */}
          <View style={styles.statsRow}>
            {[
              { v: "119次", l: "研发实验" },
              { v: "高F值", l: "≥45.3核心指标" },
              { v: "全链条", l: "产研销一体" },
            ].map((s) => (
              <View key={s.l} style={[styles.statCell, { backgroundColor: colors.surfaceCream }]}>
                <Text style={[styles.statV, { color: colors.primary }]}>{s.v}</Text>
                <Text style={[styles.statL, { color: colors.mutedForeground }]}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 合作企业 */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: "#1a6896" + "25", borderColor: "#1a6896" + "60" }]}>
              <Icon name="briefcase" size={20} color="#1a6896" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>已达成合作的企业</Text>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                覆盖生产、加工、销售全链条，均已签订合作/供销协议
              </Text>
            </View>
          </View>

          {PARTNERS_MAIN.map((p, i) => (
            <View key={p.name} style={[styles.partnerRow, { borderTopColor: colors.border }]}>
              <View style={[styles.partnerIndex, { backgroundColor: colors.primary }]}>
                <Text style={styles.partnerIndexText}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.partnerName, { color: colors.foreground }]}>{p.name}</Text>
                <Text style={[styles.partnerRole, { color: colors.mutedForeground }]}>{p.role}</Text>
              </View>
            </View>
          ))}

          {/* More partners toggle */}
          <Pressable
            onPress={() => setShowMorePartners((v) => !v)}
            style={[styles.moreBtn, { borderColor: colors.border, backgroundColor: colors.surfaceCream }]}
          >
            <Icon name={showMorePartners ? "chevron-up" : "chevron-down"} size={14} color={colors.primary} />
            <Text style={[styles.moreBtnText, { color: colors.primary }]}>
              {showMorePartners ? "收起" : `查看其他 ${PARTNERS_MORE.length} 家合作企业`}
            </Text>
          </Pressable>

          {showMorePartners && (
            <View style={[styles.moreList, { backgroundColor: colors.surfaceCream, borderColor: colors.border }]}>
              <Text style={[styles.moreListNote, { color: colors.mutedForeground }]}>
                涉及产品应用、检测认证、跨境销售等多领域合作：
              </Text>
              {PARTNERS_MORE.map((name) => (
                <View key={name} style={styles.moreListRow}>
                  <Icon name="check-circle" size={12} color={colors.primary} />
                  <Text style={[styles.moreListText, { color: colors.foreground }]}>{name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 指导老师 */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + "25", borderColor: colors.primary + "60" }]}>
              <Icon name="award" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>指导老师</Text>
            </View>
          </View>
          {TEACHERS.map((m) => (
            <PersonCard key={m.name} person={m} colors={colors} />
          ))}

          <View style={[styles.sectionDivider, { borderColor: colors.border }]}>
            <Text style={[styles.sectionDividerText, { color: colors.mutedForeground }]}>专家顾问</Text>
          </View>
          {EXPERTS.map((m) => (
            <PersonCard key={m.name} person={m} colors={colors} />
          ))}
          <View style={[styles.expertNote, { backgroundColor: colors.surfaceCream, borderColor: colors.border }]}>
            <Icon name="info" size={12} color={colors.mutedForeground} />
            <Text style={[styles.expertNoteText, { color: colors.mutedForeground }]}>
              另有企业管理、临床医学等领域资深顾问，提供商业模式、临床应用与市场运营全维度指导。
            </Text>
          </View>
        </View>

        {/* 核心团队 */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: "#8e44ad" + "25", borderColor: "#8e44ad" + "60" }]}>
              <Icon name="users" size={20} color="#8e44ad" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>团队核心成员</Text>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                多专业在校大学生组成，分工明确、优势互补
              </Text>
            </View>
          </View>

          <View style={[styles.majorTagsRow]}>
            {["食品科学", "生物工程", "市场营销", "财务", "软件工程"].map((m) => (
              <View key={m} style={[styles.majorTag, { backgroundColor: colors.surfaceJade, borderColor: colors.border }]}>
                <Text style={[styles.majorTagText, { color: colors.primary }]}>{m}</Text>
              </View>
            ))}
          </View>

          {TEAM.map((m, i) => (
            <View key={m.name} style={[styles.memberRow, { borderTopColor: colors.border }]}>
              <View style={[styles.memberAvatar, { borderColor: m.color, backgroundColor: m.color + "20" }]}>
                <Text style={[styles.memberAvatarText, { color: m.color }]}>{m.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.memberNameRow}>
                  <Text style={[styles.memberName, { color: colors.foreground }]}>{m.name}</Text>
                  <View style={[styles.memberRolePill, { backgroundColor: m.color + "18", borderColor: m.color + "50" }]}>
                    <Icon name={m.icon as any} size={10} color={m.color} />
                    <Text style={[styles.memberRoleText, { color: m.color }]}>{m.title}</Text>
                  </View>
                </View>
                <View style={styles.majorRow}>
                  <Icon name="book" size={10} color={colors.mutedForeground} />
                  <Text style={[styles.majorText, { color: colors.mutedForeground }]}>{m.major}专业</Text>
                </View>
                <Text style={[styles.memberDesc, { color: colors.foreground }]}>{m.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 联系我们 */}
        <View style={[styles.card, { borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: "#c0392b" + "25", borderColor: "#c0392b" + "60" }]}>
              <Icon name="phone" size={20} color="#c0392b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>联系我们</Text>
            </View>
          </View>
          {[
            { icon: "map-pin", label: "依托单位", val: "河南牧业经济学院" },
            { icon: "phone", label: "项目负责", val: "王振宇" },
            { icon: "mail", label: "合作咨询", val: "peptide@guotaiminantai.com" },
            { icon: "clock", label: "工作时间", val: "周一至周六 09:00-18:00" },
          ].map((c) => (
            <View key={c.label} style={[styles.contactRow, { borderTopColor: colors.border }]}>
              <Icon name={c.icon as any} size={14} color={colors.primary} />
              <Text style={[styles.contactLabel, { color: colors.mutedForeground }]}>{c.label}</Text>
              <Text style={[styles.contactVal, { color: colors.foreground }]}>{c.val}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function PersonCard({ person, colors }: { person: typeof TEACHERS[0]; colors: any }) {
  return (
    <View style={[styles.personRow, { borderTopColor: colors.border }]}>
      <View style={[styles.personAvatar, { borderColor: person.color, backgroundColor: person.color + "20" }]}>
        <Text style={[styles.personAvatarText, { color: person.color }]}>{person.name[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.personNameRow}>
          <Text style={[styles.personName, { color: colors.foreground }]}>{person.name}</Text>
          <View style={[styles.personTagPill, { backgroundColor: person.color + "18", borderColor: person.color + "50" }]}>
            <Text style={[styles.personTagText, { color: person.color }]}>{person.tag}</Text>
          </View>
        </View>
        <Text style={[styles.personTitle, { color: colors.accent }]}>{person.title}</Text>
        <Text style={[styles.personDesc, { color: colors.mutedForeground }]}>{person.desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2 },

  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  cardSubtitle: { fontSize: 11, marginTop: 2, lineHeight: 16 },

  introPara: {
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    marginBottom: 10,
  },
  introText: { fontSize: 13, lineHeight: 22 },

  statsRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  statCell: { flex: 1, padding: 10, borderRadius: 10, alignItems: "center", gap: 4 },
  statV: { fontSize: 14, fontWeight: "800" },
  statL: { fontSize: 9, textAlign: "center" },

  partnerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  partnerIndex: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  partnerIndexText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  partnerName: { fontSize: 13, fontWeight: "600", lineHeight: 20 },
  partnerRole: { fontSize: 11, marginTop: 2 },

  moreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  moreBtnText: { fontSize: 12, fontWeight: "600" },

  moreList: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  moreListNote: { fontSize: 11, marginBottom: 4 },
  moreListRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  moreListText: { fontSize: 13 },

  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    borderTopWidth: 1,
    paddingTop: 14,
  },
  sectionDividerText: { fontSize: 13, fontWeight: "600" },

  personRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  personAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  personAvatarText: { fontSize: 18, fontWeight: "700" },
  personNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  personName: { fontSize: 15, fontWeight: "700" },
  personTagPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  personTagText: { fontSize: 10, fontWeight: "600" },
  personTitle: { fontSize: 11, marginTop: 3, fontWeight: "600" },
  personDesc: { fontSize: 12, lineHeight: 18, marginTop: 5 },

  expertNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  expertNoteText: { flex: 1, fontSize: 11, lineHeight: 16 },

  majorTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 4,
  },
  majorTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  majorTagText: { fontSize: 11 },

  memberRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  memberAvatarText: { fontSize: 20, fontWeight: "700" },
  memberNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  memberName: { fontSize: 15, fontWeight: "700" },
  memberRolePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  memberRoleText: { fontSize: 10, fontWeight: "600" },
  majorRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  majorText: { fontSize: 11 },
  memberDesc: { fontSize: 12, lineHeight: 18, marginTop: 5 },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  contactLabel: { width: 60, fontSize: 12 },
  contactVal: { flex: 1, fontSize: 13 },
});
