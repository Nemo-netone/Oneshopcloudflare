import { ImageSourcePropType } from "react-native";

export type IconName = string;

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  image: ImageSourcePropType;
};

export type Product = {
  id: string;
  name: string;
  badge?: string;
  spec: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  image: ImageSourcePropType;
  qty: number;
  selected: boolean;
};

export type FeatureCard = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: ImageSourcePropType;
  variant: "light" | "dark";
};

export const PRODUCT_ESSENCE = require("@/assets/images/product_essence.png");
export const PRODUCT_CAPSULES = require("@/assets/images/product_capsules.png");
export const PRODUCT_LIVER = require("@/assets/images/product_liver.png");
export const PRODUCT_SACHET = require("@/assets/images/product_sachet.png");
export const PRODUCT_GRANULE = require("@/assets/images/product_granule.png");
export const PRODUCT_POWDER = require("@/assets/images/product_powder.png");
export const PRODUCT_ORAL = require("@/assets/images/product_oral.png");
export const HERO_BANNER = require("@/assets/images/hero_banner.png");
export const VIP_CARD = require("@/assets/images/vip_card.png");
export const GIFT_BOX = require("@/assets/images/gift_box.png");
export const TEA_CUP = require("@/assets/images/tea_cup.png");
export const PROFILE_BG = require("@/assets/images/profile_bg.png");
export const ICON_IMG = require("@/assets/images/icon.png");

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "fc1",
    title: "肽产品专区",
    subtitle: "科技肽能·精准滋养",
    cta: "进入专区",
    image: PRODUCT_ESSENCE,
    variant: "light",
  },
  {
    id: "fc2",
    title: "护肝专区",
    subtitle: "多维守护·肝净身轻",
    cta: "进入专区",
    image: PRODUCT_LIVER,
    variant: "light",
  },
  {
    id: "fc3",
    title: "营养调理",
    subtitle: "均衡营养·内调外养",
    cta: "进入专区",
    image: PRODUCT_CAPSULES,
    variant: "light",
  },
  {
    id: "fc4",
    title: "会员权益",
    subtitle: "专享礼遇·健康相伴",
    cta: "立即查看",
    image: VIP_CARD,
    variant: "light",
  },
];

export const CATEGORIES: Category[] = [
  { id: "c1", title: "肽饮系列", subtitle: "速吸收·高活性", icon: "droplet", image: PRODUCT_SACHET },
  { id: "c2", title: "护肝保健", subtitle: "多维养护·肝净身轻", icon: "shield", image: PRODUCT_LIVER },
  { id: "c3", title: "功能食品", subtitle: "科学配方·营养加持", icon: "package", image: PRODUCT_CAPSULES },
  { id: "c4", title: "草本养生", subtitle: "草本精萃·平衡养生", icon: "feather", image: TEA_CUP },
  { id: "c5", title: "营养补充", subtitle: "精准营养·每日补给", icon: "heart", image: PRODUCT_ESSENCE },
  { id: "c6", title: "免疫支持", subtitle: "强健防护·内外守护", icon: "award", image: PRODUCT_LIVER },
  { id: "c7", title: "礼盒专区", subtitle: "甄选礼盒·健康心意", icon: "gift", image: GIFT_BOX },
  { id: "c8", title: "健康茶饮", subtitle: "草本茶饮·轻养每一刻", icon: "coffee", image: TEA_CUP },
  { id: "c9", title: "日常必备", subtitle: "健康日常·随时补给", icon: "bookmark", image: PRODUCT_SACHET },
  { id: "c10", title: "全部分类", subtitle: "更多好物·尽在分类", icon: "grid", image: PRODUCT_CAPSULES },
];

export const CART_ITEMS: Product[] = [
  {
    id: "p2",
    name: "肽润肝清® 护肝醒酒冲剂",
    badge: "热销",
    spec: "净含量：90g（3g/袋×30袋）",
    tags: ["高F值低聚肽", "速溶颗粒", "温水冲服"],
    price: 135,
    originalPrice: 168,
    image: PRODUCT_GRANULE,
    qty: 1,
    selected: true,
  },
  {
    id: "p3",
    name: "珀珀肝宁® 高F值小麦低聚肽口服液",
    badge: "128人付款",
    spec: "规格：10ml/支",
    tags: ["液态直吸", "高F值肽", "开盖即饮"],
    price: 199,
    originalPrice: 259,
    image: PRODUCT_ORAL,
    qty: 1,
    selected: true,
  },
  {
    id: "p1",
    name: "小麦低聚肽原料",
    badge: "企业专供",
    spec: "规格：25kg/袋，可定制",
    tags: ["F值≥45.3", "肽纯度≥97%", "12项专利"],
    price: 0,
    image: PRODUCT_POWDER,
    qty: 1,
    selected: false,
  },
];

export const RECOMMEND_PRODUCT = {
  id: "rec1",
  name: "肽配膳道®",
  desc: "益生菌固体饮料",
  detail: "改善肠道微生态·助力营养吸收",
  price: 138,
  originalPrice: 168,
  image: GIFT_BOX,
};

export type OrderTab = { key: string; label: string; icon: string; badge?: number };

export const ORDER_TABS: OrderTab[] = [
  { key: "pay", label: "待付款", icon: "credit-card", badge: 2 },
  { key: "ship", label: "待发货", icon: "package", badge: 1 },
  { key: "deliver", label: "待收货", icon: "truck", badge: 1 },
  { key: "done", label: "已完成", icon: "check-circle" },
];

export type ServiceItem = { key: string; label: string; icon: string };

export const SERVICE_ITEMS: ServiceItem[] = [
  { key: "coupons", label: "我的优惠券", icon: "tag" },
  { key: "favs", label: "我的收藏", icon: "star" },
  { key: "history", label: "浏览记录", icon: "clock" },
  { key: "address", label: "地址管理", icon: "map-pin" },
  { key: "after", label: "售后服务", icon: "headphones" },
  { key: "support", label: "客服中心", icon: "message-square" },
  { key: "share", label: "分享有礼", icon: "gift" },
  { key: "contact", label: "联系客服", icon: "phone" },
];

export const VIP_BENEFITS = [
  { key: "v1", label: "肽产品", sub: "专享折扣", icon: "droplet" },
  { key: "v2", label: "护肝产品", sub: "专属优惠", icon: "shield" },
  { key: "v3", label: "健康管理", sub: "专业指导", icon: "heart" },
  { key: "v4", label: "专属折扣", sub: "会员价更优", icon: "percent" },
  { key: "v5", label: "极速发货", sub: "优先发货", icon: "truck" },
  { key: "v6", label: "售后无忧", sub: "专属客服", icon: "shield" },
];

export const TRUST_BADGES = [
  { key: "t1", title: "正品保障", sub: "品牌直供 假一赔十", icon: "shield" },
  { key: "t2", title: "科研支持", sub: "专业科研 科学验证", icon: "activity" },
  { key: "t3", title: "严选原料", sub: "全球优选 安全可追溯", icon: "feather" },
  { key: "t4", title: "无忧售后", sub: "7天无理由 贴心服务", icon: "headphones" },
];
